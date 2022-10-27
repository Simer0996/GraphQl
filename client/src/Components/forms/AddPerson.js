import React, { useState, useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useMutation } from "@apollo/client"
import { ADD_PERSON, GET_PEOPLE } from "../../queries"

const AddPerson = () => {
    // const [id, setId] = useState()
    const [id] = useState(uuidv4())
    const [addPerson] = useMutation(ADD_PERSON)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {
        const { firstName, lastName } = values
        console.log("firstName", firstName)
        console.log("lastName", lastName)

        addPerson({
            variables: {
                id,
                firstName,
                lastName
            },
            update: (cache, { data: { addPerson } }) => {
                const data = cache.readQuery({ query: GET_PEOPLE })
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        ...data,
                        people: [...data.people, addPerson]
                    }
                })
            }

        })
    }


    return (
        <>
            <h1>Add a Person</h1>
            <Form form={form} name="add-people-form" onFinish={onFinish} layout="inline" size="large" style={{ marginBottom: '40px' }
            }>
                <Form.Item name="firstName"
                    rules={[{ required: true, message: "Please input your first name!" }]}>
                    <Input placeholder="i.e. John" />
                </Form.Item>
                <Form.Item name="lastName"
                    rules={[{ required: true, message: "Please input your last name!" }]}>
                    <Input placeholder="i.e. Smith" />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                !form.isFieldsTouched(true) ||
                                form.getFieldError().filter(({ errors }) => errors.length)
                                    .length
                            }
                        >
                            Add Person
                        </Button>
                    )}
                </Form.Item>
            </Form >
        </>
    )
}

export default AddPerson
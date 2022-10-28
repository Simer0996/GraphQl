import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { useMutation } from '@apollo/client'
import { UPDATE_PERSON } from '../../queries'

const UpdatePerson = ({ onButtonClick, id, firstName, lastName }) => {

    const [updatePerson] = useMutation(UPDATE_PERSON)
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate()
    }, [])

    const onFinish = values => {
        const { firstName, lastName } = values
        updatePerson({
            variables: {
                id,
                firstName,
                lastName,
            }
        })
        onButtonClick()
    }

    return (
        <Form form={form} name='update-people-form' layout='inline' onFinish={onFinish} >
            <Form.Item name="firstName" rules={[{ required: true, message: "Please input your first name" }]} >
                <Input placeholder='i.e. john' />
            </Form.Item>
            <Form.Item name="lastName" rules={[{ required: true, message: "Please input your last name" }]} >
                <Input placeholder='i.e. smith' />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button type="primary" htmlType='submit'
                        disabled={
                            (!form.isFieldsTouched('firstName', firstName) && !form.isFieldsTouched('lastName', lastName)) ||
                            form.getFieldError().filter(({ errors }) => errors.length).length
                        }
                    >Update </Button>
                )}

            </Form.Item>
            <Form.Item>
                <Button type='danger' onClick={onButtonClick}>Cancel </Button>
            </Form.Item>
        </Form >
    )
}

export default UpdatePerson
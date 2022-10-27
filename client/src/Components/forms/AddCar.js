import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useMutation, useQuery } from "@apollo/client"
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries"

const AddCar = () => {

    const [id] = useState(uuidv4())
    const [addCar] = useMutation(ADD_CAR);
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();


    useEffect(() => {
        forceUpdate({})
    }, [])

    const { loading, error, data } = useQuery(GET_PEOPLE);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    const onFinish = values => {
        const { make, model, year, price } = values;

        addCar({
            variables: {
                id,
                make,
                model,
                year,
                price
            },
            update: (proxy, { data: { addCar } }) => {
                const data = proxy.readQuery({ query: GET_CARS });
                proxy.writeQuery({
                    query: GET_CARS,
                    data: {
                        ...data,
                        cars: [...data.cars, addCar],
                    },
                });
            },
        });
    }

    return (
        <>
            <h1>Add a Car</h1>
            <Form
                form={form}
                name="add-car-form"
                layout="inline"
                size="middle"
                onFinish={onFinish}
            >
                <Form.Item
                    name="year"
                    rules={[{ required: true, message: "Please input the year of the car", },
                    ]}
                >
                    <Input placeholder="i.e. 1980"></Input>
                </Form.Item>
                <Form.Item
                    name="make"
                    rules={[{ required: true, message: "Please input the make of the car" },
                    ]}
                >
                    <Input placeholder="i.e. Ford"></Input>
                </Form.Item>
                <Form.Item
                    name="model"
                    rules={[{ required: true, message: "Please input the model of the car" },
                    ]}
                >
                    <Input placeholder="i.e. Mustang"></Input>
                </Form.Item>
                <Form.Item
                    name="price"
                    rules={[{ required: true, message: "Please input the price of the car" }]}
                >
                    <Input placeholder="i.e. 20,000"></Input>
                </Form.Item>
                <Form.Item
                    rules={[{ required: true, message: "Please select the owner of the car" }
                    ]}
                >
                    <Select
                        placeholder="Select a person"
                        name="person"
                    >
                        {data.people.map((person) => (
                            <Select.Option key={person.id} >
                                {person.firstName} {person.lastName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                (!form.isFieldsTouched(true)) ||
                                form.getFieldError().filter(({ errors }) => errors.length)
                                    .length
                            }
                        >
                            Add Car
                        </Button>
                    )}
                </Form.Item>

            </Form>

        </>
    )
}

export default AddCar
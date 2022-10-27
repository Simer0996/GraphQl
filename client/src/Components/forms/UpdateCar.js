import React from 'react'
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button, Select } from "antd";
import { UPDATE_CAR, GET_PEOPLE } from "../../queries";
import { useQuery } from "@apollo/client";

const UpdateCar = (props) => {
    const [id, setId] = useState(props.id);
    const [year, setYear] = useState(props.year);
    const [make, setMake] = useState(props.make);
    const [model, setModel] = useState(props.model);
    const [price, setPrice] = useState(props.price);

    const [updateCar] = useMutation(UPDATE_CAR)
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({})
    }, [])

    const { loading, error, data } = useQuery(GET_PEOPLE);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    const onFinish = (values) => {

        const { make, model, year, price } = values;


        updateCar({
            variables: {
                id,
                year,
                make,
                model,
                price,

            },
        });
        props.onButtonClick()

    }

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case "year":
                setYear(value);
                break;
            case "make":
                setMake(value);
                break;
            case "model":
                setModel(value);
                break;
            case "price":
                setPrice(value);
                break;
            default:
                break;
        }
    }

    return (
        <div><Form
            form={form}
            name="update-person-form"
            layout="inline"
            onFinish={onFinish}
            initialValues={{
                year: year,
                make: make,
                model: model,
                price: price,
            }}
        >
            <Form.Item
                name="year"
                rules={[
                    { required: true, message: "Please input the year of the car" },
                ]}
            >
                <Input
                    placeholder="i.e. 1991"
                    onChange={(e) => updateStateVariable("year", e.target.value)}
                />
            </Form.Item>

            <Form.Item
                name="make"
                rules={[
                    { required: true, message: "Please input the make of the car" },
                ]}
            >
                <Input
                    placeholder="i.e. Ford"
                    onChange={(e) => updateStateVariable("make", e.target.value)}
                />
            </Form.Item>

            <Form.Item
                name="model"
                rules={[
                    { required: true, message: "Please input the model of the car" },
                ]}
            >
                <Input
                    placeholder="i.e. Mustang"
                    onChange={(e) => updateStateVariable("model", e.target.value)}
                />
            </Form.Item>

            <Form.Item
                name="price"
                rules={[
                    { required: true, message: "Please input the price of the car" },
                ]}
            >
                <Input
                    placeholder="i.e. 20,000"
                    onChange={(e) => updateStateVariable("price", e.target.value)}
                />
            </Form.Item>

            <Form.Item
                rules={[
                    {
                        required: true,
                        message: "Please select the owner of the car",
                    },
                ]}
            >
                <Select
                    style={{ width: "180px" }}
                    name="personId"
                    defaultValue={props.personId}
                    onChange={(value) => {
                        updateStateVariable("person", value)
                    }}
                >
                    {data.people.map((person) => (
                        <Select.Option key={person.id} value={person.id}>
                            {person.id}
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
                            (!form.isFieldTouched("year") &&
                                !form.isFieldTouched("make") &&
                                !form.isFieldTouched("model") &&
                                !form.isFieldTouched("price") ||
                                form.getFieldsError().filter(({ errors }) => errors.length).length
                            )}
                    >
                        Update Car
                    </Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form></div>
    )
}

export default UpdateCar



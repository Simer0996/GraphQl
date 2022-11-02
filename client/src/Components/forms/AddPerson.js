import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PEOPLE } from "../../queries";

const AddPerson = () => {
  const [id, setId] = useState(uuidv4())
  const [addPerson] = useMutation(ADD_PERSON);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = values => {
    const { firstName, lastName } = values
    setId(uuidv4());
    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (proxy, { data: { addPerson } }) => {
        const data = proxy.readQuery({ query: GET_PEOPLE })
        proxy.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        })
      },
    })
  }

  return (
    <>
      <h2>Add a Person</h2>
      <Form
        form={form}
        name="add-person-form"
        layout="inline"
        size="large"
        style={{ marginBottom: "80px" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your First Name",
            },
          ]}
        >
          <p> First Name: <Input placeholder="First Name"></Input></p>
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your Last Name",
            },
          ]}
        >
          <p>Last Name: <Input placeholder="Last Name"></Input></p>
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              style={{ marginTop: "22px" }}
              type="primary"
              htmlType="submit"
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
      </Form>
    </>
  );
}

export default AddPerson;
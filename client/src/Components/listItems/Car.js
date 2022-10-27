import React from 'react'
import { useState } from "react";
import { Card } from "antd";
import RemoveCar from "../buttons/RemoveCar";
import { EditOutlined } from "@ant-design/icons";

const Car = ({ id, make, model }) => {
    return (
        <>
            <Card
                type="inner"
                actions={[<RemoveCar id={id} />]}
            >
                {make} {model}
            </Card>
        </>
    )
}

export default Car
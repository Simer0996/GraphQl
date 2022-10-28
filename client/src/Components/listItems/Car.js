import React from 'react'
import { Card } from "antd";
import RemoveCar from "../buttons/RemoveCar";

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
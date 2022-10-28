import React, { useState } from 'react'
import { Card } from "antd";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../forms/UpdateCar";
import { EditOutlined } from "@ant-design/icons";

const CarDetails = (props) => {
    const [id] = useState(props.id)
    const [editMode, setEditMode] = useState(false);

    const handleEdit = () => {
        setEditMode(!editMode);
    }

    return (
        <div>
            {editMode ? (
                <UpdateCar
                    id={props.id}
                    year={props.year}
                    make={props.make}
                    model={props.model}
                    price={props.price}
                    personId={props.personId}
                    onButtonClick={handleEdit}

                />
            ) : (
                <Card
                    type="inner"

                    actions={[
                        <EditOutlined key="edit" onClick={handleEdit} />,
                        <RemoveCar id={id} />,
                    ]}
                >
                    <p>
                        <span className="car-detail-label">Year:</span> {props.year}
                    </p>
                    <p>
                        <span className="car-detail-label">Make:</span> {props.make}
                    </p>
                    <p>
                        <span className="car-detail-label">Model:</span> {props.model}
                    </p>
                    <p>
                        <span className="car-detail-label">Price:</span> ${props.price}
                    </p>
                    <p>
                        <span className="car-detail-label">Owner</span> ID: {props.personId}
                    </p>
                </Card>
            )}
        </div>
    );
};


export default CarDetails
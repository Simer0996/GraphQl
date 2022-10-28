import React, { useState } from 'react'
import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import { EditOutlined } from '@ant-design/icons'
import UpdatePerson from '../forms/UpdatePerson'
import Car from './Car'

const getStyles = () => ({
    card: {
        width: '500px'
    }
})

const Person = ({ id, firstName, lastName, carOwner }) => {
    const [editMode, setEditMode] = useState(false)
    const handleEdit = () => {
        setEditMode(!editMode)
    }

    const styles = getStyles()
    return (
        <>
            {editMode ? <UpdatePerson id={id} firstName={firstName} lastName={lastName} onButtonClick={handleEdit} /> :
                <Card style={styles.card} actions={[
                    <EditOutlined key='edit' onClick={handleEdit} />,
                    <RemovePerson id={id} />
                ]}>
                    {firstName} {lastName}
                </Card>

            }
            {carOwner.map(({ car }) => (
                // <Car key={car.id} id={car.id} make={car.make} model={car.model} />
                console.log(car)
            ))}
        </>
    )
}

export default Person
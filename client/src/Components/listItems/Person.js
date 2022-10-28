import React, { useState } from 'react'
import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import { EditOutlined } from '@ant-design/icons'
import UpdatePerson from '../forms/UpdatePerson'
import Car from './Car'
import { Link } from 'react-router-dom'

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

    // console.log(carOwner)
    const styles = getStyles()
    return (
        <>
            {editMode ? <UpdatePerson id={id} firstName={firstName} lastName={lastName} onButtonClick={handleEdit} /> :
                <Card style={styles.card} actions={[
                    <EditOutlined key='edit' onClick={handleEdit} />,
                    <RemovePerson id={id} />
                ]}>
                    <p> {firstName} {lastName}</p>



                    {carOwner?.map(car => (
                        <Car key={car.id} make={car.make} model={car.model} />
                    ))}
                    <Link
                        to={`/people/${id}`}
                        style={{
                            textDecoration: 'underline',
                            color: 'blue',
                        }}
                    >Learn More</Link>
                </Card>
            }


        </>
    )
}

export default Person
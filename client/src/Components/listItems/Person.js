import React, { useState } from 'react'
import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import { EditOutlined } from '@ant-design/icons'
import UpdatePerson from '../forms/UpdatePerson'

const getStyles = () => ({
    card: {
        width: '500px'
    }
})

const Person = ({ id, firstName, lastName }) => {
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
        </>
    )
}

export default Person
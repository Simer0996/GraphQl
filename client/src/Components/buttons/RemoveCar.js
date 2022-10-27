import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'

const RemoveCar = () => {

    const handleDelete = () => {
        let result = window.confirm("Are you sure you want to delete this Record")
    }

    return (
        <DeleteOutlined key='delete' onClick={handleDelete()} style={{ color: 'red' }} />
    )
}

export default RemoveCar
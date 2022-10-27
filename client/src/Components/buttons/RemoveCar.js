import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'

const RemoveCar = () => {



    return (
        <DeleteOutlined key='delete' onClick={handleDelete()} style={{ color: 'red' }} />
    )
}

export default RemoveCar
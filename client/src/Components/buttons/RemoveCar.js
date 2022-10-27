import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_CARS, REMOVE_CAR } from "../../queries"
import filter from 'lodash/filter'

const RemovePerson = ({ id }) => {

    const [removePerson] = useMutation(REMOVE_CAR,
        {
            update(cache, { data: { removeCar } }) {
                const { cars } = cache.readQuery({ query: GET_CARS });
                cache.writeQuery({
                    query: GET_CARS,
                    data: {
                        cars: filter(cars, o => o.id !== removeCar.id),
                    },
                });
            },
        }
    );

    const handleDelete = () => {
        let result = window.confirm("Are you sure you want to delete this record?")
        if (result) {
            removePerson({
                variable: {
                    id
                }
            })
        }
    }
    return (
        <div><DeleteOutlined key='delete' onClick={handleDelete} style={{ color: 'red' }} /></div>
    )
}

export default RemovePerson
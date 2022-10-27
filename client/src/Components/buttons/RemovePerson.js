import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_PEOPLE, REMOVE_PERSON } from "../../queries"
import filter from 'lodash/filter'

const RemovePerson = ({ id }) => {

    const [removePerson] = useMutation(REMOVE_PERSON,
        {
            update(cache, { data: { removePerson } }) {
                const { people } = cache.readQuery({ query: GET_PEOPLE });
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        people: filter(people, o => o.id !== removePerson.id),
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
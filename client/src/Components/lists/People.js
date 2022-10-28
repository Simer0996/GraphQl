import React from 'react'
import { List } from "antd"
import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from "../../queries"
import Person from "../listItems/Person"

const getStyles = () => ({
    list: {
        display: "flex",
        justifyContent: "center"
    }
})

const People = ({ carOwner }) => {
    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_PEOPLE)
    if (loading) return 'Loading'
    if (error) return `Error! ${error.message}`

    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {data.people.map(person => (
                <List.Item key={person.id} > <Person id={person.id} firstName={person.firstName} lastName={person.lastName} carOwner={carOwner} /></List.Item>
            ))
            }
        </List >
    )
}

export default People
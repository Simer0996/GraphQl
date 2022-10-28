import React from 'react'
import AddPerson from "../forms/AddPerson";
import AddCar from "../forms/AddCar"
import People from "../lists/People"
import { GET_CONTENT } from "../../queries"
import { useQuery } from "@apollo/client"
import Title from "../layout/Title"

const Home = () => {
    const { loading, error, data } = useQuery(GET_CONTENT);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    const carOwner = data.people.map(person => {
        return {
            ...person,
            carOwner: data.cars.filter(car => car.ownerId === person.id)
        }
    })

    return (
        <div className="App">
            <Title />
            <AddPerson />
            {data.people.length > 0 && <AddCar />}
            <div style={{ marginTop: "10%" }}>
                <People carOwner={carOwner} />
            </div>
        </div>
    )
}

export default Home
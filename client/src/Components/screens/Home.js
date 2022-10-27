import React from 'react'
import AddPerson from "../forms/AddPerson";
import AddCar from "../forms/AddCar"
import People from "../lists/People"
import { GET_CONTENT } from "../../queries"
import { useQuery } from "@apollo/client"

const Home = () => {
    const { loading, error, data } = useQuery(GET_CONTENT);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            <AddPerson />
            {data.people.length > 0 && <AddCar />}
            <div style={{ marginTop: "10%" }}>
                <People />
            </div>
        </div>
    )
}

export default Home
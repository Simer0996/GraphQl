import React from 'react'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PERSON_WITH_CARS } from "../../queries";
import { Card } from "antd";
import CarDetails from '../listItems/ CarDetails';


const ShowDetails = () => {
    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, { variables: { id } });
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;




    let { cars, person } = data
    let carsArray = []

    for (let i = 0; i < cars.length; i++) {
        if (cars[i].ownerId === person.id) {

            carsArray.push(cars[i])
        }
    }

    const personCatalog = {
        ...person,
        ownCars: carsArray
    }

    const { firstName, lastName, ownCars } = personCatalog

    return (
        <div>
            <h1>Details</h1>
            <Card>
                <p>{firstName} {lastName}</p>
                {ownCars.map((value) => (
                    <CarDetails key={value.id} id={value.id} year={value.year} make={value.make} model={value.model} price={value.price} personId={value.personId} />
                ))}
            </Card>
            <Link to="/">Back</Link>
        </div>
    )
}

export default ShowDetails
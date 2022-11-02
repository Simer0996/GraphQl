import React from "react";
import Title from "../layout/Title";
import { useParams, Link } from "react-router-dom";
import { GET_PERSON_WITH_CARS } from "../../queries";
import { useQuery } from "@apollo/client";
import Car from "../listItems/Car";
import { List, Button } from "antd";


const ShowDetails = () => {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { personId: id, id: id },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="App">
      <Button type="primary">
        <Link to={"/"}>GO BACK</Link>
      </Button>
      <Title />
      {data.person.firstName} {data.person.lastName}
      {data.personWithCars.map(({ id, year, make, model, price, personId }) => {
        return (
          <List.Item key={id}>
            <Car
              id={id}
              year={year}
              make={make}
              model={model}
              price={price}
              personId={personId}
            />
          </List.Item>
        );
      })}
    </div>
  );
};

export default ShowDetails;

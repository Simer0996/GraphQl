import { useState } from "react";
import { Card } from "antd";
import RemovePerson from "../buttons/RemovePerson";
import { EditOutlined } from "@ant-design/icons";
import UpdatePerson from "../forms/UpdatePerson";
import Car from "../listItems/Car";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../queries";
import { List } from "antd";
import { Link } from "react-router-dom";

const Person = (props) => {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  const { loading, error, data } = useQuery(GET_CARS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={props.id} />,
          ]}
        >
          {firstName} {lastName}
          {data.cars.map(({ id, year, make, model, price, personId }) => {
            if (personId === props.id) {
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
            }
          })}
          <Link
            to={`/people/${props.id}`}
            style={{
              color: 'navy',
            }}
          >Learn More </Link>
        </Card>
      )}
    </div>
  );
};

export default Person;

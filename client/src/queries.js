import { gql } from '@apollo/client'

export const GET_PEOPLE = gql`
  {
    people {
      id
      firstName
      lastName
    }
  }
`;

export const ADD_PERSON = gql`
  mutation addPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`;


//For Cars
export const GET_CARS = gql`
  {
    cars {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;


export const ADD_CAR = gql`
  mutation Mutation(
    $price: String!
    $model: String!
    $make: String!
    $year: String!
    $id: String
    $personId: String!
  ) {
    addCar(
      price: $price
      model: $model
      make: $make
      year: $year
      id: $id
      personId: $personId
    ) {
      year
      make
      model
      price
      personId
      id
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar(
    $id: String!
    $year: String
    $make: String
    $model: String
    $price: String
    $personId: String
  ) {
    updateCar(
      id: $id
      year: $year
      make: $make
      model: $model
      price: $price
      personId: $personId
    ) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;


//Get person owning Cars
export const GET_PERSON_WITH_CARS = gql`
  query Query($id: String!, $personId: String!) {
    personWithCars(personId: $id) {
      id
      year
      make
      model
      price
      personId
    }
    person(id: $personId) {
      id
      firstName
      lastName
    }
  }
`;

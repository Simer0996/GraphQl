import { gql } from '@apollo/client'


export const GET_PEOPLE = gql`
{
    people {
        id,
        firstName,
        lastName,
}
}
`

export const ADD_PERSON = gql`
mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
        id,
        firstName,
        lastName
    }
}
`

export const UPDATE_PERSON = gql`
mutation updatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
        id,
        firstName,
        lastName
    }
}
`

export const REMOVE_PERSON = gql`
mutation removePerson($id: String!, ) {
    removePerson(id: $id) {
        id,
        firstName,
        lastName
    }
}
`

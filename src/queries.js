import { gql } from '@apollo/client'

export const GET_ALL_PEOPLE = gql`
  query getAllPeople{
    getAllPeople {
      id
      name
    }
  }
`

export const GET_ALL_NOTES = gql`
  query getAllNotes{
    getAllNotes {
      id
      title
      description
      completed
      owner {
        id
        name
        age
      }
    }
  }
`

export const GET_SINGLE_PERSON = gql`
  query($id: ID!) {
    getSinglePerson(id: $id) {
      id
      name
      age
      notes {
        id
        title
        description
        completed
        owner {
          id 
          name
          age
        }
      }
    }
  }
`
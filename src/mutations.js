import { gql } from '@apollo/client'

export const DELETE_PERSON = gql`
  mutation($id: ID!) {
    deletePerson(id: $id) {
      id
      name
    }
  }
`

export const DELETE_NOTE = gql`
  mutation($id: ID!) {
    deleteNote(id: $id) {
      id
      title
      owner{
        id
      }
    }
  }
`

export const TOGGLE_NOTE_COMPLETED = gql`
mutation ($id: ID!) {
  toggleNoteCompleted(id: $id) {
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

export const UPDATE_AGE = gql`
  mutation($id: ID!, $age: Int!) {
    updateAge(id: $id, age: $age) {
      id
      age
    }
  }
`

export const ADD_PERSON = gql`
  mutation($name: String!, $age: Int) {
    addPerson(name: $name, age: $age) {
      id
      name
    }
  }
`

export const ADD_NOTE = gql`
  mutation($title: String!, $description: String, $completed: Boolean, $owner: String!) {
    addNote(title: $title, description: $description, completed: $completed, owner: $owner) 
    {
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
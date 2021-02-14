import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { VStack } from '@chakra-ui/react'
import Person from './Person'
import { GET_ALL_PEOPLE } from '../queries'
import { DELETE_PERSON } from '../mutations'

const PeopleList = () => {

  const { data, loading, error } = useQuery(GET_ALL_PEOPLE)
  const [deletePerson] = useMutation(DELETE_PERSON)

  const deletePersonById = (id) => {
    deletePerson({
      variables: { id },
      update(cache) {
        cache.modify({
          fields: {
            getAllPeople(existingPersonRefs, { readField }) {
              return existingPersonRefs.filter(
                personRef => id != readField('id', personRef)
              )
            }
          }
        })
      }
    })
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <VStack
      overflowY="scroll"
      h="45vh"
      spacing={4}
      w="full"
      sx={{
        '::-webkit-scrollbar': {
          display: 'none'
        }
      }}
    >
      {
        data.getAllPeople.map((person, idx) => (
          <Person
            key={idx}
            person={person}
            deletePersonById={deletePersonById}
          />
        ))
      }
    </VStack >
  )
}

export default PeopleList

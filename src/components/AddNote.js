import React, { useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, NumberInput, NumberInputField, Select, useColorModeValue, useToast } from '@chakra-ui/react'
import BackButton from './BackButton'
import { gql, useMutation, useQuery } from '@apollo/client'
import { GET_ALL_PEOPLE } from '../queries'
import { ADD_NOTE } from '../mutations'
import { useHistory } from 'react-router-dom'

const AddNote = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [owner, setOwner] = useState('')

  const history = useHistory()
  const toast = useToast()

  const { data, loading, error } = useQuery(GET_ALL_PEOPLE)
  const [addNote] = useMutation(ADD_NOTE)

  const bgColor = useColorModeValue('white', 'gray.900')

  const submitForm = async (e) => {
    e.preventDefault()
    await addNote({
      variables: {
        title, description, owner
      },
      update(cache, data) {
        console.log(data.data)
        cache.modify({
          fields: {
            getAllNotes(existingNoteRefs) {
              const newNoteRef = cache.writeFragment({
                data: data.data.addNote,
                fragment: gql`
                  fragment NewNote on Note{
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
                `
              })
              return [...existingNoteRefs, newNoteRef]
            }
          }
        })
        cache.modify({
          id: cache.identify(data.data.addNote.owner),
          fields: {
            notes(existingNoteRefs) {
              const newNoteRef = cache.writeFragment({
                data: data.data.addNote,
                fragment: gql`
                  fragment NewNote on Note{
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
                `
              })
              return [...existingNoteRefs, newNoteRef]
            }
          }
        })
        console.log(cache)
      }
    })
    toast({
      description: 'Note added!',
      duration: 3000,
      isClosable: true,
      status: "success"
    })
    history.push('/')
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <>
      <BackButton />
      <Flex w={["90%", "full"]} h="full" justify="center" align="center">
        <Box borderRadius="xl" p={8} bgColor={bgColor} boxShadow="2xl">
          <Heading as="h1">Add Note</Heading>
          <form onSubmit={submitForm}>
            <FormControl mt={4} id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={e => setTitle(e.target.value)} type="text" />
            </FormControl>
            <FormControl mt={4} id="description">
              <FormLabel>Description</FormLabel>
              <Input value={description} onChange={e => setDescription(e.target.value)} type="text" />
            </FormControl>
            <FormControl mt={4} id="owner" isRequired>
              <FormLabel>Owner</FormLabel>
              <Select value={owner} onChange={e => setOwner(e.target.value)} placeholder="Select owner of this note">
                {
                  data.getAllPeople.map(person => (
                    <option key={person.id} value={person.name}>{person.name}</option>
                  ))
                }
              </Select>
            </FormControl>
            <Button type="submit" mt={4} colorScheme="blue">Add</Button>
          </form>
        </Box>
      </Flex>
    </>
  )
}

export default AddNote

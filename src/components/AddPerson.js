import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, NumberInput, NumberInputField, useColorModeValue, useToast } from '@chakra-ui/react'
import { ADD_PERSON } from '../mutations'
import { useHistory } from 'react-router-dom'
import BackButton from './BackButton'

const AddPerson = () => {

  const [name, setName] = useState('')
  const [age, setAge] = useState()

  const history = useHistory()
  const toast = useToast()

  const bgColor = useColorModeValue('white', 'gray.900')

  const [addPerson] = useMutation(ADD_PERSON)

  const submitForm = async (e) => {
    e.preventDefault()
    await addPerson({
      variables: {
        name,
        age: parseInt(age)
      },
      update(cache, data) {
        cache.modify({
          fields: {
            getAllPeople(existingPersonRefs) {
              const newPersonRef = cache.writeFragment({
                data: data.data.addPerson,
                fragment: gql`
                fragment NewPerson on Person{
                  id
                  name
                  age
                  notes{
                    id
                    title
                    description
                    completed
                  }
                }
              `
              })
              return [...existingPersonRefs, newPersonRef]
            }
          }
        })
      }
    })
    toast({
      description: 'Person added!',
      duration: 3000,
      isClosable: true,
      status: "success"
    })
    history.push('/')
  }

  return (
    <>
      <BackButton />
      <Flex w={["90%", "full"]} h="full" justify="center" align="center">
        <Box borderRadius="xl" p={8} bgColor={bgColor} boxShadow="2xl">
          <Heading as="h1">Add Person</Heading>
          <form onSubmit={submitForm}>
            <FormControl mt={4} id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={e => setName(e.target.value)} type="text" />
            </FormControl>
            <FormControl mt={4} id="age">
              <FormLabel>Age</FormLabel>
              <NumberInput min={0} max={200} clampValueOnBlur={false}>
                <NumberInputField value={age} onChange={e => setAge(e.target.value)} />
              </NumberInput>
            </FormControl>
            <Button type="submit" mt={4} colorScheme="blue">Add</Button>
          </form>
        </Box>
      </Flex>
    </>
  )
}

export default AddPerson

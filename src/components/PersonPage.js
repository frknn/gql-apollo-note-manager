import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Button, Heading, HStack, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberInput, NumberInputField, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import BackButton from './BackButton'
import NotesList from './NotesList'
import { GET_SINGLE_PERSON } from '../queries'
import { DELETE_NOTE, UPDATE_AGE } from '../mutations'
import { FiEdit } from 'react-icons/fi'

const PersonPage = () => {
  const { id } = useParams()
  const [age, setAge] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const { data, loading, error } = useQuery(GET_SINGLE_PERSON, {
    variables: { id },
    // fetchPolicy: "network-only"
  })
  const [updateAge] = useMutation(UPDATE_AGE)
  const [deleteNote] = useMutation(DELETE_NOTE)

  const deleteNoteById = async (id) => {
    await deleteNote({
      variables: { id },
      update(cache, data) {
        cache.modify({
          id: cache.identify(data.data.deleteNote.owner),
          fields: {
            notes(existingNotesRef, { readField }) {
              return existingNotesRef.filter(n => {
                return id != readField('id', n)
              })
            }
          }
        })
        cache.modify({
          fields: {
            getAllNotes(existingNoteRefs, { readField }) {
              return existingNoteRefs.filter(n => {
                return id != readField('id', n)
              })
            }
          }
        })
      }
    })

    toast({
      description: 'Note deleted!',
      duration: 3000,
      isClosable: true,
      status: "error",
    })
  }

  const updateAgeById = async (id, age) => {
    await updateAge({
      variables: {
        id,
        age: parseInt(age)
      }
    })
    onClose()
    toast({
      description: 'Age updated!',
      duration: 3000,
      isClosable: true,
      status: "success",
    })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <>
      <Modal size="xs" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Age</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack mb={4}>
              <NumberInput min={1} max={200} clampValueOnBlur={false}>
                <NumberInputField
                  placeholder="Enter new age"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                />
              </NumberInput>
              <Button
                onClick={() => updateAgeById(data.getSinglePerson.id, age)}
                colorScheme="yellow">Update</Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <BackButton />
      <Heading px={2} size="4xl">{data.getSinglePerson.name}</Heading>
      <HStack mt={2}>
        <Text fontSize="xl">
          <Text as="span" >Age: </Text>
          <Text as="span">{data.getSinglePerson.age}</Text>
        </Text>
        <Tooltip label="Edit Age" aria-label="Edit Age Tooltip">
          <IconButton
            size="xs"
            fontSize="sm"
            aria-label="edit age"
            colorScheme="yellow"
            icon={<FiEdit />}
            onClick={onOpen}
          />
        </Tooltip>
      </HStack>
      <NotesList
        h="60vh"
        w={["90%", "80%"]}
        mt={12}
        notes={data.getSinglePerson.notes}
        deleteNoteById={deleteNoteById}
      />
    </>
  )
}

export default PersonPage

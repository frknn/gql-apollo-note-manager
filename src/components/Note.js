import React from 'react'
import { Box, IconButton, Heading, Text, HStack, Tooltip, useToast } from '@chakra-ui/react'
import { AiFillDelete, AiOutlineCheckCircle } from 'react-icons/ai'
import { AiFillCheckCircle } from 'react-icons/ai'
import { useMutation } from '@apollo/client'
import { TOGGLE_NOTE_COMPLETED } from '../mutations'

const Note = ({ note, deleteNoteById }) => {

  const toast = useToast()
  const [toggleCompleted] = useMutation(TOGGLE_NOTE_COMPLETED)

  const completeNote = async (id) => {
    await toggleCompleted({
      variables: {
        id
      }
    })

    toast({
      description: note.completed ? "Note marked as not completed!" : "Note marked as completed!",
      duration: 3000,
      isClosable: true,
      status: note.completed ? "warning" : "success"
    })
  }

  return (
    <Box display="flex" flexDir="column" transition="background-color 0.4s ease" textAlign="left" position="relative" color="gray.800" p={4} borderRadius="xl" bgColor={note.completed ? "green.100" : "yellow.100"}>

      <Heading as="h2" size="md">{note.title}</Heading>
      <Text w="100%" mt={4} flexGrow="1" >{note.description}</Text>
      <Text mt={4} >
        <Text as="span" fontWeight="800">Owner: </Text>
        <Text as="span">{note.owner?.name}</Text>
      </Text>

      <HStack
        position="absolute"
        right={2}
        bottom={2}
        spacing={0}
      >
        <Tooltip label={note.completed ? "Mark as Not Completed" : "Complete Note"} aria-label="complete or uncomplete note">
          <IconButton
            size="xs"
            fontSize={20}
            color={note.completed ? "green" : "gray.800"}
            _hover={{ color: 'green.500' }}
            variant="link"
            aria-label="complete note"
            icon={note.completed ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
            onClick={() => completeNote(note.id)}
          />
        </Tooltip>
        <Tooltip label="Delete Note" aria-label="delete note">
          <IconButton
            size="xs"
            fontSize={20}
            color="red.400"
            _hover={{ color: 'red.500' }}
            variant="link"
            aria-label="delete note"
            icon={<AiFillDelete />}
            onClick={() => deleteNoteById(note.id)}
          />
        </Tooltip>
      </HStack>
    </Box>
  )
}

export default Note

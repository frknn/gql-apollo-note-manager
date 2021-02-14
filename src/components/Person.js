import React from 'react'
import { HStack, Text, Tooltip, IconButton, useColorModeValue } from "@chakra-ui/react";
import { AiFillDelete } from 'react-icons/ai'
import { CgDetailsMore } from 'react-icons/cg'
import { useHistory } from 'react-router-dom';

const Person = ({ person, deletePersonById }) => {

  const itemBgColor = useColorModeValue('rgba(203,213,224,0.7)', 'rgba(74,85,104,0.9)')

  const history = useHistory()

  return (
    <HStack bgColor={itemBgColor} borderRadius="lg" w="full" align="center" justify="space-between" p={4}>
      <Text maxW="13ch" fontSize="xl" fontWeight="600">{person.name}</Text>
      <HStack>
        <Tooltip label="See Details">
          <IconButton
            size="xs"
            fontSize={16}
            colorScheme="blue"
            aria-label="details"
            icon={<CgDetailsMore />}
            onClick={() => history.push(`/people/${person.id}`)}
          />
        </Tooltip>
        <Tooltip label="Delete">
          <IconButton
            size="xs"
            fontSize={16}
            colorScheme="red"
            aria-label="delete"
            icon={<AiFillDelete />}
            onClick={() => deletePersonById(person.id)}
          />
        </Tooltip>
      </HStack>
    </HStack>
  )
}

export default Person

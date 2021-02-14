import React, { useRef } from 'react'
import { SimpleGrid, Icon } from "@chakra-ui/react";
import { FiSun } from 'react-icons/fi'
import { FiStar } from 'react-icons/fi'
import { useColorModeValue } from "@chakra-ui/react";

const BgIcons = () => {

  const icons = useRef(new Array(12).fill(null))

  const bgIcon = useColorModeValue(FiSun, FiStar)
  const opacity = useColorModeValue(0.7, 0.2)
  const color = useColorModeValue('yellow.200', 'gray.200')
  const fill = useColorModeValue('yellow.100', 'yellow.100')

  return (
    <SimpleGrid
      p={0}
      zIndex="-1"
      w="full"
      h="100vh"
      position="absolute"
      columns={[2, 3, 4]}
      spacing={4}
    >
      {icons.current.map((_, idx) => (
        <Icon
          key={idx}
          opacity={opacity}
          color={color}
          fill={fill}
          justifySelf="center"
          alignSelf="center"
          as={bgIcon}
          w={12} h={12} />
      ))}
    </SimpleGrid>
  )
}

export default BgIcons


import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { CgChevronLeft } from 'react-icons/cg'
import { useHistory } from 'react-router-dom'

const BackButton = () => {

  const history = useHistory()

  return (
    <IconButton
      position="absolute"
      top={4}
      left={4}
      size="sm"
      fontSize="2xl"
      aria-label="Go back"
      variant="ghost"
      icon={<CgChevronLeft />}
      onClick={() => history.goBack()}
    />
  )
}

export default BackButton

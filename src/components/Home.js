import React from 'react'
import { Heading, Text, Box, Tabs, TabList, Tab, TabPanels, TabPanel, HStack, Button } from "@chakra-ui/react";
import PeopleList from './PeopleList'
import NotesList from './NotesList'
import AllNotes from './AllNotes';
import { useHistory } from 'react-router-dom';

const Home = () => {

  const history = useHistory()
  return (
    <>
      <Heading px={2} size="4xl">Note Manager</Heading>
      <Text fontSize="xl">Add notes for people.</Text>
      <HStack mt={4} spacing={4}>
        <Button
          colorScheme="blue"
          onClick={() => history.push('/add-person')}
        >Add Person</Button>
        <Button
          colorScheme="blue"
          onClick={() => history.push('/add-note')}
          variant="outline">Add Note</Button>
      </HStack>
      <Box my={8} w={["90%", "60%"]}>
        <Tabs isLazy isFitted size="lg">
          <TabList>
            <Tab fontWeight="600">People</Tab>
            <Tab fontWeight="600">Notes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <PeopleList />
            </TabPanel>
            <TabPanel px={0}>
              <AllNotes />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}

export default Home

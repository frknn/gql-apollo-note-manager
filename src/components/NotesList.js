import React from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import Note from './Note'

const NotesList = ({ notes, deleteNoteById, mt, w, h }) => {

  return (
    <SimpleGrid
      mt={mt || 0}
      gridAutoRows="minmax(min-content,max-content)"
      h={h || "45vh"}
      overflowY="scroll"
      w={w || "full"}
      columns={[1, 1, 2]}
      spacing={4}
      sx={{
        '::-webkit-scrollbar': {
          display: 'none'
        }
      }}
    >
      {
        notes.map((note, idx) => (
          <Note
            key={idx}
            note={note}
            deleteNoteById={deleteNoteById}
          />
        )
        )}
    </SimpleGrid>
  )
}

export default NotesList

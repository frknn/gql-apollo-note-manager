import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_NOTE } from '../mutations'
import { GET_ALL_NOTES } from '../queries'
import NotesList from './NotesList'
import { useToast } from '@chakra-ui/react'

const AllNotes = () => {
  const { data, loading, error } = useQuery(GET_ALL_NOTES)
  const [deleteNote] = useMutation(DELETE_NOTE)
  const toast = useToast()

  const deleteNoteById = async (id) => {
    await deleteNote({
      variables: { id },
      update(cache, data) {
        cache.modify({
          fields: {
            getAllNotes(existingNoteRefs, { readField }) {
              return existingNoteRefs.filter(n => {
                return id != readField('id', n)
              })
            }
          }
        })
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
      }
    })
    toast({
      description: 'Note deleted!',
      duration: 3000,
      isClosable: true,
      status: "error",
    })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <NotesList notes={data.getAllNotes} deleteNoteById={deleteNoteById} />
  )
}

export default AllNotes

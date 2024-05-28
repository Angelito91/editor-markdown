import { useState } from 'react'
import { DEFAULT } from '../utils/const'

export function useDocument () {
  const [documents, setDocuments] = useState(() => {
    if (localStorage.getItem('documents') !== null)
      return JSON.parse(localStorage.getItem('documents'))

    localStorage.setItem('documents', JSON.stringify([]))
    return []
  })
  const [content, setContent] = useState(DEFAULT)
  const [name, setName] = useState('')

  return {
    documents,
    setDocuments,
    name,
    setName,
    content,
    setContent
  }
}

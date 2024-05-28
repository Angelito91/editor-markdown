// ICONS
import { Save } from './icons/Save'
import { Trash } from './icons/Trash'
import { Plus } from './icons/Plus'
import { Eraser } from './icons/Eraser'

// CONST
import { DEFAULT } from '../utils/const'

export function Documents ({
  documents,
  setDocuments,
  name,
  setName,
  content,
  setContent,
  index,
  setIndex
}) {
  // Guarda un nuevo documento
  const handleSave = () => {
    if(documents.length === 10) return

    const nameDocument = name.trim().length === 0 ? 'readme' : name
    const newDocument = { name: nameDocument, content: content }
    const newDocuments = [...documents, newDocument]
    setDocuments(newDocuments)
    localStorage.setItem('documents', JSON.stringify(newDocuments))
  }

  // Sobrescribe un documento existente
  const handleSaveOverwrite = () => {
    const nameDocument = name.trim().length === 0 ? 'readme' : name
    const newDocument = { name: nameDocument, content: content }
    const newDocuments = documents
    newDocuments[index] = newDocument
    setDocuments(newDocuments)
    setIndex(null)
    localStorage.setItem('documents', JSON.stringify(newDocuments))
  }

  // Crear un documento nuevo
  const handleNewDocument = () => {
    setContent(DEFAULT)
    setName('')
    setIndex(null)
  }

  // Elimina todos los documentos
  const handleDeleteAll = () => {
    setDocuments([])
    localStorage.setItem('documents', JSON.stringify([]))
    setContent('')
    setName('')
    setIndex(null)
  }

  // Elimina el documento seleccionado
  const handleDelete = () => {
    const newDocuments = documents.filter((_, i) => i !== index)
    setDocuments(newDocuments)
    localStorage.setItem('documents', JSON.stringify(newDocuments))
    setContent('')
    setName('')
    setIndex(null)
  }

  // Selecciona un documento
  const handleSelect = i => {
    if (i === index) {
      setContent('')
      setName('')
      setIndex(null)
    } else {
      const document = documents[i]
      setContent(document.content)
      setName(document.name)
      setIndex(i)
    }
  }

  return (
    <>
      <div className='gruop-button'>
        <input
          className='input'
          placeholder='Ej. readme'
          maxLength={20}
          value={name}
          onChange={e => setName(e.target.value)}
          type='text'
        />

        <button className='button' onClick={handleNewDocument}>
          <Plus />
          Nuevo
        </button>

        {index !== null ? (
          <button className='button' onClick={handleSaveOverwrite}>
            <Save />
            {`Guardar "${documents[index].name}.md"`}
          </button>
        ) : (
          <button className='button' onClick={handleSave}>
            <Save />
            Guardar
          </button>
        )}

        {index !== null ? (
          <button className='button' onClick={handleDelete}>
            <Trash />
            {`Borrar "${documents[index].name}.md" `}
          </button>
        ) : (
          <button className='button' onClick={() => setContent('')}>
            <Eraser />
            Limpiar contenido
          </button>
        )}
        {documents.length > 2 && (
          <button className='button' onClick={handleDeleteAll}>
            <Trash />
            Borrar los documents
          </button>
        )}
      </div>
      <div className='gruop-documents'>
        {documents.map((document, i) => (
          <button
            key={`${document.name}-${i}`}
            className={`${i === index ? 'button active' : 'button'}`}
            onClick={() => handleSelect(i)}
          >
            {document.name}.md
          </button>
        ))}
      </div>
    </>
  )
}

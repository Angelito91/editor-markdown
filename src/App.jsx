import { useState } from 'react'

// HOOK
import { useDocument } from './hooks/useDocument'

// COMPONENTS
import MarkdownEditor from '@uiw/react-md-editor'
import { Documents } from './components/Documents'

function App () {
  const { documents, setDocuments, name, setName, content, setContent } =
    useDocument()
  const [index, setIndex] = useState(null)

  return (
    <main className='app'>
      <article className='contenido'>
        <Documents
          documents={documents}
          setDocuments={setDocuments}
          content={content}
          setContent={setContent}
          name={name}
          setName={setName}
          index={index}
          setIndex={setIndex}
        />
        <MarkdownEditor
          height={'80vh'}
          value={content}
          onChange={setContent}
          visibleDragbar={false}
        />
      </article>
    </main>
  )
}

export default App

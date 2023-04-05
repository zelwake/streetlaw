import { Editor } from '@tinymce/tinymce-react'

const Add = () => {
  return (
    <Editor
      tinymceScriptSrc={`${process.env.NEXT_PUBLIC_URL}/tinymce/tinymce.min.js`}
      //   tinymceScriptSrc={'http://localhost:3000/tinymce/tinymce.min.js'}
    />
  )
}

export default Add

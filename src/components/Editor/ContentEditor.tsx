import { ContentEditorRef, EditorEvent } from '@projectType/componentTypes'
import { Editor } from '@tinymce/tinymce-react'
import { ForwardedRef, forwardRef } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'

type ContentEditorProp = {
  editorId: string
  initValue?: string
}

const ContentEditor = forwardRef(function editor(
  props: ContentEditorProp,
  ref: ForwardedRef<ContentEditorRef>
) {
  const handleEditorInit = (_evt: EditorEvent, editor: TinyMCEEditor) => {
    if (ref && typeof ref === 'object') {
      ref.current = editor
    }
  }
  return (
    <Editor
      id={props.editorId}
      tinymceScriptSrc={process.env.NEXT_PUBLIC_URL + '/tinymce/tinymce.min.js'}
      onInit={handleEditorInit}
      initialValue={props.initValue}
      init={{
        height: 500,
        language: 'cs',
        menubar: false,
        plugins: 'image link lists',
        toolbar:
          'blocks |' +
          'forecolor bold italic underline removeformat | ' +
          'alignleft aligncenter alignright |' +
          'bullist numlist indent outdent blockquote |' +
          'image link unlink',
        content_style:
          'body { font-family:Titillium Web,Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  )
})

export default ContentEditor

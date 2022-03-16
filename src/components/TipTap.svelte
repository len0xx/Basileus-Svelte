<script lang="ts">
    import { uploadFileAJAX } from '../utilities'
    import { onMount, onDestroy } from 'svelte'
    import { Editor } from '@tiptap/core'
    import Document from '@tiptap/extension-document'
    import Text from '@tiptap/extension-text'
    import Paragraph from '@tiptap/extension-paragraph'
    import Heading from '@tiptap/extension-heading'
    import HardBreak from '@tiptap/extension-hard-break'
    import Bold from '@tiptap/extension-bold'
    import Italic from '@tiptap/extension-italic'
    import Image from '@tiptap/extension-image'
    import Underline from '@tiptap/extension-underline'
    import Placeholder from '@tiptap/extension-placeholder'
    import CharacterCount from '@tiptap/extension-character-count'
    import Link from '@tiptap/extension-link'
    import type { JSONContent } from '@tiptap/core'
  
    export let name = ''
    let value: JSONContent = {}

    let element: HTMLElement
    let fileUpload: HTMLElement
    let editor: Editor
    let chars = 0, words = 0
    const limit = 5000
  
    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [
                Text,
                Heading,
                Document,
                Paragraph,
                Underline,
                HardBreak,
                Italic,
                Image,
                Bold,
                Link,
                Placeholder.configure({
                    placeholder: 'What\s on your mind?',
                }),
                CharacterCount.configure({
                    limit
                })
            ],
            onTransaction: () => {
                // force re-render so `editor.isActive` works as expected
                editor = editor
                value = editor.getJSON()
                chars = editor.storage.characterCount.characters()
                words = editor.storage.characterCount.words()
            },
        })
    })

    onDestroy(() => editor ? editor.destroy() : null)

    function fileSelected(e: Event) {
        let image = (e.target as HTMLInputElement).files[0]
        const formData = new FormData()
        formData.append('image', image)
		
        uploadFileAJAX(
            '/api/image/upload',
            'POST',
            formData,
            (res: any) => editor.chain().focus().setImage({ src: '/uploads/' + res.filename }).run(),
            (res) => console.error(res)
        )
    }

    function addImage() {
        // Set the disabled attribute in order to hide the input from <form> tags
        fileUpload.removeAttribute('disabled')
        fileUpload.click()
        fileUpload.setAttribute('disabled', '')
    }
</script>

<style lang="sass">
    .editor
        margin: 10px 0
        padding: 1em
        border-radius: 4px
        border: 1px solid rgb(100, 130, 200)

    :global(.editor .tiptap-editor img)
        max-width: 100%

    :global(.editor .tiptap-editor a:link)
        text-decoration: underline
        cursor: pointer

    :global(.editor .tiptap-editor a:link:hover)
        color: rgb(40, 40, 255)

    :global(.editor .tiptap-editor h1, h2, h3, h4, h5, h6)
        margin: 1em 0

    :global(.ProseMirror p.is-editor-empty:first-child::before)
        color: #AAAAAA
        content: attr(data-placeholder)
        float: left
        height: 0
        transition: 0.1s ease-in-out
        pointer-events: none

    :global(.ProseMirror p.is-editor-empty:first-child:hover::before)
        color: #444444

    .character-count
        color: #AAAAAA
        margin-top: 0.6em
        cursor: default
        transition: 0.1s ease-in-out
        &:hover
            color: #888888

    button
        padding: 6px 10px
        border-radius: 4px
        cursor: pointer
        border: none
        background: rgb(240, 240, 240)
        line-height: 1
        &:not(:first-of-type)
            margin-left: 0.15em
        &:not(:last-of-type)
            margin-right: 0.15em
        &:not(.active):hover
            background: rgb(220, 220, 220)
        
        svg
            fill: #000000
        &.active
            background-color: #000000
            svg
                fill: #ffffff
</style>

<div class="editor">
    <div class="tiptap-buttons">
        {#if editor}
            <button
                on:click|preventDefault={() => editor.chain().focus().setParagraph().run()}
                class:active={editor.isActive('paragraph')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" class="bi bi-paragraph" viewBox="0 0 16 16">
                    <path d="M10.5 15a.5.5 0 0 1-.5-.5V2H9v12.5a.5.5 0 0 1-1 0V9H7a4 4 0 1 1 0-8h5.5a.5.5 0 0 1 0 1H11v12.5a.5.5 0 0 1-.5.5z"/>
                </svg>
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
                class:active={editor.isActive('heading', { level: 1 })}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-h1" viewBox="0 0 16 16">
                    <path d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z"/>
                </svg>
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                class:active={editor.isActive('heading', { level: 2 })}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-h2" viewBox="0 0 16 16">
                    <path d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z"/>
                </svg>
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                class:active={editor.isActive('heading', { level: 3 })}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-h3" viewBox="0 0 16 16">
                    <path d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z"/>
                </svg>
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleBold().run()}
                class:active={editor.isActive('bold') ? 'is-active' : ''}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-bold" viewBox="0 0 16 16">
                    <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                </svg>
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleItalic().run()}
                class:active={editor.isActive('italic') ? 'is-active' : ''}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-italic" viewBox="0 0 16 16">
                    <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
                </svg>
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleUnderline().run()}
                class:active={editor.isActive('underline') ? 'is-active' : ''}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-underline" viewBox="0 0 16 16">
                    <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z"/>
                </svg>
            </button>
            <button on:click|preventDefault={() => editor.chain().focus().setHardBreak().run()} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                </svg>
            </button>
            <button on:click|preventDefault={addImage} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                </svg>
            </button>
            <input type="file" disabled name="tiptap-image-upload" bind:this={fileUpload} on:input={fileSelected} style="display: none">

        {/if}
    </div>
    <div class="tiptap-editor" bind:this={element} />
    <div class="character-count">
        { chars }/{ limit } characters
        <br>
        { words } words
    </div>
    <textarea style="display: none" {name}>{ JSON.stringify(value) }</textarea>  
</div>

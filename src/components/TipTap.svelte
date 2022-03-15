<script lang="ts">
    import { uploadFileAJAX } from '../utilities'
    import { onMount, onDestroy } from 'svelte'
    import { Editor } from '@tiptap/core'
    import StarterKit from '@tiptap/starter-kit'
    import Image from '@tiptap/extension-image'
  
    export let name = ''

    let element: HTMLElement
    let fileUpload: HTMLElement
    let editor: Editor
  
    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [
                StarterKit,
                Image
            ],
            content: '<p>Start typing here..</p>',
            onTransaction: () => {
                // force re-render so `editor.isActive` works as expected
                editor = editor
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

    :global(.editor .tiptap-editor h1, h2, h3, h4, h5, h6)
        margin: 1em 0

    button
        padding: 6px 16px
        border-radius: 20em
        cursor: pointer
        border: none
        background: rgb(230, 230, 230)
        &:not(:first-of-type)
            margin-left: 0.35em
        &:not(:last-of-type)
            margin-right: 0.35em
        &:not(.active):hover
            background: rgb(210, 210, 210)
        
        &.active
            background: black
            color: white
</style>

<div class="editor">
    <div class="tiptap-buttons">
        {#if editor}
            <button
                on:click|preventDefault={() => editor.chain().focus().setParagraph().run()}
                class:active={editor.isActive('paragraph')}
            >
                Paragraph
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
                class:active={editor.isActive('heading', { level: 1 })}
            >
                H1
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                class:active={editor.isActive('heading', { level: 2 })}
            >
                H2
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                class:active={editor.isActive('heading', { level: 3 })}
            >
                H3
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleBold().run()}
                class:active={editor.isActive('bold') ? 'is-active' : ''}
            >
                Bold
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleItalic().run()}
                class:active={editor.isActive('italic') ? 'is-active' : ''}
            >
                Italic
            </button>
            <button on:click|preventDefault={addImage} >
                Image
            </button>
            <input type="file" disabled name="tiptap-image-upload" bind:this={fileUpload} on:input={fileSelected} style="display: none">
        {/if}
    </div>
    
    <div class="tiptap-editor" {name} bind:this={element} />    
</div>

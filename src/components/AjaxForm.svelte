<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { sendWindowAJAX } from '../utilities'
    import type { RESTMethod } from '../types'

    export let action = ''
    export let className = ''
    export let csrfToken = ''
    export let noReset = false
    export let checkOk = true
    export let method: RESTMethod = 'POST'

    const dispatch = createEventDispatcher()

    function collectionToArray(coll: HTMLCollection): HTMLElement[] {
        const arr: HTMLElement[] = []
        for (let i = 0; i < coll.length; i++) arr.push(coll[i] as HTMLElement)
        return arr
    }

    const handleSubmit = (e: Event) => {
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const children = collectionToArray(form.children)
        children.forEach(child => {
            if (child.classList.contains('editor')) {
                const tiptap = child.querySelector('.tiptap-editor')
                const content = tiptap.children[0].innerHTML
                const fieldName = tiptap.getAttribute('name')
                formData.append(fieldName, content)
            }
        })
        formData.delete('tiptap-image-upload')

        sendWindowAJAX(
            action,
            method,
            formData,
            (res) => {
                if (checkOk) {
                    if (res.ok === true) {
                        dispatch('success', res)
                    }
                    else if (res.ok === false) {
                        dispatch('error', res)
                    }
                }
                else {
                    dispatch('success', res)
                }
                if (!noReset) (e.target as HTMLFormElement).reset()
            },
            (res) => { dispatch('error', res) },
            csrfToken
        )
    }
</script>

<form class={className} {action} {method} on:submit|preventDefault={handleSubmit}>
    <slot></slot>
</form>

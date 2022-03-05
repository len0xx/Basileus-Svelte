<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { sendAJAXRequest } from '../utilities'
    import type { RESTMethod } from '../types'

    export let action = ''
    export let className = ''
    export let csrfToken = ''
    export let noReset = false
    export let checkOk = true
    export let method: RESTMethod = 'POST'

    const dispatch = createEventDispatcher()

    const handleSubmit = (e: Event) => {
        const formData = new FormData(e.target as HTMLFormElement)

        sendAJAXRequest(
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

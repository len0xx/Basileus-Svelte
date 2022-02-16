<script lang="ts">
    import jquery from 'jquery'
    import { onMount, createEventDispatcher } from 'svelte'
    import type { RESTMethod } from '../utilities'
    import { transformFormData } from '../utilities'

    export let action = ''
    export let method: RESTMethod = 'POST'

    let component: HTMLFormElement
    const dispatch = createEventDispatcher()

    onMount(() => {
        component.addEventListener('submit', (e: SubmitEvent) => {
            e.preventDefault()

            const formData = transformFormData(new FormData(component))

            const request = jquery.ajax({
                url: action,
                contentType: 'application/x-www-form-urlencoded',
                type: method,
                data: formData,
                dataType: 'json'
            })

            request.done((res) => {
                if (res.ok) {
                    dispatch('successSubmit')
                    component.reset()
                }
                else {
                    dispatch('error', res)
                    console.error(res)
                }
            })

            request.fail((res) => {
                dispatch('error', res)
                console.error(res)
            })
        })
    })
</script>

<form {action} {method} bind:this="{component}">
    <slot></slot>
</form>
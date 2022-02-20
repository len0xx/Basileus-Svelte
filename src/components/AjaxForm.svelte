<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte'
    import type { RESTMethod } from '../utilities'
    import { sendAJAXRequest } from '../utilities'

    export let action = ''
    export let method: RESTMethod = 'POST'

    let component: HTMLFormElement
    const dispatch = createEventDispatcher()

    onMount(() => {
    	component.addEventListener('submit', (e: Event) => {
    		e.preventDefault()

    		const formData = new FormData(component)

    		sendAJAXRequest(
    			action,
    			method,
    			formData,
    			null,
    			(res) => {
    				dispatch('success', res)
    				component.reset()
    			},
    			(res) => { dispatch('error', res) }
    		)
    	})
    })
</script>

<form {action} {method} bind:this="{component}">
    <slot></slot>
</form>

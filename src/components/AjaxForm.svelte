<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte'
    import { sendAJAXRequest } from '../utilities'
    import type { RESTMethod } from '../types'

    export let action = ''
    export let className = ''
    export let method: RESTMethod = 'POST'
export let noReset = false

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
				if (res.ok === true) {
    					dispatch('success', res)
				}
				else if (res.ok === false) {
					dispatch('error', res)
				}
    				if (!noReset) component.reset()
    			},
    			(res) => { dispatch('error', res) }
    		)
    	})
    })
</script>

<form class={className} {action} {method} bind:this="{component}">
    <slot></slot>
</form>

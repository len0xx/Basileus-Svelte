<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte'
    import { sendAJAXRequest } from '../utilities'
    import type { RESTMethod } from '../types'

    export let action = ''
    export let className = ''
	export let noReset = false
	export let checkOk = true
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

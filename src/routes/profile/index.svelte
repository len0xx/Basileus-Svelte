<script context="module" lang="ts">
    import type { User } from '../../models/user'
    import type { Page, Session } from '../../types'

    export async function preload(page: Page, session: Session) {
    	const loggedIn = !!(session.user)

    	if (!loggedIn) {
    		this.redirect(302, '/auth/login')
    	}

    	return { user: session.user }
    }
</script>

<script lang="ts">
    export let user: User | undefined = undefined
</script>

<svelte:head>
	<title>Basileus – Profile</title>
</svelte:head>

<style lang="sass"></style>

<h1>Welcome, { user ? user.firstname : 'unknown' }</h1>

<script context="module" lang="ts">
    import { authorize } from '../../utilities'
    import type { Page, Session } from '../../utilities'
	import type { User } from '../../models/user'

    export async function preload(page: Page, session: Session) {
        const authorization = await authorize(session)

        const loggedIn: boolean = !!(authorization && authorization.user)

        if (!loggedIn) {
            this.redirect(302, '/auth/login')
        }

        return authorization
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

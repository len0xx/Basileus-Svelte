<script context="module" lang="ts">
    import { authorize } from '../../utilities'
    import type { Page, Session } from '../../utilities'

    export async function preload(page: Page, session: Session) {
    	const authorization = await authorize(session)

    	const loggedIn = !!(authorization && authorization.user)

    	if (loggedIn) this.redirect(302, '/profile')
    }
</script>

<svelte:head>
	<title>Basileus – Log in</title>
</svelte:head>

<script lang="ts">
    import AjaxForm from '../../components/AjaxForm.svelte'
    import Button from '../../components/Button.svelte'

    let success = false

    const handleSuccess = () => {
    	success = true
    	setTimeout(() => {
    		window.location.href = '/profile'
    	}, 500)
    }
</script>

<h1>Log in</h1>

<AjaxForm action="/auth/login.json" method="GET" on:success={handleSuccess}>
    { #if success }
        <p class="success">Logged in successfully</p>
    {/if }
    <label for="email">Email:</label><br>
    <input type="email" name="email" required><br>
    <label for="password">Password:</label><br>
    <input type="password" name="password" required><br>
    
    <Button actionType="submit" variant="primary">Log in</Button>
</AjaxForm>

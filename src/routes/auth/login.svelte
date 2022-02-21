<script context="module" lang="ts">
	import type { Page, Session } from '../../types'

	export async function preload(page: Page, session: Session) {
		const loggedIn = !!(session.user)

		if (loggedIn) {
			this.redirect(302, '/profile')
		}

		return {
			user: session.user || undefined
		}
	}
</script>

<svelte:head>
	<title>Basileus – Log in</title>
</svelte:head>

<script lang="ts">
	import AjaxForm from '../../components/AjaxForm.svelte'
	import Button from '../../components/Button.svelte'
	import { redirect } from '../../utilities'

	let success = false
	let errorText = ''

	const handleSuccess = () => {
		success = true
		redirect('/profile')
	}

	const handleError = (event: CustomEvent<any>) => {
		errorText = event.detail.error
	}
</script>

<h1>Log in</h1>

<AjaxForm action="/api/auth/login" method="GET" on:success={handleSuccess} on:error={handleError}>
	{ #if success }
		<p class="success">Logged in successfully</p>
	{ :else if errorText }
		<p class="error">{ errorText }</p>
	{/if }
	<label for="email">Email:</label><br>
	<input type="email" name="email" required><br>
	<label for="password">Password:</label><br>
	<input type="password" name="password" required><br>
	
	<Button actionType="submit" variant="primary">Log in</Button>
</AjaxForm>

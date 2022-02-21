<script context="module" lang="ts">
	import AjaxForm from '../../components/AjaxForm.svelte'
	import Button from '../../components/Button.svelte'
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

	let success = false
	let errorText = ''

	function handleSuccess() { success = true }

	function handleError(event: CustomEvent<any>) { errorText = event.detail.error }
</script>

<svelte:head>
	<title>Basileus – Profile</title>
</svelte:head>

<section class="container">
	<h1>Welcome, { user ? user.firstname : 'unknown' }</h1>
	<br>
	<h2>Edit your profile</h2>
	{ #if success }
		<p class="success">The changes has been saved successfully</p>
	{ :else if errorText }
		<p class="error">{ errorText }</p>
	{ /if }
	<AjaxForm method="PUT" action="/api/user/{user.id}" noReset={true} on:success={handleSuccess} on:error={handleError}>
		<label for="firstname">First name:</label><br>
		<input type="text" name="firstname" required value={user.firstname}><br>
		<label for="lastname">Last name:</label><br>
		<input type="text" name="lastname" value={user.lastname}><br>
		<label for="text">Email:</label><br>
		<input type="email" name="email" required value={user.email}><br>
		<label for="text">Age:</label><br>
		<input type="number" name="age" value={user.age} min="1" max="110"><br>
		<Button actionType="submit">Save</Button>
	</AjaxForm>
</section>

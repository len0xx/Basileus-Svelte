<script context="module" lang="ts">
    import type { Page, Session } from '../types'

    export async function preload(page: Page, session: Session) {
    	const loggedIn = !!(session.user)

    	if (!loggedIn || session.user.role != UserRole.ADMIN) {
    		this.redirect(302, '/auth/login')
    	}

    	return { user: session.user }
    }
</script>

<script lang="ts">
    import AjaxForm from '../components/AjaxForm.svelte'
    import Button from '../components/Button.svelte'
    import * as ERRORS from '../errors'
    import { UserRole } from '../models/user'
    import { redirect } from '../utilities'

    let success = false
    let errorText = ''

    const handleSuccess = (event: CustomEvent<any>) => {
    	success = true
    	const slug = event.detail.slug
        redirect(`/post/${slug}`)
    }

    const handleError = (event: CustomEvent<any>) => {
    	const error = event.detail.error

    	if (error == ERRORS.EMPTY_FIELDS) {
    		errorText = 'Error: Required fields are empty'
    	}
    	else {
    		errorText = 'Unexpected error occurred. Please try again later'
    	}
    }
</script>

<svelte:head>
	<title>Create a new post</title>
</svelte:head>

<h1>New post</h1>

<AjaxForm action="/api/post/new" method="POST" on:success={handleSuccess} on:error={handleError}>
    { #if success }
        <p class="success">The post has been successfully created</p>
    { :else if errorText }
        <p class="error">{errorText}</p>
    {/if}
    <label for="title">Title:</label><br>
    <input type="text" name="title"><br>
    <label for="text">Text:</label><br>
    <textarea name="text" cols="30" rows="10"></textarea><br>
    <Button actionType="submit">Create</Button>
</AjaxForm>

<script context="module" lang="ts">
    import type { Page, Session } from '../../types'

    export async function preload(page: Page, session: Session) {
        const loggedIn = !!(session.user)

        if (!loggedIn || session.user.role != UserRole.ADMIN) {
            this.redirect(302, '/auth/login')
        }

        return {
            user: session.user,
            csrfToken: session.csrfToken
        }
    }
</script>

<script lang="ts">
    import TipTap from '../../components/TipTap.svelte'
    import AjaxForm from '../../components/AjaxForm.svelte'
    import Button from '../../components/Button.svelte'
    import { UserRole } from '../../models/user'
    import { redirect } from '../../utilities'

    let success = false
    let errorText = ''

    export let csrfToken = ''

    const handleSuccess = (event: CustomEvent<any>) => {
        success = true
        const slug = event.detail.slug
        redirect(`/post/${slug}`)
    }

    const handleError = (event: CustomEvent<any>) => {
        errorText = event.detail.error
    }
</script>

<svelte:head>
    <title>Create a new post</title>
</svelte:head>

<section class="container">
    <h1>New post</h1>
    <AjaxForm noReset={true} action="/api/post/new" method="POST" on:success={handleSuccess} on:error={handleError} {csrfToken}>
        { #if success }
            <p class="success">The post has been successfully created</p>
        { :else if errorText }
            <p class="error">{errorText}</p>
        {/if}
        <label for="title">Title:</label><br>
        <input type="text" name="title"><br>
        <label for="text">Text:</label><br>
        <TipTap name="text" />
        <Button actionType="submit">Create</Button>
    </AjaxForm>
</section>

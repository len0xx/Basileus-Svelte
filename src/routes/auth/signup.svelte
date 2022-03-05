<script context="module" lang="ts">
    import type { Page, Session } from '../../types'

    export async function preload(page: Page, session: Session) {
        const loggedIn = !!(session.user)

        if (loggedIn) {
            this.redirect(302, '/auth/login')
        }

        return {
            csrfToken: session.csrfToken
        }
    }
</script>

<script lang="ts">
    import AjaxForm from '../../components/AjaxForm.svelte'
    import Button from '../../components/Button.svelte'
    import { redirect } from '../../utilities'

    let success = false
    let errorText = ''

    export let csrfToken = ''

    const handleSuccess = () => {
        success = true
        redirect('/profile')
    }
    const handleError = (event: CustomEvent<any>) => {
        errorText = event.detail.error
    }
</script>

<style lang="sass">
    section.container
        max-width: 450px
        margin: 0 auto
</style>

<svelte:head>
    <title>Basileus – Sign up</title>
</svelte:head>

<section class="container">
    <h1>Sign up</h1>
    <AjaxForm action="/api/auth/signup" method="POST" on:success={handleSuccess} on:error={handleError} {csrfToken}>
        { #if success }
            <p class="success">Account created</p>
        { :else if errorText }
            <p class="error">{ errorText }</p>
        {/if }
        <label for="firstname">First name:</label><br>
        <input type="text" name="firstname" required><br>
        <label for="lastname">Last name:</label><br>
        <input type="text" name="lastname"><br>
        <label for="text">Email:</label><br>
        <input type="email" name="email" required><br>
        <label for="password">Password:</label><br>
        <input type="password" name="password" required><br>
        
        <Button actionType="submit" variant="primary">Sign up</Button>
    </AjaxForm>
</section>

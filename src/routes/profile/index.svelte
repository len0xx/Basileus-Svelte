<script context="module" lang="ts">
    import AjaxForm from '../../components/AjaxForm.svelte'
    import Button from '../../components/Button.svelte'
    import PostCard from '../../components/PostCard.svelte'
    import { PROTOCOL } from '../../config'
    import { sendNodeAJAX } from '../../utilities'
    import type { Post } from '../../models/post'
    import type { User } from '../../models/user'
    import type { Page, Session } from '../../types'

    export async function preload(page: Page, session: Session) {
        const loggedIn = !!(session.user)

        if (!loggedIn) {
            this.redirect(302, '/auth/login')
        }

        const postsObj = await sendNodeAJAX(
            `${PROTOCOL}://${page.host}/api/post/list`,
            'GET',
            {
                author: session.user.id,
                csrf: session.csrfToken
            },
            { cookie: `csrf=${session.csrfToken}` }
        )

        return {
            posts: postsObj.posts,
            user: session.user,
            csrfToken: session.csrfToken
        }
    }
</script>

<script lang="ts">
    import { UserRole } from '../../models/user'

    export let csrfToken = ''
    export let posts: Post[]
    export let user: User | undefined = undefined

    let success = false
    let errorText = ''

    function handleSuccess() { success = true }

    function handleError(event: CustomEvent<any>) { errorText = event.detail.error }
</script>

<style lang="sass">
    .posts-wrapper
        display: grid
        position: relative
        grid-template-columns: 1fr
        gap: 1.5em
</style>

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
    <AjaxForm method="PUT" action="/api/user/{user.id}" noReset={true} on:success={handleSuccess} on:error={handleError} {csrfToken}>
        <div class="grid grid-2">
            <div>
                <label for="firstname">First name:</label><br>
                <input type="text" name="firstname" required value={user.firstname}>
            </div>
            <div>
                <label for="lastname">Last name:</label><br>
                <input type="text" name="lastname" value={user.lastname}>
            </div>
            <div>
                <label for="text">Email:</label><br>
                <input type="email" name="email" required value={user.email}>
            </div>
            <div>
                <label for="text">Age:</label><br>
                <input type="number" name="age" value={user.age} min="1" max="110">
            </div>
        </div>
        <br>
        <Button actionType="submit">Save</Button>
    </AjaxForm>
</section>
{ #if user.role == UserRole.ADMIN }
    <br>
    <h1>Your recent posts:</h1>
    { #if posts && posts.length }
        <div class="posts-wrapper">
            { #each posts as post }
                <PostCard post={post} />
            {/each }
        </div>
    { :else }
        <p>No posts here yet</p>
    {/if }
{ /if }

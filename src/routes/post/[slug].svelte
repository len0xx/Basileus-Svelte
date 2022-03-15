<script context="module" lang="ts">
    import { User, UserRole } from '../../models/user'
    import { getPublicPostModel, PostObject } from '../../models/post'
    import { PROTOCOL } from '../../config'
    import { sendNodeAJAX } from '../../utilities'
    import type { Post } from '../../models/post'
    import type { Page, Session } from '../../types'

    export async function preload(page: Page, session: Session) {
        const post = await sendNodeAJAX(
            `${PROTOCOL}://${page.host}/api/post/${page.params.slug}`,
            'GET',
            { csrf: session.csrfToken },
            { cookie: `csrf=${session.csrfToken}` }
        ) as PostObject

        const author = await sendNodeAJAX(
            `${PROTOCOL}://${page.host}/api/user/${post.author}`,
            'GET',
            { csrf: session.csrfToken },
            { cookie: `csrf=${session.csrfToken}` }
        )

        return {
            post: getPublicPostModel(post),
            author: author.user,
            user: session.user,
            csrfToken: session.csrfToken
        }
    }
</script>

<script lang="ts">
    import Button from '../../components/Button.svelte'
    import { sendWindowAJAX, formatDate } from '../../utilities'

    export let csrfToken = ''
    export let post: Post
    export let user: User | undefined = undefined
    export let author: User | undefined = undefined

    let active = true

    function deletePost() {
        const formData = new FormData()

        sendWindowAJAX(
            `/api/post/${post.slug}`,
            'DELETE',
            formData,
            () => active = false,
            () => alert('Unexpected error occurred while deleting. Please try again later'),
            csrfToken
        )
    }
</script>

<style lang="sass">
    .buttons
        margin-top: 2em

    .inactive > :not(.buttons)
        opacity: 0.5

    .caption
        color: #888
        font-size: 0.9em
        margin: 1.2em 0

    :global(.post-content img)
        max-width: 100%

    :global(.post-content h1, h2, h3, h4, h5, h6)
        margin: 1em 0

</style>

<svelte:head>
    <title>{ post.title }</title>
</svelte:head>

<section class={active ? 'container' : 'container inactive'}>
    <h1>{ post.title }</h1>
    
    <p class="caption">
        Author: <a href="/profile/{author.id}">{ author.fullname }</a><br>
        { formatDate(post.created) }
    </p>

    <div class="post-content">
        {@html post.text.replace(/\r/g, '').replace(/\n/g, '<br>')}
    </div>
    { #if user && user.role == UserRole.ADMIN && author.id == user.id }
        <div class="buttons">
            { #if active }
                <Button actionType="delete" variant="danger" on:click={deletePost}>Delete this post</Button>
            { :else }
                <p class="error">The post has been deleted</p>
            {/if }
        </div>
    {/if }
</section>

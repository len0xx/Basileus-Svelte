<script context="module" lang="ts">
    import { PROTOCOL } from '../../config'
    import { sendNodeAJAX } from '../../utilities'
    import type { Page, Session } from '../../types'
    import type { User } from '../../models/user'

    export async function preload(page: Page, session: Session) {
        const id = page.params.id

        try {
            const profileJSON = await sendNodeAJAX(
                `${PROTOCOL}://${page.host}/api/user/${id}`,
                'GET',
                { csrf: session.csrfToken },
                { cookie: `csrf=${session.csrfToken}` }
            )

            if (!profileJSON.user) {
            this.error(404, 'The user was not found')
            return
        }

            return {
                profile: profileJSON.user
            }
        }
        catch(err) {
            console.error(err)

            return {
                profile: undefined
            }
        }
    }
</script>

<script lang="ts">
    export let profile: User | undefined = undefined
</script>

<svelte:head>
    <title>Basileus – Profile</title>
</svelte:head>

<section class="container">
    { #if profile }
        <h1>{ [profile.firstname, profile.lastname].join(' ') }</h1>
        <p>Email: {profile.email}</p>
    { :else }
        <h1>User not found</h1>
    {/if }
</section>

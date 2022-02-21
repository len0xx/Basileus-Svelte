<aside class:opened={opened}>
    <ul>
        <a href="/"><li>Home</li></a>
        <a href="/about"><li>About</li></a>
        { #if user }
            { #if user.role == UserRole.ADMIN }
                <a href="/post/new"><li>New post</li></a>
            {/if }
            <a href="/profile"><li>Profile</li></a>
            <a href="/auth/logout"><li>Log out</li></a>
        { :else }
            <a href="/auth/login"><li>Log in</li></a>
            <a href="/auth/signup"><li>Sign up</li></a>
        {/if }
    </ul>
</aside>

<script lang="ts">
    import type { User } from '../models/user'
    import { UserRole } from '../models/user'

    export let user: User | undefined = undefined
    export let opened: boolean
</script>

<style lang="sass">
    aside
        display: block
        position: absolute
        left: 0
        top: 0
        height: 100%
        width: 300px
        background-color: #fff
        z-index: 10
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1)
        transform: translateX(-305px)
        transition: 0.1s ease-in-out
        padding: 1em 0

    ul
        list-style-type: none
        padding: 0
        li
            padding: 1em 2em
            background-color: rgba(0, 0, 0, 0)
            transition: 0.1s ease-in-out
            &:hover
                background-color: rgba(0, 20, 110, 0.06)

    :global(aside.opened)
        transform: translateX(0) !important
</style>

<script context="module" lang="ts">
    import { PROTOCOL } from '../config'
    import axios from 'axios'
    import type { Post } from '../models/post'
    import type { Page, Session } from '../types'

    export async function preload(page: Page, session: Session) {
        const pageNum = page.query.page ? +page.query.page : 1

        const postsResponse = await axios.get(`${PROTOCOL}://${page.host}/api/post/list`, { params: {
            page: pageNum,
            csrf: session.csrfToken
        }, headers: { cookie: `csrf=${session.csrfToken}` } })
        const postsObject = postsResponse.data
        return {
            posts: postsObject.posts,
            pages: postsObject.pages,
            page: pageNum,
            csrfToken: session.csrfToken
        }
    }
</script>

<script lang="ts">
    import PostCard from '../components/PostCard.svelte'
    import Paginator from '../components/Paginator.svelte'
    import { sendAJAXRequest } from '../utilities'

    export let posts: Post[]
    export let pages = 1
    export let page = 1
    export let csrfToken = ''
    let searchQuery = ''
    $: queryParams = {
        s: searchQuery
    }

    const updateSearchResults = () => {
        sendAJAXRequest(
            '/api/post/list',
            'GET',
            { s: searchQuery },
            (res) => {
                posts = res.posts
                pages = res.pages
            },
            () => null,
            csrfToken
        )
    }
</script>

<style lang="sass">
    .posts-wrapper
        display: grid
        position: relative
        grid-template-columns: 1fr
        gap: 1.5em

    .not-found
        text-align: center

    .no-margin
        margin: 0

    input.wide
        width: 100%

    a
        color: blue
        &:hover
            text-decoration: underline
</style>

<svelte:head>
    <title>Basileus</title>
</svelte:head>

<section class="container">
    <input type="text" class="no-margin wide" bind:value={searchQuery} on:input={updateSearchResults} name="search" placeholder="Search posts..">
</section>
<br>
{ #if (posts && posts.length) }
    <div class="posts-wrapper">
        { #each posts as post }
            <PostCard post={post} />
        {/each}
    </div>
    { #if (pages > 1) }
        <Paginator active={page} {pages} link="/" {queryParams} />
    { /if }
{ :else if searchQuery }
    <div class="not-found">No posts found</div>
{ :else }
    <div class="not-found">No posts found. <a href="/post/new">Create your first post</a></div>
{/if}

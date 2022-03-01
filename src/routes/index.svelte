<script context="module" lang="ts">
    import { PROTOCOL } from '../config'
    import type { Post } from '../models/post'
    import type { Page } from '../types'

    export async function preload(page: Page) {
        const pageNum = page.query.page ? +page.query.page : 1

        const postsResponse = await this.fetch(`${PROTOCOL}://${page.host}/api/post/list?page=${pageNum}`)
        const postsObject = await postsResponse.json()
        return {
            posts: postsObject.posts,
            pages: postsObject.pages,
            page: pageNum
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
    let searchQuery = ''
    $: queryParams = {
        s: searchQuery
    }

    const updateSearchResults = () => {
        sendAJAXRequest(
            '/api/post/list',
            'GET',
            { s: searchQuery },
            null,
            (res) => {
                posts = res.posts
                pages = res.pages
            }
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
{ #if (posts.length) }
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

<script context="module" lang="ts">
	import type { Post } from '../models/post'

	export async function preload() {
		const postsResponse = await this.fetch('/api/post/list')
		const postsObject = await postsResponse.json()
		return {
			posts: postsObject.posts,
			pages: postsObject.pages
		}
	}
</script>

<script lang="ts">
	import PostCard from '../components/PostCard.svelte'
	import { sendAJAXRequest } from '../utilities'

	export let posts: Post[]
	export let pages = 1
	let searchQuery = ''

	const updateSearchResults = () => {
		sendAJAXRequest(
			`/api/post/list`,
			'GET',
			{ s: searchQuery },
			null,
			(res) => {
				posts = res.posts,
				pages = res.pages
			}
		)
	}
</script>

<svelte:head>
	<title>Basileus</title>
</svelte:head>

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
{ :else if searchQuery }
	<div class="not-found">No posts found</div>
{ :else }
	<div class="not-found">No posts found. <a href="/post/new">Create your first post</a></div>
{/if}

<script context="module" lang="ts">
	import type { Post } from '../models/post'

	export async function preload() {
		const postsResponse = await this.fetch('/api/post/list')
		const posts = await postsResponse.json()
		return { posts }
	}
</script>

<script lang="ts">
	import PostCard from '../components/PostCard.svelte'

	export let posts: Post[]
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

	a
		color: blue
		&:hover
			text-decoration: underline
</style>

{ #if (posts.length) }
	<div class="posts-wrapper">
		{ #each posts as post }
			<PostCard post={post} />
		{/each}
	</div>
{ :else }
	<div class="not-found">No posts found. <a href="/post/new">Create your first post</a></div>
{/if}

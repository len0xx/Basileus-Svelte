<script context="module" lang="ts">
	type Post = {
		slug: string,
		title: string,
		text: string
	}

export function preload() {
		return this.fetch('posts.json').then((r: { json: () => any; }) => r.json()).then((posts: Post[]) => {
			return { posts }
		})
	}
</script>

<script lang="ts">
	import PostCard from '../components/PostCard.svelte'
	import { cutPostText } from '../utilities'

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
			<PostCard slug={ post.slug } title={ post.title }>
				{ cutPostText(post.text) }
			</PostCard>
		{/each}
	</div>
{ :else }
	<div class="not-found">No posts found. <a href="/new">Create your first post</a></div>
{/if}

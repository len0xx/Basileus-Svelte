<script context="module" lang="ts">
	type PostObject = {
		_id: string,
		slug: string,
		title: string,
		text: string
	}

	export async function preload({ params: { slug } }) {
		const postResponse = await this.fetch(`post/${slug}.json`)
		const post = await postResponse.json()
		return { post }
	}
</script>

<script lang="ts">
	import Button from '../../components/Button.svelte'
	import { sendAJAXRequest } from '../../utilities'
	export let post: PostObject
	let active = true

	function deletePost() {
		const formData = new FormData()

		sendAJAXRequest(
			`/post/${post.slug}.json`,
			'DELETE',
			formData,
			null,
			() => active = false,
			() => alert('Unexpected error occurred while deleting. Please try again later')
		)
	}
</script>

<style lang="sass">
	.buttons
		margin-top: 1em

	.inactive
		opacity: 0.5
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1 class="{ active ? '' : 'inactive' }">{post.title}</h1>

<div class="{ active ? "content" : "content inactive" }">
	{@html post.text.replace(/\r\n/g, '<br>')}
</div>
<div class="buttons">
	{ #if active }
		<Button actionType="delete" variant="danger" on:click={deletePost}>Delete this post</Button>
	{ :else }
		<p class="error">The post has been deleted</p>
	{/if }
</div>

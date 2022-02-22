<script context="module" lang="ts">
	import { User, UserRole } from '../../models/user'
	import type { PostObject } from '../../models/post'
	import type { Page, Session } from '../../types'

	export async function preload(page: Page, session: Session) {
		const postResponse = await this.fetch(`/api/post/${page.params.slug}`)
		const post = await postResponse.json()
		return {
			post,
			user: session.user
		}
	}
</script>

<script lang="ts">
	import Button from '../../components/Button.svelte'
	import { sendAJAXRequest } from '../../utilities'

	export let post: PostObject
	export let user: User | undefined = undefined

	let active = true

	function deletePost() {
		const formData = new FormData()

		sendAJAXRequest(
			`/api/post/${post.slug}`,
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
		margin-top: 2em

	.inactive
		opacity: 0.5
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<section class="container">
	<h1 class="{ active ? '' : 'inactive' }">{post.title}</h1>
	
	<div class="{ active ? "content" : "content inactive" }">
		{@html post.text.replace(/\r/g, '').replace(/\n/g, '<br>')}
	</div>
	{ #if user && user.role == UserRole.ADMIN }
		<div class="buttons">
			{ #if active }
				<Button actionType="delete" variant="danger" on:click={deletePost}>Delete this post</Button>
			{ :else }
				<p class="error">The post has been deleted</p>
			{/if }
		</div>
	{/if }
</section>

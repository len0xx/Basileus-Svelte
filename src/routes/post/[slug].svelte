<script context="module" lang="ts">
	type PostObject = {
		slug: string,
		title: string,
		text: string
	}

	export function preload({ params: { slug } }) {
		return this.fetch(`post/${slug}.json`).then((r: { json: () => any; }) => r.json()).then((post: PostObject) => {
			return { post }
		})
	}
</script>

<script lang="ts">
	export let post: PostObject
</script>

<style lang="sass">
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>

<div class="content">
	{@html post.text.replace(/\r\n/g, '<br>')}
</div>

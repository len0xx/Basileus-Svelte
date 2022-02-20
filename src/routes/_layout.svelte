<script context="module" lang="ts">
	import type { User } from '../models/user'
	import type { Page, Session } from '../utilities'

	export async function preload(page: Page, session: Session) {
		return {
			user: session.user || undefined
		}
	}
</script>

<script lang="ts">
	import Header from '../components/Header.svelte'
	import Menu from '../components/Menu.svelte'
	import Footer from '../components/Footer.svelte'

	export let user: User | undefined = undefined
	
	let menuOpened = false

	const toggleMenu = () => menuOpened = !menuOpened

	const closeMenu = () => menuOpened = false
</script>

<style lang="sass">
	main
		position: relative
		margin: 0 auto
		box-sizing: border-box
		min-height: calc(100vh - 80px)

	.content-wrapper
		padding: 2em
	
	section.content
		max-width: 600px
		margin: 0 auto
</style>

<Header on:menuClicked={toggleMenu} />

<main>
	<Menu opened={menuOpened} {user} />
	<div class="content-wrapper" on:click={closeMenu}>
		<section class="content">
			<slot></slot>
		</section>
	</div>
	<Footer />
</main>

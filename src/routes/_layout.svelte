<script lang="ts">
	import Header from '../components/Header.svelte'
	import Menu from '../components/Menu.svelte'
	import Footer from '../components/Footer.svelte'

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
	<Menu opened={menuOpened} />
	<div class="content-wrapper" on:click={closeMenu}>
		<section class="content">
			<slot></slot>
		</section>
	</div>
	<Footer />
</main>

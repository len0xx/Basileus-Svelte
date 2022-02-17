<script lang="ts">
    import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()
</script>

<header>
    <div on:click={() => dispatch('menuClicked')} class="hamburger">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <a href="/">Basileus</a>
</header>

<style lang="sass">
    header
        display: block
        position: relative
        font-family: 'PT Serif'
        font-size: 2em
        font-weight: 700
        text-align: center
        padding: 16px 32px
        background-color: #fff
        color: #333
        width: 100%
        z-index: 20
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, .2)
        .hamburger
            display: block
            position: absolute
            left: 32px
            top: 29px
            width: 40px
            height: 24px
            cursor: pointer
            span
                display: block
                position: relative
                width: 100%
                height: 4px
                margin-bottom: 5px
                background-color: #000
                &:last-of-type
                    margin-bottom: 0
</style>

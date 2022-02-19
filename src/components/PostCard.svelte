<article>
    <a href="/post/{slug}"><h1>{ title }</h1></a>
    <slot></slot>
</article>

<script lang="ts">
    export let title: string
    export let slug: string
</script>

<style lang="sass">
    article
        background-color: #fff
        border-radius: 10px
        padding: 1em
        color: #000
        box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.1)
        transition: 0.05s linear
        &:hover
            box-shadow: 1px 3px 6px 1px rgba(0, 0, 0, 0.15)
</style>

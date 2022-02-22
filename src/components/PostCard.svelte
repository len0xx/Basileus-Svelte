<article>
    <a href="/post/{post.slug}"><h1>{ post.title }</h1></a>
    <p>{ cutPostText(post.text) }</p>
</article>

<script lang="ts">
	import { cutPostText } from '../utilities'
	import type { Post } from '../models/post'

export let post: Post
</script>

<style lang="sass">
    article
        background-color: #fff
        border-radius: 10px
        padding: 2em 2.6em
        color: #000
        box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.1)
        transition: 0.05s linear
        &:hover
            box-shadow: 1px 3px 6px 1px rgba(0, 0, 0, 0.15)
</style>

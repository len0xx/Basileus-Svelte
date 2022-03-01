<style lang="sass">
    a
        color: blue
        &:hover
            text-decoration: underline

    .tech-stack
        display: grid
        grid-template-columns: repeat(4, 1fr)
        gap: 1em
        margin: 2em 0
        max-width: 100%
        span
            display: grid
            place-items: center
            max-width: 100%
            img
                height: 32px
</style>

<svelte:head>
    <title>Basileus – About</title>
</svelte:head>

<section class="container">
    <h1>About</h1>
    <p>Read more about this Svelte project on the <a target="_BLANK" href="https://github.com/len0xx/Basileus-Svelte">GitHub page</a></p>
    <br>
    <h2>Technologies used in this application:</h2>
    <div class="tech-stack">
        <span>
            <a href="https://svelte.dev" target="_BLANK">
                <img src="/images/svelte.svg" alt="Svelte Logo" title="Svelte">
            </a>
        </span>
        <span>
            <a href="https://expressjs.com" target="_BLANK">
                <img src="/images/express.svg" alt="ExpressJS Logo" title="ExpressJS">
            </a>
        </span>
        <span>
            <a href="https://mongodb.com" target="_BLANK">
                <img src="/images/mongodb.svg" alt="MongoDB Logo" title="MongoDB">
            </a>
        </span>
        <span>
            <a href="https://typescriptlang.org" target="_BLANK">
                <img src="/images/typescript.svg" alt="TypeScript Logo" title="TypeScript">
            </a>
        </span>
    </div>
</section>

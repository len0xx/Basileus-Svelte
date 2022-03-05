<script lang="ts">
    import { encodeQuery } from '../utilities'

    export let active: number
    export let pages: number
    export let link: string
    export let queryParams: Record<string, any> = {}

    const applyPageNumber = (link: string, num: number): string => link.replace('page={}', `page=${num}`)

    function getPages(max: number): number[] {
        const numbers: number[] = []
        for (let i = 1; i <= max; i++) {
            numbers.push(i)
        }
        return numbers
    }

    $: queryString = encodeQuery(queryParams)
    $: if (queryString.length) {
        queryString += '&page={}'
    }
    $: if (!queryString.length) {
        queryString += 'page={}'
    }
    $: finalLink = link + '?' + queryString

    $: pageNumbers = getPages(pages)
</script>

<style lang="sass">
    .paginator
        margin-top: 2em
        text-align: center
        .page-num
            display: inline-block
            padding: 3px 0
            color: black
            min-width: 32px
            min-height: 32px
            text-align: center
            border-radius: 100em
            &:not(:last-of-type)
                margin-right: 2em
            &.active
                background-color: blue
                color: white
</style>

<div class="paginator">
    { #each pageNumbers as num }
        <a href="{applyPageNumber(finalLink, num)}">
            <span class={active == num ? 'page-num active' : 'page-num'}>
                {num}
            </span>
        </a>
    { /each }
</div>

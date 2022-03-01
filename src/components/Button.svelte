<script lang="ts">
    export let actionType = 'submit'
    export let variant = 'primary'

    let className: string

    if (variant == 'danger') {
        className = 'red'
    }
    else if (variant == 'primary') {
        className = 'blue'
    }
</script>

<style lang="sass">
    button
        background-color: #1e2fe6
        color: white
        box-shadow: none
        border: 2px solid #1e2fe6
        cursor: pointer
        padding: 8px 16px
        border-radius: 6px
        font-weight: 500
        transition: 0.1s ease-in-out
        &:hover
            background-color: transparent
            color: #1e2fe6
        &.red
            background-color: #bf190d
            border-color: #bf190d
            color: white
            &:hover
                background-color: transparent
                color: #bf190d
            
</style>

<button type={actionType} class={className} on:click>
    <slot></slot>
</button>

<button type={actionType}>
    <slot></slot>
</button>

<script lang="ts">
    export let actionType: string
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
            
</style>
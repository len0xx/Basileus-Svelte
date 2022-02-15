<script lang="ts">
    import Button from '../components/Button.svelte'
</script>

<svelte:head>
	<title>Create a new post</title>
</svelte:head>

<style lang="sass">
    textarea
        border-radius: 4px
        border: 1px solid rgb(100, 130, 200)
        padding: 6px 10px
        min-width: 300px
        margin-bottom: 1em
        min-width: 100%

	input[type="text"]
        border-radius: 4px
        border: 1px solid rgb(100, 130, 200)
        padding: 6px 10px
        min-width: 300px
        margin-bottom: 1em
</style>

<form action="" method="POST">
    <label for="title">Title:</label><br>
    <input type="text" name="title"><br>
    <label for="text">Text:</label><br>
    <textarea name="text" cols="30" rows="10"></textarea><br>
    <Button actionType="submit">Create</Button>
</form>

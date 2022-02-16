<script lang="ts">
    import AjaxForm from '../components/AjaxForm.svelte';
    import Button from '../components/Button.svelte'
    import * as ERRORS from '../errors'

    let success = false
    let errorText = ''

    const handleSuccess = (event: CustomEvent<any>) => success = true

    const handleError = (event: CustomEvent<any>) => {
        const error = event.detail.error

        if (error == ERRORS.EMPTY_FIELDS) {
            errorText = 'Error: Required fields are empty'
        }
        else {
            errorText = 'Unexpected error occurred. Please try again later'
        }
    }
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

    .success
        color: rgb(40, 180, 40)
    .error
        color: rgb(180, 40, 40)

	input[type="text"]
        border-radius: 4px
        border: 1px solid rgb(100, 130, 200)
        padding: 6px 10px
        min-width: 300px
        margin-bottom: 1em

</style>

<AjaxForm action="new.ajax" method="POST" on:successSubmit={handleSuccess} on:error={handleError}>
    { #if success }
        <p class="success">The post has been successfully created</p>
    { :else if errorText }
        <p class="error">{errorText}</p>
    {/if}
    <label for="title">Title:</label><br>
    <input type="text" name="title"><br>
    <label for="text">Text:</label><br>
    <textarea name="text" cols="30" rows="10"></textarea><br>
    <Button actionType="submit">Create</Button>
</AjaxForm>

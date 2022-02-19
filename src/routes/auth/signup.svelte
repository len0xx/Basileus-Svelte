<svelte:head>
	<title>Basileus – Sign up</title>
</svelte:head>

<script lang="ts">
    import AjaxForm from '../../components/AjaxForm.svelte'
    import Button from '../../components/Button.svelte'

    let success = false

    const handleSuccess = () => success = true
    const handleError = () => {}
</script>

<style lang="sass"></style>

<h1>Sign up</h1>

<AjaxForm action="/auth/signup.json" method="POST" on:success={handleSuccess} on:error={handleError}>
    { #if success }
        <p class="success">Account created</p>
    {/if }
    <label for="firstname">First name:</label><br>
    <input type="text" name="firstname" required><br>
    <label for="lastname">Last name:</label><br>
    <input type="text" name="lastname"><br>
    <label for="email">Email:</label><br>
    <input type="email" name="email" required><br>
    <label for="password">Password:</label><br>
    <input type="password" name="password" required><br>
    
    <Button actionType="submit" variant="primary">Sign up</Button>
</AjaxForm>
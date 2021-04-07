<script lang="ts">
export let link = ""
export let disabled = false
</script>

{#if disabled}
	<div class="button" class:disabled href={link} {disabled}><slot/></div>
{:else if link}
	<a class="button" href={link} on:click><slot/></a>
{:else}
	<button class="button" on:click><slot/></button>
{/if}

<style>

</style>
<script lang="ts">
export let link = ""
export let disabled = false
</script>

{#if link}
	<a class="button" href={link} {disabled} on:click><slot/></a>
{:else}
	<button class="button" {disabled} on:click><slot/></button>
{/if}

<style>
.button {
	box-sizing: content-box;
	min-width: 1em;
	line-height: 1em;
	padding: var(--gap);

	text-align: center;
	text-decoration: none;
	color: white;

	background: chartreuse;
	border: none;
}
</style>
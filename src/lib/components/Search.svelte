<script lang="ts">
import { goto } from "$app/navigation"

export let query = ""

function search() {
	goto(`/search/1?q=${query}`)
}
</script>

<form class="flex" on:submit|preventDefault={search}>
	<input type="search" bind:value={query}>
	<button>search</button>
</form>

<style>
input {
	width: 100%;
}
</style>
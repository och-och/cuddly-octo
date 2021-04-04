<script lang="ts">
import { goto } from "$app/navigation"
import { Rating } from "$lib/api";

export let query = ""
export let rating: Rating = Rating.Safe

function search() {
	goto(`/search/1?q=${query}&f=${rating}`)
}
</script>

<form class="flex" on:submit|preventDefault={search}>
	<select bind:value={rating}>
		<option value={Rating.Safe}>Safe</option>
		<option value={Rating.Questionable}>Horny</option>
		<option value={Rating.Explicit}>Hentai</option>
		<option value={Rating.Any}>Any</option>
	</select>
	<input type="search" bind:value={query}>
</form>

<style>
input {
	width: 100%;
}
</style>
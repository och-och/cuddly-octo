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
	<select class="select" bind:value={rating}>
		<option value={Rating.Safe}>S</option>
		<option value={Rating.Questionable}>Q</option>
		<option value={Rating.Explicit}>E</option>
		<option value={Rating.Any}>A</option>
	</select>
	<input class="input" type="search" placeholder="Search" bind:value={query}>
</form>

<style>
.flex {
	gap: 0;
}
.input {
	width: 100%;
	border-bottom-left-radius: 0;
	border-top-left-radius: 0;
}
.select {
	flex-grow: 1;
	border-bottom-right-radius: 0;
	border-top-right-radius: 0;
}
</style>
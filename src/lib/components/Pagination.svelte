<script lang="ts">
import { Rating } from "$lib/api";
import Button from "./Button.svelte";

export let posts: IPosts
export let query = ""
export let rating: Rating = Rating.Safe

let pages: number[] = []
$: pages = generatePages(posts)

function generatePages(posts: IPosts) {
	const lastPage = Math.ceil(posts.total / posts.limit)

	const pages = Array.from({length:7}, (_,i) =>
		posts.page + i - 2
	)
	.filter(p => p >= 1)

	if (posts.page >= 5)
		pages.unshift(1)

	if (posts.page <= lastPage - 4)
		pages.push(lastPage)

	return pages
}
</script>

<div class="pagination | flex wrap">
	{#each pages as page}
		<Button link={`/search/${page}?q=${query}&f=${rating}`} disabled={page == posts.page+1}>{page}</Button>
	{/each}
</div>

<style>
.pagination {
	justify-content: center;
}
</style>
<script context="module" lang="ts">
export const ssr = false

import type { LoadInput, LoadOutput } from "@sveltejs/kit/types.internal"

/**
 * @type {import('@sveltejs/kit').Load}
 */
export async function load({ page }: LoadInput): Promise<LoadOutput> {
	return {
		props: {
			page: page.params.page,
			query: page.query.get("q"),
			rating: page.query.get("f")
		}
	}
}
</script>

<script lang="ts">
import PostPreview from "$lib/components/PostPreview.svelte"
import { Rating, searchPosts } from "$lib/api";
import Search from "$lib/components/Search.svelte";
import Pagination from "$lib/components/Pagination.svelte";

export let page: number = 1
export let query: string = ""
export let rating: Rating = Rating.Safe

let posts: Promise<IPosts>
$: posts = searchPosts(page, query, rating)
</script>

<main>
	<div class="search">
		<Search {query} {rating}/>
	</div>

	{#await posts}
		<p class="info">Searching...</p>
	{:then posts}
		<p class="info">found {posts.total} posts</p>
		<div class="posts">
			{#each posts.results as post}
				<PostPreview {post} {rating}/>
			{/each}
		</div>
		<div class="pagination">
			<Pagination {posts} {query} {rating}/>
		</div>
	{:catch}
		<p class="info">Can't load, sorry :(</p>
	{/await}
</main>

<style>
main {
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	grid-template-rows: auto auto 1fr;
	grid-template-areas:
		". search ."
		"info info info"
		"posts posts posts"
		". pagination ."
	;
	gap: var(--gap);
	padding: var(--gap);
}

.search {
	grid-area: search;
}

.info {
	grid-area: info;
}

.posts {
	grid-area: posts;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.pagination {
	grid-area: pagination;
}
</style>
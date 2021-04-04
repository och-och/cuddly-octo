<script context="module" lang="ts">
import type { LoadInput, LoadOutput } from "@sveltejs/kit/types.internal"

/**
 * @type {import('@sveltejs/kit').Load}
 */
export async function load({ page }: LoadInput): Promise<LoadOutput> {
	return {
		props: {
			page: page.params.page,
			query: page.query.get("q")
		}
	}
}
</script>

<script lang="ts">
import PostPreview from "$lib/components/PostPreview.svelte"
import { onMount } from "svelte";
import { searchPosts } from "$lib/api";
import Search from "$lib/components/Search.svelte";

export let page: number = 1
export let query: string = ""

let posts: Promise<IPosts> = new Promise(()=>{})

onMount(() => {
	posts = searchPosts(page, query)
})
</script>

<main>
	<div class="search">
		<Search bind:query/>
	</div>

	{#await posts}
		<p class="info">Searching...</p>
	{:then posts}
		<p class="info">found {posts.total} posts</p>
		<div class="posts">
			{#each posts.results as post}
				<PostPreview {post}/>
			{/each}
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
</style>
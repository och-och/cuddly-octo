<script context="module" lang="ts">
import type { LoadInput, LoadOutput } from "@sveltejs/kit/types.internal"

/**
 * @type {import('@sveltejs/kit').Load}
 */
export async function load({ page }: LoadInput): Promise<LoadOutput> {
	return {
		props: {
			hash: page.params.hash,
			rating: page.query.get("f")
		}
	}
}
</script>

<script lang="ts">
import { onMount } from "svelte"
import { getPost, Rating } from "$lib/api"
import Search from "$lib/components/Search.svelte"
import Spinner from "$lib/components/Spinner.svelte"

export let hash: string
export let rating: Rating = Rating.Safe
let post: IPost|null = null

onMount(async () => {
	post = await getPost(hash)
})

let tags: {original: string, display: string}[] = []
$: tags = post && post.tags
	.split(" ")
	.map(tag => ({original: tag, display: tag.replace("_", " ")}))
	|| []

let loading = true
</script>

<div class="post" class:loading>
	{#if loading}
		<div class="spinner">
			<Spinner/>
		</div>
	{/if}

	<div class="picture">
		{#if post}
			<img src={post.url} alt="" on:load={()=>loading=false}>
		{/if}
	</div>

	<Search bind:rating/>

	<div class="tags | flex v">
		{#each tags as tag}
			<a class="tag" href={`/search/1?q=${tag.original}&f=${rating}`}>{tag.display}</a>
		{/each}
	</div>
</div>

<style>
.post {
	position: relative;
	display: grid;
	grid-template-columns: minmax(100px, 200px) 1fr;
	grid-template-rows: auto 1fr;
	grid-template-areas:
		"search picture"
		"tags   picture"
	;
	gap: var(--gap);
	padding: var(--gap);
}

.spinner {
	grid-area: picture;
	top: 0;
	left: 0;
	width: 100%;
	max-height: 100%;
	max-height: calc(100vh - var(--gap) * 2);
}

.picture {
	grid-area: picture;
	max-height: calc(100vh - var(--gap) * 2);
	margin-inline: auto;
}
.picture img {
	max-width: 100%;
	max-height: calc(100vh - var(--gap) * 2);
}

.tags {
	grid-area: tags;
	align-content: flex-start;
	gap: 0;
}

.tag {
	font-size: .9rem;
	text-decoration: none;
}

@media screen and (max-width: 700px) {
	.post {
		grid-template-columns: 1fr;
		grid-template-rows: repeat(3, auto);
		grid-template-areas:
			"picture"
			"search"
			"tags"
		;
	}
}
</style>
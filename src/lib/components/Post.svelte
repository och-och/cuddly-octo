<script lang="ts">
import Search from "./Search.svelte"
import Spinner from "./Spinner.svelte"
import { Rating } from "$lib/api"

export let post: IPost|null = null
export let rating: Rating = Rating.Safe

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

	<Search {rating}/>

	<div class="tags | flex v">
		{#each tags as tag}
			<a class="tag" href={`/search/1?q=${tag.original}`}>{tag.display}</a>
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
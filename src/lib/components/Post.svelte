<script lang="ts">
import Search from "./Search.svelte";
import Spinner from "./Spinner.svelte";

export let post: IPost|null = null
let tags: {original: string, display: string}[] = []
$: tags = post && post.tags
	.split(" ")
	.map(tag => ({original: tag, display: tag.replace("_", " ")}))
	|| []

let loading = true
</script>

<div class="post">
	<div class="picture">
		{#if loading}
			<Spinner/>
		{/if}
		{#if post}
			<img src={post.url} alt="" on:load={()=>loading=false}>
		{/if}
	</div>

	<Search/>

	<div class="tags | flex v">
		{#each tags as tag}
			<a class="tag" href={`/search/1?q=${tag.original}`}>{tag.display}</a>
		{/each}
	</div>
</div>

<style>
.post {
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

.picture {
	grid-area: picture;
	position: relative;
	min-width: 100px;
	height: calc(100vh - var(--gap) * 2);
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
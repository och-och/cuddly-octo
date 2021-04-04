<script lang="ts">
import Spinner from "./Spinner.svelte"

export let post: IPost

let loading = true
</script>

<a href={`/post/${post.md5}`}>
	{#if loading}
		<Spinner/>
	{/if}
	<img on:load={()=>loading=false} src={ post.preview } alt="">
</a>

<style>
a {
	position: relative;
}

img {
	width: 100%;
	height: 100%;
	min-height: 200px;
	object-fit: contain;
}
</style>
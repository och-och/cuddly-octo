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
import Post from "$lib/components/Post.svelte"
import { onMount } from "svelte";
import { getPost, Rating } from "$lib/api";

export let hash: string
export let rating: Rating = Rating.Safe
let post: IPost|null = null

onMount(async () => {
	post = await getPost(hash)
})
</script>

<Post {post} {rating}/>
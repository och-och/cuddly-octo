<script context="module" lang="ts">
import type { LoadInput, LoadOutput } from "@sveltejs/kit/types.internal"

/**
 * @type {import('@sveltejs/kit').Load}
 */
export async function load({ page }: LoadInput): Promise<LoadOutput> {
	const { hash } = page.params

	return {
		props: {
			hash
		}
	}
}
</script>

<script lang="ts">
import Post from "$lib/components/Post.svelte"
import { onMount } from "svelte";
import { getPost } from "$lib/api";

export let hash: string
let post: IPost|null = null

onMount(async () => {
	post = await getPost(hash)
})
</script>

<Post {post}/>
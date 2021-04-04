export async function searchPosts(page: number, tags: string) {
	const res = await fetch(`/search/${page}.json?q=${tags}`)
	if (res.ok)
		return await res.json() as IPosts
	else
		throw res
}

export async function getPost(md5: string) {
	const res = await fetch(`/post/${md5}.json`)
	if (res.ok) {
		const postRes = await res.json() as IPostsContainer
		const post = postRes.results[0]
		return post
	}
	else {
		throw res
	}
}
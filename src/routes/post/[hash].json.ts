import type { Request, Response } from "@sveltejs/kit"
import fetch from "node-fetch"

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function get({ params }: Request): Promise<Response> {
	const { hash } = params
	const res = await fetch(`https://cure.ninja/booru/api/json/md5/${hash}`)

	return {
		status: res.status,
		headers: {...res.headers},
		body: await res.json(),
	}
}
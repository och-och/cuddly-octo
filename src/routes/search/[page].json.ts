import type { Request, Response } from "@sveltejs/kit"
import fetch from "node-fetch"

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function get({ params, query }: Request): Promise<Response> {
	const { page } = params

	const res = await fetch(`https://cure.ninja/booru/api/json/${page}?${query.toString()}`)

	return {
		body: await res.json()
	}
}
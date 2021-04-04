interface IPost {
	md5: string
	hash: string
	created: number
	width: number
	height: number
	aspect: number
	rating: string
	tag: string
	tags: string
	url: string
	preview: string
	source: string
	extension: string
	id: string
	size: string
	page: string
	sourceURL: string
	pixiv: string
	userID: string
	userName: string
	userURL: string
	hasChildren: string
	parentHash: null,
	parentID: string
}

interface IPostsContainer {
	success: boolean
	results: IPost[]
}

interface IPosts extends IPostsContainer {
	query: string
	total: number
	took: number
	php_took: number
	count: number
	limit: number
	page: number
	offset: number
	next_page: string
	search: string
}
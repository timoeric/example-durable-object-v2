import html from '../html/index'
import notFoundHtml from '../html/404'

export const notFoundResponse = () =>
	new Response(notFoundHtml(), {
		headers: {
			'content-type': 'text/html',
			'Access-Control-Allow-Origin': '*'
		},
		status: 404
	})

export const htmlResponse = () =>
	new Response(html(), {
		headers: {
			'content-type': 'text/html',
			'Access-Control-Allow-Origin': '*',
		},
		status: 200
	})

export const jsonResponse = (json: BodyInit | null | undefined) =>
	new Response(json, {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
			'Access-Control-Allow-Origin': '*'
		},
		status: 200
	})

export const jsonResponse400 = (json: BodyInit | null | undefined) =>
	new Response(json, {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
			'Access-Control-Allow-Origin': '*'
		},
		status: 400
	})

export const jsonResponse401 = (json: BodyInit | null | undefined) =>
	new Response(json, {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
			'Access-Control-Allow-Origin': '*'
		},
		status: 401
	})

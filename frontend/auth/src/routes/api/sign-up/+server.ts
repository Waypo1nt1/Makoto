import { graphql } from '$houdini'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async event => {
	const { request, cookies } = event
	const { username, password, question, answer } = await request.json()

	const mutation = graphql(`
		mutation SignUp($username: String!, $password: String!, $question: String!, $answer: String!) {
			signUp(
				input: { username: $username, password: $password, question: $question, answer: $answer }
			) {
				userId
				tokens {
					access_token
					refresh_token
				}
			}
		}
	`)

	const res = await mutation.mutate({ username, password, question, answer }, { event })
	if (!res.data) return new Response(JSON.stringify(res.errors), { status: 400 })

	const { tokens, userId } = res.data.signUp
	cookies.set('auth-token', tokens.access_token, { httpOnly: true, path: '/' })
	cookies.set('refresh-token', tokens.refresh_token, { httpOnly: true, path: '/' })

	return new Response(JSON.stringify(userId), { status: 200 })
}

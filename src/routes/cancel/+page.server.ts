import type {PageServerLoad} from './$types'
import {redirect} from "@sveltejs/kit"

export const load: PageServerLoad = async ({url}) => {
    const sessionId = url.searchParams.get('session_id')
    if (sessionId === null) redirect(303, '/')
}
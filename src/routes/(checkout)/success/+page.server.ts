import type {PageServerLoad} from './$types'
import {stripe} from "../../stripe"
import {redirect} from "@sveltejs/kit"
import db from "$lib/db"
import type {LastDonator} from "$type/lastDonator"

export const load: PageServerLoad = async ({url}) => {
    const sessionId = url.searchParams.get('session_id')
    if (sessionId === null) redirect(303, '/')

    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.status !== 'complete') redirect(303, '/')

    const donate: LastDonator = await db.donate.update({
        where: {
            session: sessionId
        },
        data: {
            accepted: true
        }
    })

    return {
        donate: donate
    }
}
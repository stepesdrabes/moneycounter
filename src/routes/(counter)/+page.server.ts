import type {PageServerLoad} from './$types'
import {env} from '$env/dynamic/private'
import db from "$lib/db";
import type {LastDonator} from "../../type/lastDonator"

export const load: PageServerLoad = async (event) => {
    const goal = Number(env.GOAL)
    const lastDonators = await db.donate.findMany({
        take: 1,
        orderBy: {
            timestamp: 'desc'
        }
    })

    const totalDonations = await db.donate.aggregate({
        _sum: {
            amount: true
        }
    })

    let lastDonator: LastDonator | undefined = lastDonators[0] ?? undefined

    return {
        amount: totalDonations._sum.amount ?? 0,
        goal: isNaN(goal) ? 0 : goal,
        lastDonator: lastDonator
    }
}


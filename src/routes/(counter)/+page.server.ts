import type {PageServerLoad} from './$types'
import type {LastDonator} from "../../type/lastDonator"
import { env } from '$env/dynamic/private'

export const load: PageServerLoad = async (event) => {
    const goal = Number(env.GOAL)
    const lastDonator: LastDonator = {
        amount: 100,
        anonymous: true,
        country: "",
        name: "",
        timestamp: ""
    }

    return {
        amount: 100,
        goal: isNaN(goal) ? 0 : goal,
        lastDonator: lastDonator
    }
}
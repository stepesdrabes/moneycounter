import type {RequestHandler} from './$types'
import {stripe} from "../stripe"
import {env} from "$env/dynamic/private"
import {json} from '@sveltejs/kit'
import db from "$lib/db";

export const POST: RequestHandler = async ({request}) => {
    const data = await request.json()

    const donateObject = {
        price_data: {
            currency: 'EUR',
            product_data: {
                name: 'Donation'
            },
            unit_amount: data.amount * 100
        },
        quantity: 1
    }

    const session = await stripe.checkout.sessions.create({
        line_items: [donateObject],
        payment_method_types: ['card', 'paypal'],
        mode: 'payment',
        success_url: `${env.BASE}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${env.BASE}/cancel`,
        phone_number_collection: {
            enabled: false
        }
    })

    await db.donate.create({
        data: {
            session: session.id,
            anonymous: data.anonymous,
            amount: data.amount,
            name: data.name,
            country: 'DE',
            accepted: false
        }
    })

    return json({url: session.url})
}
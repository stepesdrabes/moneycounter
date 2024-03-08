import type {RequestHandler} from './$types'
import {stripe} from "../stripe"
import {env} from "$env/dynamic/private"
import {json} from '@sveltejs/kit'

export const POST: RequestHandler = async ({request}) => {
    const data = await request.json()

    const donateObject = {
        price_data: {
            currency: 'USD',
            product_data: {
                name: 'Donation'
            },
            unit_amount: 100
        },
        quantity: 1
    }

    // Create stripe session
    const session = await stripe.checkout.sessions.create({
        line_items: [donateObject],
        payment_method_types: ['card', 'paypal'],
        mode: 'payment',
        success_url: `${env.BASE}/success`,
        cancel_url: `${env.BASE}/cancel`,
        phone_number_collection: {
            enabled: false
        }
    })

    return json({url: session.url})
}
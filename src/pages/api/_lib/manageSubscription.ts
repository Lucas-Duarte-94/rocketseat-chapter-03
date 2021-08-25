import { Fauna } from "../../../services/fauna";
import { query as q } from 'faunadb';
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction = false
) {
    const userRef = await Fauna.query(
        q.Select(
            "ref",
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_customer_id'),
                    customerId
                )
            )
        )
    )

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }

    console.log(subscriptionData)

    if(createAction) {
        await Fauna.query(
            q.If(
                q.Not(
                    q.Exists(
                        q.Match(
                            q.Index('subscriptions_by_id'),
                            subscriptionData.id
                        )
                    )
                ),
                q.Create(
                    q.Collection('subscriptions'),
                    { data: subscriptionData }
                ),
                q.Get(
                    q.Match(
                        q.Index('subscriptions_by_id'),
                        subscriptionData.id
                    )
                )
            )
        )
    } else {
        await Fauna.query(
            q.Replace(
                q.Select(
                    "ref",
                    q.Get(
                        q.Match(
                            q.Index('subscriptions_by_id'),
                            subscriptionId
                        )
                    )
                ),
                { data: subscriptionData }
            )
        )
    }

}
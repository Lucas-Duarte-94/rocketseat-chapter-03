# ig.news

This is a news page with monthly payment.  

This project was done with NextJS, TypeScript, SASS/SCSS for front-end.

If you wanna try this project by yourself, you can use a test card from stripe (4242 4242 4242 4242) and any CVC.

## Languages/Services

- NextJS.
- TypeScript.
- SASS/SCSS.
- FaunaDB.
- Stripe.
- Prismic CMS.

### Home page:

![home_page](https://user-images.githubusercontent.com/57713413/131266046-2994b4b1-a08a-4aa6-946c-397f1042a03b.png)

### Posts:

![posts](https://user-images.githubusercontent.com/57713413/131266065-5539ebe3-3e3e-4fef-b9cb-eaa57fdfdb33.png)


--------------------------

## Authetication

As it is supposed to be a developer news, so login was done with OAuth.

### OAuth authentication:
![OAuth](https://user-images.githubusercontent.com/57713413/131266284-1c4c2aae-208c-4ee9-a690-97db29accc2c.png)

-----------------------------

## Payment

To handle all payments I used stripe services, and listen to all events if the payment was successful/canceled was used webhooks from FaunaDB.

### Stripe payment:

![stripe_payment](https://user-images.githubusercontent.com/57713413/131266070-97392f80-dcca-4ab3-bf9f-4563c58c7d43.png)

### Webhooks:
![webhooks](https://user-images.githubusercontent.com/57713413/131266323-139d29c9-9115-4efa-83f2-cbef546818ae.png)

---------------------

## Content

All content was managed using Prismic CMS. If user didn't subscribe or didn't log in will be shown a preview page with few paragraphs, as soon you subscribe or loggin on an account with subscribe status "active" will be redirect to full content page.

obs: If you try to force to access to full content page without loggin/subscription, you will be redirect to home page.

### Prismic.
![Prismic_infos](https://user-images.githubusercontent.com/57713413/131266365-b8aae89a-c492-4714-b2c5-aa9a89453910.png)

### Content preview.
![content_preview](https://user-images.githubusercontent.com/57713413/131266263-1b2c6224-a7ff-43e5-8179-d7bd00ef5a07.png)

### Full content.
![full_content](https://user-images.githubusercontent.com/57713413/131266268-9eb288f5-dfc0-4b53-9394-d1a2c0d82c80.png)

### FaunaDB.
![user_faunaDB](https://user-images.githubusercontent.com/57713413/131266292-e4e49e55-4c72-4d83-b0de-ddd167328eba.png)
![faunaDB_subscription](https://user-images.githubusercontent.com/57713413/131266314-8c7a7482-9fb5-40a4-b06d-e44f6ed98a03.png)

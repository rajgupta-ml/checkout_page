# Checkout Page Builder

This is a no-code checkout page builder that allows users to create fully customizable payment forms. Built with Next.js, it integrates with Stripe for payments and Clerk for user authentication.

## Features

* **Customizable Checkout Pages:** Design checkout pages that match your brand with customizable layouts, colors, and CSS.
* **Product Management:** Add and manage products, including titles, descriptions, pricing, and images.
* **Discount Codes:** Create and manage percentage or fixed amount discount codes.
* **Payment Processing:** Securely accept payments through Stripe.
* **User Authentication:** User authentication is handled using Clerk.
* **Analytics Dashboard:** Track page views, revenue, and conversion rates for your checkout pages.
* **Live Previews:** Instantly preview your checkout pages as you build them.

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org/)
* **Authentication:** [Clerk](https://clerk.com/)
* **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
* **File Storage:** [Amazon S3](https://aws.amazon.com/s3/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Prerequisites

You will need to create a `.env.local` file in the root of the project and add the following environment variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

MONGODB_URI=

REGION=
ACCESS_KEY_ID=
SECRET_ACCESS_KEY=
S3_BUCKET_NAME=

URL=
```


Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

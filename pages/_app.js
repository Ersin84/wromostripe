import '../public/global.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp


//export default function MyApp({ Component, pageProps }) {
//  return <Component {...pageProps} />;
//}

// // Language: javascript
// // Path: components\CheckoutForm.jsx
// import React from "react";
// import { useStripe, useElements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import PaymentElement from "./PaymentElement";
//
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
//
// export default function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//
//   const [message, setMessage] = React.useState(null);
//   const [isLoading, setIsLoading] = React.useState(false);
//
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//
//     setIsLoading(true);
//
//     const cardElement = elements.getElement("card");
//
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//     });
//
//     if (error) {
//       setMessage(error.message);
//       setIsLoading(false);
//     } else {
//       const { id } = paymentMethod;
//
//       try {
//         const response = await fetch("/api/checkout", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ id, amount: 1099 }),
//         });

//         const data = await response.json();
//
//         if (data.error) {
//           setMessage(data.error.message);

//           setIsLoading(false);
//         } else {
//           setMessage("Success! Your payment was confirmed.");
//           setIsLoading(false);
//         }
//       } catch (error) {
//         setMessage(error.message);
//         setIsLoading(false);
//       }
//     }


import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import App from "../pages";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
    
    setIsLoading(false);
  };


  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}

      <style jsx>{`
        #payment-form {
          max-width: 400px;
          margin: 0 auto;
        }

        #payment-message {
          line-height: 2;
          font-size: 13px;
          color: rgb(105, 115, 134);
          margin-top: 1em;
          text-align: center;
        }

        #submit {

          background-color: #6772e5;
          border-radius: 4px;
          border: 0;
          color: #fff;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.025em;
          line-height: 44px;
          margin: 0 0 32px;
          padding: 0 30px;
          text-transform: uppercase;
          width: 100%;
          -webkit-transition: all 150ms ease;
          transition: all 150ms ease;
        }

        #submit:hover {
          filter: contrast(115%);
        }

        #submit:disabled {
          opacity: 0.5;
          cursor: default;
        }

        /* spinner/processing state, errors */
        .sr-field-error {
          color: #fa755a;
          font-size: 13px;
          line-height: 17px;
          margin-top: 12px;
        }

        .sr-input {
          background-color: #fff;
          background-image: none;
          border: 1px solid #ccd0d2;
          border-radius: 4px;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
          color: #495057;
          font-size: 16px;
          height: 40px;
          padding: 10px 12px;
          vertical-align: top;
          width: 100%;
        }

        .sr-input::placeholder {
          color: #aab7c4;
        }

        .sr-input--focus {
          box-shadow: 0 0 0 0.2rem rgba(103, 114, 229, 0.25);
          border-color: #6772e5;
        }

        .sr-input--error {
          border-color: #fa755a;
        }

        /* spinner/processing state */
        .sr-field--disabled {
          opacity: 0.5;
        }

        .sr-combo-input {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .sr-combo-input input + input {
          margin-left: 12px;
        }

        .sr-combo-input input {
          flex: 1 1 100%;
          margin-bottom: 12px;
        }

        .sr-combo-input input:last-child {
          margin-bottom: 0;
        }

        /* spinner/processing state */
        .sr-spinner {
          align-items: center;
          display: flex;
          height: 100%;
          justify-content: center;
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
        }

        .sr-spinner .spinner {
          animation: spinner 400ms infinite linear;
          border-color: #6772e5;
          border-radius: 50%;
          border-style: solid;
          border-width: 2px;
          height: 20px;
          width: 20px;
        }

        .sr-spinner .path {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
          stroke: #6772e5;
          stroke-linecap: round;
          stroke-width: 2;
          animation: dash 1.5s ease-in-out infinite;
        }

        @keyframes spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes dash {
          0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
          }
          100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
          }
        }
      `}</style>
    </form>
  );
}

//return to home page url


const returnToHome = () => {
  window.location.href = "https://www.wromo.app";
};





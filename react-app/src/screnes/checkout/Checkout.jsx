import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51MopRJCJImsIoEVaB0j0vJ8JfTcVNakTkA4XIwMzPC8lY3oFqWLSxIfRVPsRWzENf0wI7edi0KxND7rVTM9Y76iP00LsRIqsCp"
);

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const cart = useSelector((state) => state.cart.cart);
  const [paymentMethod, setPaymentMethod] = useState("payment_card");
  const navigate = useNavigate();

  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const isThirdStep = activeStep === 2;
  const isForthStep = activeStep === 3;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    if (isFirstStep) {
    }

    if (isSecondStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isThirdStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };
  const handleDiscountCodeChange = (event) => {
    setDiscountCode(event.target.value);
  };

  async function makePayment(values) {
    const stripe = await stripePromise;

    const requestBody = {
      userName: [
        values.billingAddress.firstName,
        values.billingAddress.lastName,
      ].join(" "),
      billingAddress: values.billingAddress,
      shippingAddress: values.shippingAddress,
      customerEmail: values.email,
      customerPhoneNumber: values.phoneNumber,
      discountCode: discountCode,
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
      paymentMethod: paymentMethod,
    };

    const response = await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (paymentMethod === "payment_card") {
      const session = await response.json();
      await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } else {
      navigate("/checkout/success");
    }
  }

  const handlePaymentMethodClick = (e) => {
    const targetRadio = e.target.querySelector("input[type='radio']");
    setPaymentMethod(targetRadio.id);
  };

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Checkout and Discounts</StepLabel>
        </Step>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Box
                  className="w-full flex flex-col gap-10 items-center justify-center"
                  style={{ height: "calc(100vh - 601px)" }}
                >
                  <p className="w-full text-left">1. Payment Method</p>
                  <Box className="grid grid-cols-2 gap-10 w-full">
                    <Box className="w-full flex  items-center justify-center">
                      <Box
                        className="flex gap-5 justify-center items-center text-lg border rounded-md w-1/2 p-2 cursor-pointer"
                        onClick={handlePaymentMethodClick}
                      >
                        <input
                          type="radio"
                          name="payment_method"
                          id="payment_pending"
                          checked={paymentMethod === "payment_pending"}
                          onChange={handlePaymentMethodClick}
                        />
                        Pay on Delivery
                      </Box>
                    </Box>
                    <Box className="w-full flex  items-center justify-center">
                      <Box
                        className="flex gap-5 justify-center items-center text-lg border rounded-md w-1/2 p-2 cursor-pointer"
                        onClick={handlePaymentMethodClick}
                      >
                        <input
                          type="radio"
                          name="payment_method"
                          id="payment_card"
                          checked={paymentMethod === "payment_card"}
                          onChange={handlePaymentMethodClick}
                        />
                        Card payment
                      </Box>
                    </Box>
                  </Box>
                  <p className="w-full text-left">2. Your Discount Code</p>

                  <TextField
                    fullWidth
                    type="text"
                    label="Discount Code"
                    onBlur={handleBlur}
                    onChange={handleDiscountCodeChange}
                    value={discountCode}
                    name="Discount Code"
                  />
                </Box>
              )}
              {isSecondStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isThirdStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isForthStep && (
                <Box
                  className="w-full flex items-center justify-center"
                  style={{ height: "calc(100vh - 611px)" }}
                >
                  <CircularProgress />
                </Box>
              )}
              <Box
                display="flex"
                justifyContent="space-between"
                gap="50px"
                mt="20px"
              >
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  {!isThirdStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  discountCode: "",
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    discountCode: yup.string(),
  }),
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export default Checkout;

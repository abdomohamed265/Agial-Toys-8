import React from "react";
import { paySchema } from "../schema/index";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";


import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Radio,  
  RadioGroup,
  Typography,
  TextField as Input,
} from "@mui/material";

import { formatCardNumber, formatExpiryDate } from "../utils/formatting";
import { CalendarToday, CreditCard } from "@mui/icons-material";
const PaymentForm = () => {
  const [holderName, setHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiaryDate, setExpiaryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema: paySchema,
    onSubmit: async (values) => {
      // Implement payment logic here
      console.log("Processing payment...", values);
    },
  });

  const Send = async(event) =>{  
    try{
    alert("تمت عملية الشراء بنجاح")
      await axios.post(`https://agial-toys-8.onrender.com/payment`,{
        holderName,
        cardNumber,
        expiaryDate,
        cvv,
      })
      
    }
    catch(event){
      console.log(event);
  }}

  return (
    <>
      <Box
        sx={{
          background: "var(--light-grey)",
          py: 5,
          px: { xs: 2, md: 7 },
          maxWidth: "32rem",
          margin: "0 auto",
          my: 5,
          borderRadius: "20px",
        }}
      >
        {/* <SharedLayout> */}
        <Box>
          <Typography
            variant="h5"
            className="fw-500 text-center"
            sx={{ pb: 3 }}
          >
            Pay with card
          </Typography>
          <Box sx={{ pb: 3 }} className="flex justify-content-between">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="credit"
                name="radio-buttons-group"
                sx={{
                  ".Mui-checked": {
                    color: "var(--main-color) !important",
                  },
                  span: {
                    fontWeight: "500",
                  },
                }}
              >
                <FormControlLabel
                  value="credit"
                  control={<Radio />}
                  label="Credit or Debit Card"
                />
              </RadioGroup>
            </FormControl>
            <Box>
              <img
                src="/assets/svg/visa.svg"
                alt="visa"
                width={40}
                height={40}
              />
              <img
                src="/assets/svg/master_card.svg"
                alt="visa"
                width={40}
                height={40}
              />
            </Box>
          </Box>
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Box sx={{ pb: 2 }}>
                    <InputLabel sx={{ py: 0.5, color: "#49454F" }}>
                      Cardholder Name
                    </InputLabel>
                    <Input
                      fullWidth
                      id="name"
                      name="name"
                      value={holderName}
                      onChange={(e) => {
                        setHolderName(e.target.value);
                        formik.handleChange(e);
                      }}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      placeholder="e.g John Doe"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Box sx={{ pb: 2 }}>
                    <InputLabel sx={{ py: 0.5, color: "#49454F" }}>
                      Card Number
                    </InputLabel>
                    <Input
                      fullWidth
                      id="cardNumber"
                      name="cardNumber"
                      value={cardNumber}
                      onChange={(e) => {
                        e.target.value = formatCardNumber(e.target.value);
                        formik.handleChange(e);
                        setCardNumber(e.target.value);
                      }}
                      error={
                        formik.touched.cardNumber &&
                        Boolean(formik.errors.cardNumber)
                      }
                      helperText={
                        formik.touched.cardNumber && formik.errors.cardNumber
                      }
                      sx={{
                        "& .MuiInputBase-root": {
                          paddingLeft: "8px",
                        },
                      }}
                      inputProps={{ maxLength: 19 }}
                      placeholder="1234 1234 1234 1234"
                      // placeholder="e.g John Doe"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end">
                            <IconButton style={{ marginRight: "-20px" }} edge="end" sx={{ p: 0 }}>
                              <CreditCard className="main-color" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel sx={{ py: 0.5, color: "#49454F" }}>
                    Expiry Date
                  </InputLabel>
                  <Input
                    variant="outlined"
                    fullWidth
                    id="expiryDate"
                    name="expiryDate"
                    value={expiaryDate}
                    onChange={(e) => {  
                      e.target.value = formatExpiryDate(e.target.value);
                      formik.handleChange(e);
                      setExpiaryDate(e.target.value)
                    }}
                    error={
                      formik.touched.expiryDate &&
                      Boolean(formik.errors.expiryDate)
                    }
                    helperText={
                      formik.touched.expiryDate && formik.errors.expiryDate
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarToday
                            sx={{ color: "#ABABAB", width: "1rem" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="MM/YY"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel sx={{ py: 0.5, color: "#49454F" }}>
                    CVV
                  </InputLabel>
                  <Input
                    variant="outlined"
                    fullWidth
                    id="cvv"
                    name="cvv"
                    value={cvv}
                    onChange={(e) => {
                      setCvv(e.target.value);
                      formik.handleChange(e);
                    }}
                    error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                    helperText={formik.touched.cvv && formik.errors.cvv}
                    inputProps={{ maxLength: 4 }}
                    placeholder="e.g 1234"
                  />
                </Grid>
              </Grid>

              <Button onClick={Send}
              onSubmit={formik.handleSubmit}
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  width: "100%",
                  mt: 4,
                  py: 1.3,
                  fontWeight: "500",
                  backgroundColor: "darkblue",
                }}
                className="normal-text"
              >
                Pay Now
              </Button>
            </form>
          </Box>
        </Box>
        {/* </SharedLayout> */}
      </Box>
    </>
  );
};

export default PaymentForm;

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCustomer } from "../Context/CustomerContext";
import { FormikProvider, useFormik } from "formik";
import { validationSchema } from "./Validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Button,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";

const CustomerForm = () => {
  // States for loading
  const [panLoader, setpanLoader] = useState(false);
  const [codeLoder, setcodeLoder] = useState(false);

  // States for list for states/cities - Optional
  const [cityList, setCityList] = useState([]);
  const [stateList, setStateList] = useState([]);

  // Adding customer to storage using context-api
  const { addCustomer } = useCustomer();

  // Generating unique customer id
  let customerId = uuidv4();

  // Formik library configuration for filling customer form
  const formik = useFormik({
    initialValues: {
      pan: "",
      fullName: "",
      email: "",
      mobile: "",
      addressLine1: "",
      addressLine2: "",
      postCode: "",
      state: "",
      city: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newCustomer = {
        id: customerId,
        pan: values.pan,
        fullName: values.fullName,
        email: values.email,
        mobile: values.mobile,
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        postCode: values.postCode,
        state: values.state,
        city: values.city,
      };
      //console.log(values);
      addCustomer(newCustomer);
      resetForm();
    },
  });

  // Api calling to verify pan number
  const handleVerifyPan = async (e) => {
    formik.handleChange(e);
    const pan = e.target.value;

    if (pan.length === 10) {
      setpanLoader(true);
      try {
        const response = await axios.post(
          "https://lab.pixel6.co/api/verify-pan.php",
          { panNumber: pan }
        );
        setTimeout(() => {
          setpanLoader(false);
          formik.setFieldValue("fullName", response.data.fullName);
          //console.log("Api-resp-pan",response.data);
        }, 2000);
      } catch (error) {
        setpanLoader(false);
        console.log("Error in verification", error.message);
      }
    }
  };

  // Api calling to verify post code
  const handlePostCode = async (e) => {
    formik.handleChange(e);
    const code = e.target.value;

    if (code.length === 6) {
      setcodeLoder(true);
      try {
        const response = await axios.post(
          "https://lab.pixel6.co/api/get-postcode-details.php",
          {
            postcode: code,
          }
        );
        setTimeout(() => {
          setcodeLoder(false);

          const { city, state } = response.data;
          if (state.length > 1) {
            setStateList(state);
            formik.setFieldValue("state", "");
          } else {
            formik.setFieldValue("state", state[0].name);
            setStateList([]);
          }

          if (city.length > 1) {
            setCityList(city);
            formik.setFieldValue("city", "");
          } else {
            formik.setFieldValue("city", city[0].name);
            setCityList([]);
          }

          // console.log("Api-resp-postcode", response.data);
        }, 2000);
      } catch (error) {
        setcodeLoder(false);
        console.log("Error in verification", error.message);
      }
    }
  };

  const navigate = useNavigate();

  const handlePage = () => {
    navigate("/customer-list");
  };

  return (
    <>
      <FormikProvider>
        <Button variant="contained" color="primary" onClick={handlePage}>
          Customer List
        </Button>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "column",
            p: 3,
            backgroundColor: "white",
            margin: "2vh auto",
            top: "50%",
            left: "50%",
            maxWidth: 500,
            height: "102vh",
          }}
        >
          <span style={{ display: "flex" }}>
            <TextField
              fullWidth
              required
              label="Pan no:"
              name="pan"
              value={formik.values.pan}
              onChange={handleVerifyPan}
              error={formik.touched.pan && Boolean(formik.errors.pan)}
              helperText={formik.touched.pan && formik.errors.pan}
            />
            {panLoader && (
              <CircularProgress
                size={24}
                style={{ marginLeft: 10, marginTop: 16 }}
              />
            )}
          </span>

          <TextField
            required
            label="Full Name"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />

          <TextField
            required
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            required
            label="Mobile no:"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
          />

          <TextField
            required
            label="Address Line 1"
            name="addressLine1"
            value={formik.values.addressLine1}
            onChange={formik.handleChange}
            error={
              formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)
            }
            helperText={
              formik.touched.addressLine1 && formik.errors.addressLine1
            }
          />
          <TextField
            required
            label="Address Line 2"
            name="addressLine2"
            value={formik.values.addressLine2}
            onChange={formik.handleChange}
            error={
              formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)
            }
            helperText={
              formik.touched.addressLine2 && formik.errors.addressLine2
            }
          />
          <span style={{ display: "flex" }}>
            <TextField
              fullWidth
              required
              label="Post Code"
              name="postCode"
              value={formik.values.postCode}
              onChange={handlePostCode}
              error={formik.touched.postCode && Boolean(formik.errors.postCode)}
              helperText={formik.touched.postCode && formik.errors.postCode}
            />
            {codeLoder && (
              <CircularProgress
                size={24}
                style={{ marginLeft: 10, marginTop: 16 }}
              />
            )}
          </span>
          {stateList.length > 1 ? (
            <FormControl
              required
              error={formik.touched.city && Boolean(formik.errors.city)}
            >
              <InputLabel>State</InputLabel>
              <Select
                label="State"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
              >
                {stateList.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.state && Boolean(formik.errors.state) && (
                <>{formik.errors.state}</>
              )}
            </FormControl>
          ) : (
            <TextField
              required
              label="State"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          )}

          {cityList.length > 1 ? (
            <FormControl
              required
              error={formik.touched.city && Boolean(formik.errors.city)}
            >
              <InputLabel>City</InputLabel>
              <Select
                label="City"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
              >
                {cityList.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.city && Boolean(formik.errors.city) && (
                <>{formik.errors.city}</>
              )}
            </FormControl>
          ) : (
            <TextField
              required
              label="City"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={formik.handleSubmit}
          >
            Submit
          </Button>
        </Paper>
      </FormikProvider>
    </>
  );
};

export default CustomerForm;

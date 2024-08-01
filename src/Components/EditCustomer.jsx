import { useEffect, useState } from "react";
import { useCustomer } from "../Context/CustomerContext"
import { validationSchema } from "./Validation";
import { FormikProvider, useFormik } from "formik";
import {
  Box,
  Button,
  TextField,
  Modal,
  Paper,
} from "@mui/material";

const EditCustomer = ({customerId,onClose}) => {
  // Calling customers and updateCustomer using context-api
  const{customers, updateCustomer}=useCustomer();

  // State for specific customer details
  const [customer,setCustomer] = useState(null);

  useEffect(()=>{
    const customerData = customers.find((check)=> check.id === customerId);
    setCustomer(customerData)
  },[customerId,customers]);

  // Formik library configuration for editing customer form
  const formik = useFormik({
    initialValues: {
      pan:customer?.pan,
      fullName:customer?.fullName,
      email:customer?.email,
      mobile:customer?.mobile,
      addressLine1:customer?.addressLine1,
      addressLine2:customer?.addressLine2,
      postCode:customer?.postCode,
      state:customer?.state,
      city:customer?.city,
    },
    enableReinitialize:true,
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

      // Editing customer data and then saving in local storage
      updateCustomer(newCustomer);

      // For closing the editing modal
      onClose();
    },
  });
  return (
    <>
    <Modal open={Boolean(customerId)} onClose={onClose}>
    
        <Paper
        sx={{
          display:"flex",
          justifyContent:"space-between",
          flexDirection:"column",
          p:3,
          backgroundColor:"white",
          margin:"2vh auto",
          top:"50%",
          left:"50%",
          maxWidth:400,
          height:"90vh",
        }}
        
        >
          <TextField
            required
            label="Pan no:"
            name="pan"
            value={formik.values.pan}
            onChange={formik.handleChange}
            error={formik.touched.pan && Boolean(formik.errors.pan)}
            helperText={formik.touched.pan && formik.errors.pan}
          />
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

          <TextField
            required
            label="Post Code"
            name="postCode"
            value={formik.values.postCode}
            onChange={formik.handleChange}
            error={formik.touched.postCode && Boolean(formik.errors.postCode)}
            helperText={formik.touched.postCode && formik.errors.postCode}
          />

          <TextField
            required
            label="State"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          />

          
            <TextField
              required
              label="City"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          

          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={formik.handleSubmit}
            sx={{
              backgroundColor:"#5c6bc0"
           }}
          >
            Update
          </Button>
        </Paper>
     
      </Modal>
    </>
  )
}

export default EditCustomer
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    pan:Yup.string().required("Pan no: is required").matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
    fullName: Yup.string().required("Full name is required").max(140,"Full name not exceed 140 characters"),
    email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required").max(255,"Email can not exceed 255 characters"),
    mobile: Yup.string().required("Mobile is required").matches(/^[0-9]{10}$/,"Invalid mobile number").max(15,"Mobile can not exceed 10 digits"),
    addressLine1: Yup.string().required("Address line is required"),
    addressLine2: Yup.string(),
    postCode: Yup.string().required("Post code is required").matches(/^[0-9]{6}$/,"Invalid post code"),
    state:Yup.string().required("State is required"),
    city:Yup.string().required("City is required")
})
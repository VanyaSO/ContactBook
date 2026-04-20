import * as Yup from "yup";
import {isPhoneNumberValid} from "@utils/validatePhone.ts";

export const validationSchema = Yup.object({
    firstName: Yup.string()
        .min(2, "Too short")
        .max(50, "Too long")
        .required("First name is required"),

    lastName: Yup.string()
        .min(2, "Too short")
        .max(50, "Too long")
        .required("Last name is required"),

    phone: Yup.string()
        .required("Phone is required")
        .test(
            "is-phone-valid",
            "Invalid phone number",
            (value) => isPhoneNumberValid(value || "")
        ),

    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

    address: Yup.string()
        .max(100, "Too long"),

    notes: Yup.string()
        .max(300, "Too long")
});
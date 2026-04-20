import type {Contact, ContactCreatePayload, ContactUpdatePayload} from "@t/contact.ts";
import {Button, Stack, TextField} from "@mui/material";
import {validationSchema} from "@components/ContactEditorForm/validationSchema.ts";
import {useFormik} from "formik";
import {MuiTelInput} from "mui-tel-input";

type ContactFormProps = {
    contact?: Contact;
    onSubmit: (payload: ContactCreatePayload | ContactUpdatePayload) => void;
    isLoading: boolean;
};

export const ContactEditorForm = ({contact, onSubmit, isLoading}: ContactFormProps) => {

    const formik = useFormik({
        initialValues: {
            firstName: contact?.firstName || "",
            lastName: contact?.lastName || "",
            phone: contact?.phone || "",
            email: contact?.email || "",
            address: contact?.address || "",
            notes: contact?.notes || "",
        },
        validationSchema,
        onSubmit: (values, {resetForm}) => {
            onSubmit(values);
            resetForm();
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    name="firstName"
                    label="First Name"
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                />

                <TextField
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                />

                <MuiTelInput
                    name="phone"
                    label="Phone number"
                    fullWidth
                    value={formik.values.phone}
                    onChange={(value) => formik.setFieldValue("phone", value)}
                    onBlur={() => formik.setFieldTouched("phone", true)}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />

                <TextField
                    name="email"
                    label="Email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                    name="address"
                    label="Address"
                    fullWidth
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                />

                <TextField
                    name="notes"
                    label="Notes"
                    fullWidth
                    value={formik.values.notes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.notes && Boolean(formik.errors.notes)}
                    helperText={formik.touched.notes && formik.errors.notes}
                />
            </Stack>

            <Button
                type="submit"
                disabled={isLoading}
                loading={isLoading}
                loadingPosition="start"
                variant="contained"
                sx={{
                    width: "100%",
                    mt: 4,
                    backgroundColor: "grey.800",
                    transition: "0.3s",
                    "&:hover": {
                        backgroundColor: "grey.600",
                    }
                }}
            >
                {contact ? "Edit" : "Create"}
            </Button>
        </form>
    );
};
import {Box, Typography} from "@mui/material"
import {ContactEditorForm} from "@components/ContactEditorForm";
import type {ContactCreatePayload, ContactUpdatePayload} from "@t/contact.ts";
import {useDispatch, useSelector} from "react-redux";
import {createContact, updateContact} from "@store/slices/contacts/contactsSlice.ts";
import {Navigate, useNavigate, useParams} from "react-router";
import type {RootState} from "@/store";
import {selectContactById} from "@store/slices/contacts/selectors.ts";
import {useSnackbar} from 'notistack';
import {routes} from "@routes/routerConfig.ts";

export const ContactEditorPage = () => {
    const {id} = useParams();
    const contact = useSelector((state: RootState) => id ? selectContactById(state, id) : undefined);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    if (id && !contact) return <Navigate to={routes.notFound} replace />;

    const isEdit = !!id;

    const handleOnSubmit = (payload: ContactCreatePayload | ContactUpdatePayload) => {
        if (isEdit) {
            dispatch(updateContact({id, ...payload}));
            enqueueSnackbar('Success updated contact!', {variant: 'success'});
        } else {
            dispatch(createContact(payload));
            enqueueSnackbar('Success created contact!', {variant: 'success'});
        }

        navigate(routes.home);
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                overflowY: "auto",
            }}
        >
            <Typography variant="h4" sx={{mb: 4}}>{isEdit ? "Edit" : "Create"} contact</Typography>
            <Box sx={{width: "100%", maxWidth: 400}}>
                <ContactEditorForm contact={contact} onSubmit={handleOnSubmit} isLoading={false}/>
            </Box>
        </Box>
    )
}
import {Avatar, Box, Button} from "@mui/material";
import {stringAvatar} from "@utils/stringAvatar.ts";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Navigate, useNavigate, useParams} from "react-router";
import {ContactDetailBlock} from "@components/ContactDetailBlock";
import {useDispatch, useSelector} from "react-redux";
import {selectContactById} from "@store/slices/contacts/selectors.ts";
import type {RootState} from "@store/index.ts";
import {deleteContact} from "@store/slices/contacts/contactsSlice.ts";
import {useState} from "react";
import {ConfirmDeleteDialog} from "@components/ConfirmDeleteDialog";
import {useSnackbar} from "notistack";
import {getContactEditPath, routes} from "@routes/routerConfig.ts";

export const ContactDetailsPage = () => {
    const {id} = useParams();
    const contact = useSelector((state: RootState) => id ? selectContactById(state, id) : null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    if (!id || !contact) {
        return <Navigate to={routes.notFound} replace/>
    }

    const handleDeleteContact = () => {
        dispatch(deleteContact({
            id,
        }))

        handleCloseConfirmDelete();
        enqueueSnackbar('Success deleted contact!', {variant: 'success'});
        navigate(routes.home);
    }

    const handleOpenConfirmDelete = () => setOpenConfirmDelete(true);
    const handleCloseConfirmDelete = () => setOpenConfirmDelete(false);

    const fullName = `${contact.firstName} ${contact.lastName}`;
    const {sx: avatarSx, ...avatarProps} = stringAvatar(fullName);

    return (
        <>
            <Box
                sx={{
                    overflowY: "auto",
                    height: "100%"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "start",
                        width: "100%",
                        maxWidth: "260px",
                        mx: "auto"
                    }}
                >
                    <Avatar
                        {...avatarProps}
                        sx={{
                            ...avatarSx,
                            width: "148px",
                            height: "148px",
                            fontSize: "48px",
                            mx: "auto",
                            mb: 3
                        }}
                    />
                    <ContactDetailBlock label="First name" content={contact.firstName}/>
                    <ContactDetailBlock label="Last name" content={contact.lastName}/>
                    <ContactDetailBlock label="Email" content={contact.email}/>
                    <ContactDetailBlock label="Phone" content={contact.phone}/>
                    <ContactDetailBlock label="Address" content={contact.address}/>
                    <ContactDetailBlock label="Notes" content={contact.notes}/>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            mt: 2
                        }}
                    >
                        <Button
                            startIcon={<EditIcon/>}
                            variant="outlined"
                            onClick={() => navigate(getContactEditPath(contact.id))}
                            sx={{
                                color: "grey.900",
                                borderColor: "grey.900",
                                transition: "0.3s",

                                "&:hover": {
                                    color: "grey.600",
                                    borderColor: "grey.600",
                                    backgroundColor: "grey.100",
                                }
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            startIcon={<DeleteIcon/>}
                            variant="outlined"
                            onClick={handleOpenConfirmDelete}
                            sx={{
                                color: "darkred",
                                borderColor: "darkred",
                                transition: "0.3s",

                                "&:hover": {
                                    color: "red",
                                    borderColor: "red",
                                    backgroundColor: "grey.100",
                                }
                            }}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Box>
            <ConfirmDeleteDialog
                open={openConfirmDelete}
                onClose={handleCloseConfirmDelete}
                onConfirm={handleDeleteContact}
            />
        </>
    );
};
import {Box, Link, Typography} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {routes} from "@routes/routerConfig.ts";
import {Link as RouterLink, useParams} from "react-router";
import {ContactSearchBar} from "@components/ContactSearchBar";
import {ContactList} from "@components/ContactList";
import {useSelector} from "react-redux";
import {selectFilteredContacts} from "@store/slices/contacts/selectors.ts";

export const Sidebar = () => {
    const {id} = useParams();

    const contactsData = useSelector(selectFilteredContacts)
    const sortedLetters = Object.keys(contactsData.groups).sort((a, b) => a.localeCompare(b));

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    pb: 0,
                }}
            >
                <Box>
                    <Typography variant="h6">Contacts</Typography>
                    <Typography variant="body2" sx={{color: "grey.700"}}>
                        {contactsData.total} contact
                    </Typography>
                </Box>

                <Link
                    component={RouterLink}
                    to={routes.contactCreate}
                    sx={{
                        display: "flex",
                        p: 1,
                        border: "none",
                        color: "grey.900",
                        transition: "0.3s",

                        "&:hover": {
                            color: "grey.600",
                        },
                    }}
                >
                    <PersonAddIcon/>
                </Link>
            </Box>

            <ContactSearchBar letters={sortedLetters}/>
            <ContactList letters={sortedLetters} groups={contactsData.groups} activeId={id}/>
        </Box>
    );
};
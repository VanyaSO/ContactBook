import type {Contact} from "@t/contact.ts";
import {ContactTile} from "@components/ContactTile"
import {Box, Link as MuiLink, Typography} from "@mui/material";
import {getContactDetailsPath} from "@routes/routerConfig.ts";
import {Link as LinkRouter} from "react-router";

type ContactListProps = {
    letters: string[];
    groups: Record<string, Contact[]>;
    activeId?: string;
}

export const ContactList = ({letters, groups, activeId}: ContactListProps) => {
    return (
        <Box
            sx={{
                flex: 1,
                overflowY: "scroll"
            }}
        >
            {letters.map((letter) => (
                <Box key={letter} id={`${letter}`}>
                    <Typography variant="body1" sx={{pt: 1, pb: 0.5, px: 2}}>{letter}</Typography>
                    {groups[letter].map((contact) => {
                        const isActive = activeId === contact.id;

                        return (
                            <MuiLink
                                key={contact.id}
                                component={LinkRouter}
                                to={getContactDetailsPath(contact.id)}
                                underline="none"
                            >
                                <ContactTile contact={contact} isActive={isActive} />
                            </MuiLink>
                        )
                    })}
                </Box>
            ))}
        </Box>
    )
}
import {Avatar, Box, Typography} from "@mui/material";
import type {Contact} from "@t/contact.ts";
import {stringAvatar} from "@utils/stringAvatar.ts";

type ContactTileProps = {
    contact: Contact;
    isActive: boolean;
};

export const ContactTile = ({contact, isActive}: ContactTileProps) => {
    const fullName = `${contact.firstName} ${contact.lastName}`;

    const {sx: avatarSx, ...avatarProps} = stringAvatar(fullName);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                py: 1,
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                backgroundColor: isActive ? "grey.100" : "transparent",
                "&:hover": {
                    backgroundColor: "grey.200",
                },
            }}
        >
            <Avatar
                {...avatarProps}
                sx={{
                    ...avatarSx,
                    height: "48px",
                    width: "48px"
                }}
            />
            <Box
                sx={{
                    ml: 1
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        mb: 0,
                        fontWeight: 600,
                        color: "grey.900",
                    }}
                >
                    {fullName}
                </Typography>
                {contact.notes && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: "grey.700",
                            width: "20ch",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {contact.notes}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};
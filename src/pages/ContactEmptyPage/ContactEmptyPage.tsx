import {Box, Typography} from "@mui/material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export const ContactEmptyPage = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
            }}
        >
            <PermIdentityIcon
                sx={{
                    fontSize: 82,
                    color: "grey.600"
                }}
            />
            <Typography variant="h6" sx={{ color: "grey.800" }}>Select a contact</Typography>
        </Box>
    );
};
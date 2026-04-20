import {useNavigate} from "react-router";
import {Box, Button, Typography} from "@mui/material";
import {routes} from "@routes/routerConfig.ts";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                textAlign: "center",
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    fontSize: {
                        xs: "4rem",
                        md: "8rem"
                    },
                    fontWeight: "bold",
                    color: "grey.500"
                }}
            >
                404
            </Typography>
            <Typography variant="h4" sx={{mt: 2, fontWeight: 500}}>
                Oops! Page not found
            </Typography>
            <Button
                variant="contained"
                sx={{
                    bgcolor: "grey.500",
                    mt: 4,
                    px: 4,
                    py: 1.5
                }}
                onClick={() => navigate(routes.home)}
            >
                Go Back Home
            </Button>
        </Box>
    );
}
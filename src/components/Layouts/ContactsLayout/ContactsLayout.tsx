import {Box, Container, Grid} from "@mui/material";
import {Sidebar} from "@components/Sidebar";
import {Outlet} from "react-router";

export const ContactsLayout = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                py: 4
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    flex: 1,
                    display: "flex",
                    overflow: "hidden"
                }}
            >
                <Grid
                    container
                    sx={{
                        flex: 1,
                        bgcolor: "grey.200",
                        border: "1px solid",
                        borderColor: "grey.800",
                        borderRadius: 3,
                        overflow: "hidden",
                    }}
                >
                    <Grid
                        size={4}
                        sx={{
                            bgcolor: "grey.300",
                            borderRight: "1px solid",
                            borderColor: "grey.600",
                            height: "100%"
                        }}
                    >
                        <Sidebar/>
                    </Grid>

                    <Grid
                        size={8}
                        sx={{
                            p: 2,
                            height: "100%",
                        }}
                    >
                        <Outlet/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
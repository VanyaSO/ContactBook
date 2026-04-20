import {Box, type BoxProps, Typography} from "@mui/material";

type ContactDetailBlockProps = {
    label: string;
    content: string;
} & BoxProps

export const ContactDetailBlock = ({label, content, ...props}: ContactDetailBlockProps) => {
    return (
        <Box
            {...props}
            sx={{
                marginBottom: 2
            }}
        >
            <Typography
                variant="subtitle1"
                sx={{
                    color: "grey.900",
                    fontWeight: "bold"
                }}
            >
                {label}
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: "grey.700",
                }}
            >
                {content}
            </Typography>
        </Box>
    )
}
import {Box, Button, Divider, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "@/store";
import {setSearch} from "@store/slices/contacts/contactsSlice.ts";

type ContactSearchBarProps = {
    letters: string[];
}

export const ContactSearchBar = ({letters}: ContactSearchBarProps) => {
    const dispatch = useDispatch();
    const search = useSelector((state: RootState) => state.contacts.search);

    const handleClickLetter = (letter: string) => {
        const section = document.getElementById(letter);
        if (section) section.scrollIntoView({behavior: "smooth"});
    }

    return (
        <Box>
            <Box
                sx={{
                    px: 2,
                }}
            >
                <TextField
                    id="contact-search"
                    label="Search contacts"
                    size="small"
                    fullWidth
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    value={search}
                    sx={{
                        my: 2,
                    }}
                />
            </Box>
            <Divider/>
            <Box
                sx={{
                    display: "flex",
                    px: 2,
                    py: 1,
                    color: "text.secondary",
                    fontSize: 14,
                    overflowX: "scroll",
                }}
            >
                {letters.map((letter) => (
                    <Button
                        key={letter}
                        sx={{
                            minWidth: 32,
                            width: 32,
                            height: 32,
                            p: 0,
                            color: "grey.700",
                            "&:hover": {
                                color: "grey.800",
                            },
                        }}
                        onClick={() => handleClickLetter(letter)}
                    >
                        {letter}
                    </Button>
                ))}
            </Box>
            <Divider/>
        </Box>
    );
};
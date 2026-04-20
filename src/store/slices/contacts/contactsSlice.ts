import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {type Contact, type ContactCreatePayload, ContactStatus, type ContactUpdatePayload} from "@t/contact.ts";
import {mockContacts} from "@utils/mockContacts.ts";
import { v4 as uuid } from 'uuid';
import {getFromStorage, saveToStorage} from "@utils/localStorage.ts";

const STORAGE_KEY = "contacts";

type ContactsState = {
    contacts: Contact[];
    search: string;
};

const initialState: ContactsState = {
    contacts: getFromStorage(STORAGE_KEY, mockContacts),
    search: ""
};

export const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        createContact: (state, action: PayloadAction<ContactCreatePayload>) => {
            const newContact = {
                id: uuid(),
                status: ContactStatus.Active,
                ...action.payload
            };

            state.contacts.push(newContact);
            saveToStorage(STORAGE_KEY, state.contacts);
        },
        updateContact: (state, action: PayloadAction<ContactUpdatePayload>) => {
            const contact = state.contacts.find(contact => contact.id === action.payload.id);
            if (contact) {
                Object.assign(contact, action.payload);
            }
            saveToStorage(STORAGE_KEY, state.contacts);
        },
        deleteContact: (state, action: PayloadAction<{id: string}>) => {
            const contact = state.contacts.find(contact => contact.id === action.payload.id);
            if (contact) {
                contact.status = ContactStatus.Deleted;
            }
            saveToStorage(STORAGE_KEY, state.contacts);
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    }
})

export const {createContact, updateContact, deleteContact, setSearch} = contactsSlice.actions;
export default contactsSlice.reducer;
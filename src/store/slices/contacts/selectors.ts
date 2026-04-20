import {createSelector} from '@reduxjs/toolkit';
import type {RootState} from '@/store';
import {type Contact, ContactStatus} from '@t/contact.ts';

export const selectContactById = (state: RootState, id: string) =>
    state.contacts.contacts.find(contact => contact.id === id);

const selectContacts = (state: RootState) => state.contacts.contacts;
const selectSearch = (state: RootState) => state.contacts.search;

export const selectFilteredContacts = createSelector(
    selectContacts,
    selectSearch,
    (contacts, search) => contacts.reduce<{ groups: Record<string, Contact[]>; total: number }>(
        (acc, contact) => {
            if (contact.status !== ContactStatus.Active) return acc;

            const matchesSearch = `${contact.firstName} ${contact.lastName} ${contact.phone} ${contact.email}`
                .toLowerCase()
                .includes(search.toLowerCase());

            if (!matchesSearch) return acc;

            const letter = contact.firstName[0].toUpperCase();
            if (!acc.groups[letter]) acc.groups[letter] = [];
            acc.groups[letter].push(contact);
            acc.total++;

            return acc;
        },
        {groups: {}, total: 0}
    )
);
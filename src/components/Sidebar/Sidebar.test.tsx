import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';
import { Sidebar } from './Sidebar';
import contactsReducer from '@store/slices/contacts/contactsSlice.ts';
import { type Contact, ContactStatus } from '@t/contact.ts';

const mockContacts: Contact[] = [
    { id: '1', firstName: 'Anna', lastName: 'Smith', phone: '+380991234567', email: 'anna@gmail.com', address: 'Kyiv',  notes: '', status: ContactStatus.Active },
    { id: '2', firstName: 'Bob',  lastName: 'Brown', phone: '+380991234568', email: 'bob@gmail.com',  address: 'Odesa', notes: '', status: ContactStatus.Active },
];

const createStore = (contacts: Contact[] = []) => configureStore({
    reducer: { contacts: contactsReducer },
    preloadedState: {
        contacts: {
            contacts,
            search: '',
        },
    },
});

const renderComponent = (contacts: Contact[] = [], activeId?: string) => render(
    <Provider store={createStore(contacts)}>
        <MemoryRouter initialEntries={[activeId ? `/contacts/${activeId}` : '/']}>
            <Routes>
                <Route path="/" element={<Sidebar />} />
                <Route path="/contacts/:id" element={<Sidebar />} />
            </Routes>
        </MemoryRouter>
    </Provider>
);

describe('Sidebar', () => {

    it('renders title', () => {
        renderComponent();

        expect(screen.getByText('Contacts')).toBeInTheDocument();
    });

    it('renders total contacts count', () => {
        renderComponent(mockContacts);

        expect(screen.getByText('2 contact')).toBeInTheDocument();
    });

    it('renders 0 contacts when list is empty', () => {
        renderComponent([]);

        expect(screen.getByText('0 contact')).toBeInTheDocument();
    });

    it('renders add contact link', () => {
        renderComponent();

        expect(screen.getByRole('link')).toHaveAttribute('href', '/contacts/create');
    });

    it('renders search bar', () => {
        renderComponent();

        expect(screen.getByLabelText('Search contacts')).toBeInTheDocument();
    });

    it('renders contact list with contacts', () => {
        renderComponent(mockContacts);

        expect(screen.getByText('Anna Smith')).toBeInTheDocument();
        expect(screen.getByText('Bob Brown')).toBeInTheDocument();
    });

});
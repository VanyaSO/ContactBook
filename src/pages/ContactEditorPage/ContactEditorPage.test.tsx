import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import { ContactEditorPage } from './ContactEditorPage';
import contactsReducer from '@store/slices/contacts/contactsSlice.ts';
import { type Contact, ContactStatus } from '@t/contact.ts';

vi.mock('notistack', () => ({
    useSnackbar: () => ({ enqueueSnackbar: vi.fn() }),
}));

vi.mock('mui-tel-input', () => ({
    MuiTelInput: ({ value, onChange, label }: {
        value: string;
        onChange: (value: string) => void;
        label: string;
    }) => (
        <input
            aria-label={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    ),
}));

const mockContact: Contact = {
    id: '1',
    firstName: 'Ivan',
    lastName: 'Doe',
    phone: '+380991234567',
    email: 'ivan@gmail.com',
    address: 'Odesa',
    notes: 'Some note',
    status: ContactStatus.Active,
};

const createStore = (contacts: Contact[] = []) => configureStore({
    reducer: { contacts: contactsReducer },
    preloadedState: {
        contacts: { contacts, search: '' },
    },
});

const renderComponent = (contacts: Contact[] = [], path = '/contacts/create') => {
    const store = createStore(contacts);
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[path]}>
                <Routes>
                    <Route path="/" element={<div>Home</div>} />
                    <Route path="/not-found" element={<div>Not Found</div>} />
                    <Route path="/contacts/create" element={<ContactEditorPage />} />
                    <Route path="/contacts/edit/:id" element={<ContactEditorPage />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    return { store };
};

describe('ContactEditorPage', () => {

    it('renders Create contact title on create route', () => {
        renderComponent();

        expect(screen.getByText('Create contact')).toBeInTheDocument();
    });

    it('renders Edit contact title on edit route', () => {
        renderComponent([mockContact], '/contacts/edit/1');

        expect(screen.getByText('Edit contact')).toBeInTheDocument();
    });

    it('renders form', () => {
        renderComponent();

        expect(screen.getByLabelText('First Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('prefills form with contact values on edit route', () => {
        renderComponent([mockContact], '/contacts/edit/1');

        expect(screen.getByLabelText('First Name')).toHaveValue('Ivan');
        expect(screen.getByLabelText('Last Name')).toHaveValue('Doe');
        expect(screen.getByLabelText('Email')).toHaveValue('ivan@gmail.com');
    });

    it('redirects to notFound when editing non-existent contact', () => {
        renderComponent([], '/contacts/edit/999');

        expect(screen.getByText('Not Found')).toBeInTheDocument();
    });

});
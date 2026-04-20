import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import { ContactDetailsPage } from './ContactDetailsPage';
import contactsReducer from '@store/slices/contacts/contactsSlice.ts';
import { type Contact, ContactStatus } from '@t/contact.ts';

vi.mock('notistack', () => ({
    useSnackbar: () => ({ enqueueSnackbar: vi.fn() }),
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

const renderComponent = (contacts: Contact[] = [], id = '1') => {
    const store = createStore(contacts);
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[`/contacts/${id}`]}>
                <Routes>
                    <Route path="/" element={<div>Home</div>} />
                    <Route path="/not-found" element={<div>Not Found</div>} />
                    <Route path="/contacts/:id" element={<ContactDetailsPage />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    return { store };
};

describe('ContactDetailsPage', () => {

    const user = userEvent.setup();

    it('renders contact details', () => {
        renderComponent([mockContact]);

        expect(screen.getByText('Ivan')).toBeInTheDocument();
        expect(screen.getByText('Doe')).toBeInTheDocument();
        expect(screen.getByText('ivan@gmail.com')).toBeInTheDocument();
        expect(screen.getByText('+380991234567')).toBeInTheDocument();
        expect(screen.getByText('Odesa')).toBeInTheDocument();
        expect(screen.getByText('Some note')).toBeInTheDocument();
    });

    it('redirects to notFound when contact does not exist', () => {
        renderComponent([]);

        expect(screen.getByText('Not Found')).toBeInTheDocument();
    });

    it('renders Edit and Delete buttons', () => {
        renderComponent([mockContact]);

        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('opens confirm dialog when Delete is clicked', async () => {
        renderComponent([mockContact]);

        await user.click(screen.getByText('Delete'));

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Delete Contact')).toBeInTheDocument();
    });

    it('deletes contact and redirects home when confirmed', async () => {
        const { store } = renderComponent([mockContact]);

        await user.click(screen.getByText('Delete'));

        const dialog = screen.getByRole('dialog');

        await user.click(within(dialog).getByText('Delete'));

        expect(store.getState().contacts.contacts[0].status).toBe(ContactStatus.Deleted);

        expect(screen.getByText('Home')).toBeInTheDocument();
    });

});
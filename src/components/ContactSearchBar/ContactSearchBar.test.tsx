import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ContactSearchBar } from './ContactSearchBar';
import contactsReducer from '@store/slices/contacts/contactsSlice.ts';

const renderComponent = (letters: string[] = []) => {
    const store = configureStore({
        reducer: { contacts: contactsReducer },
    });

    return {
        store,
        ...render(
            <Provider store={store}>
                <ContactSearchBar letters={letters} />
            </Provider>
        ),
    };
};

describe('ContactSearchBar', () => {

    const user = userEvent.setup();

    it('renders search input', () => {
        renderComponent();

        expect(screen.getByLabelText('Search contacts')).toBeInTheDocument();
    });

    it('renders letter buttons', () => {
        renderComponent(['A', 'B', 'C']);

        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('B')).toBeInTheDocument();
        expect(screen.getByText('C')).toBeInTheDocument();
    });

    it('renders no letter buttons when letters is empty', () => {
        renderComponent([]);

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('dispatches setSearch when input changes', async () => {
        const { store } = renderComponent();

        await user.type(screen.getByLabelText('Search contacts'), 'Anna');

        expect(store.getState().contacts.search).toBe('Anna');
    });

    it('calls scrollIntoView when letter button is clicked', () => {
        renderComponent(['A']);

        const mockScrollIntoView = vi.fn();
        const section = document.createElement('div');
        section.id = 'A';
        section.scrollIntoView = mockScrollIntoView;
        document.body.appendChild(section);

        fireEvent.click(screen.getByText('A'));

        expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

        document.body.removeChild(section);
    });

});
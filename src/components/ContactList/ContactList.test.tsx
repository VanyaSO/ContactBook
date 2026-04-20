import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import { ContactList } from './ContactList';
import { ContactStatus } from '@t/contact.ts';

const mockGroups = {
    A: [
        { id: '1', firstName: 'Anna', lastName: 'Smith', phone: '+380991234567', email: 'anna@gmail.com', address: 'Kyiv', notes: '', status: ContactStatus.Active },
        { id: '2', firstName: 'Alex', lastName: 'Doe',   phone: '+380991234568', email: 'alex@gmail.com', address: 'Odesa', notes: '', status: ContactStatus.Active },
    ],
    B: [
        { id: '3', firstName: 'Bob', lastName: 'Brown', phone: '+380991234569', email: 'bob@gmail.com', address: 'Lviv', notes: '', status: ContactStatus.Active },
    ],
};

const mockLetters = ['A', 'B'];

const renderComponent = (activeId?: string) => render(
    <MemoryRouter>
        <ContactList letters={mockLetters} groups={mockGroups} activeId={activeId} />
    </MemoryRouter>
);

describe('ContactList', () => {

    it('renders all letter groups', () => {
        renderComponent();

        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('B')).toBeInTheDocument();
    });

    it('renders all contacts', () => {
        renderComponent();

        expect(screen.getByText('Anna Smith')).toBeInTheDocument();
        expect(screen.getByText('Alex Doe')).toBeInTheDocument();
        expect(screen.getByText('Bob Brown')).toBeInTheDocument();
    });

    it('renders correct links for contacts', () => {
        renderComponent();

        expect(screen.getByRole('link', { name: /anna smith/i })).toHaveAttribute('href', '/contacts/1');
        expect(screen.getByRole('link', { name: /bob brown/i }))  .toHaveAttribute('href', '/contacts/3');
    });

    it('renders empty list when no letters passed', () => {
        render(
            <MemoryRouter>
                <ContactList letters={[]} groups={{}} />
            </MemoryRouter>
        );

        expect(screen.queryByText('A')).not.toBeInTheDocument();
    });

});
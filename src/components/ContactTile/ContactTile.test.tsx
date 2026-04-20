import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContactTile } from './ContactTile';
import { type Contact, ContactStatus } from '@t/contact.ts';

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

describe('ContactTile', () => {

    it('renders full name', () => {
        render(<ContactTile contact={mockContact} isActive={false} />);

        expect(screen.getByText('Ivan Doe')).toBeInTheDocument();
    });

    it('renders notes when provided', () => {
        render(<ContactTile contact={mockContact} isActive={false} />);

        expect(screen.getByText('Some note')).toBeInTheDocument();
    });

    it('does not render notes when empty', () => {
        const contactWithoutNotes = { ...mockContact, notes: '' };
        render(<ContactTile contact={contactWithoutNotes} isActive={false} />);

        expect(screen.queryByText('Some note')).not.toBeInTheDocument();
    });

    it('renders avatar with initials', () => {
        render(<ContactTile contact={mockContact} isActive={false} />);

        expect(screen.getByText('ID')).toBeInTheDocument();
    });

});
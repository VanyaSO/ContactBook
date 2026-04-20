import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ContactEditorForm } from './ContactEditorForm';
import { type Contact, ContactStatus } from '@t/contact.ts';

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
    notes: 'test',
    status: ContactStatus.Active,
};

describe('ContactEditorForm', () => {

    const user = userEvent.setup();

    it('renders all fields', () => {
        render(<ContactEditorForm onSubmit={vi.fn()} isLoading={false} />);

        expect(screen.getByLabelText('First Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Address')).toBeInTheDocument();
        expect(screen.getByLabelText('Notes')).toBeInTheDocument();
    });

    it('renders Create button when no contact passed', () => {
        render(<ContactEditorForm onSubmit={vi.fn()} isLoading={false} />);

        expect(screen.getByText('Create')).toBeInTheDocument();
    });

    it('renders Edit button when contact passed', () => {
        render(<ContactEditorForm contact={mockContact} onSubmit={vi.fn()} isLoading={false} />);

        expect(screen.getByText('Edit')).toBeInTheDocument();
    });

    it('fills fields with contact values', () => {
        render(<ContactEditorForm contact={mockContact} onSubmit={vi.fn()} isLoading={false} />);

        expect(screen.getByLabelText('First Name')).toHaveValue('Ivan');
        expect(screen.getByLabelText('Last Name')).toHaveValue('Doe');
        expect(screen.getByLabelText('Email')).toHaveValue('ivan@gmail.com');
        expect(screen.getByLabelText('Address')).toHaveValue('Odesa');
        expect(screen.getByLabelText('Notes')).toHaveValue('test');
    });

    it('disables submit button when isLoading=true', () => {
        render(<ContactEditorForm onSubmit={vi.fn()} isLoading={true} />);

        expect(screen.getByText('Create').closest('button')).toBeDisabled();
    });

    it('shows Invalid email error when email is wrong', async () => {
        render(<ContactEditorForm onSubmit={vi.fn()} isLoading={false} />);

        await user.type(screen.getByLabelText('Email'), 'notanemail');
        await user.tab();

        expect(await screen.findByText('Invalid email')).toBeInTheDocument();
    });

});
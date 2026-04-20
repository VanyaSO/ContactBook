import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContactDetailBlock } from './ContactDetailBlock';

describe('ContactDetailBlock', () => {

    it('renders label', () => {
        render(<ContactDetailBlock label="Phone" content="123456789" />);

        expect(screen.getByText('Phone')).toBeInTheDocument();
    });

    it('renders content', () => {
        render(<ContactDetailBlock label="Phone" content="123456789" />);

        expect(screen.getByText('123456789')).toBeInTheDocument();
    });

    it('renders label and content together', () => {
        render(<ContactDetailBlock label="Email" content="test@gmail.com" />);

        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('test@gmail.com')).toBeInTheDocument();
    });

    it('renders with empty content', () => {
        render(<ContactDetailBlock label="Phone" content="" />);

        expect(screen.getByText('Phone')).toBeInTheDocument();
    });

});
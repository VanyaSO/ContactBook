import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, it, expect, vi} from 'vitest';
import {ConfirmDeleteDialog} from './ConfirmDeleteDialog';

describe('ConfirmDeleteDialog', () => {

    const user = userEvent.setup();

    it('renders when open=true', () => {
        render(<ConfirmDeleteDialog open onClose={vi.fn()} onConfirm={vi.fn()}/>);

        expect(screen.getByText('Delete Contact')).toBeInTheDocument();
        expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    });

    it('does not render when open=false', () => {
        render(<ConfirmDeleteDialog open={false} onClose={vi.fn()} onConfirm={vi.fn()}/>);

        expect(screen.queryByText('Delete Contact')).not.toBeInTheDocument();
    });

    it('calls onClose when Cancel is clicked', async () => {
        const onClose = vi.fn();
        render(<ConfirmDeleteDialog open onClose={onClose} onConfirm={vi.fn()}/>);

        await user.click(screen.getByText('Cancel'));

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onConfirm when Delete is clicked', async () => {
        const onConfirm = vi.fn();
        render(<ConfirmDeleteDialog open onClose={vi.fn()} onConfirm={onConfirm}/>);

        await user.click(screen.getByText('Delete'));

        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('does not call onConfirm when Cancel is clicked', async () => {
        const onConfirm = vi.fn();
        render(<ConfirmDeleteDialog open onClose={vi.fn()} onConfirm={onConfirm}/>);

        await user.click(screen.getByText('Cancel'));

        expect(onConfirm).not.toHaveBeenCalled();
    });

    it('renders Cancel and Delete buttons', () => {
        render(<ConfirmDeleteDialog open onClose={vi.fn()} onConfirm={vi.fn()}/>);

        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
    });

});
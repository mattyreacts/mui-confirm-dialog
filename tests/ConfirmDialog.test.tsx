import { fireEvent, render, screen } from '@testing-library/react';
import { showConfirmDialog, ConfirmDialog } from '../src';
import React from 'react';

function Page(): React.JSX.Element {
    return (
        <>
            <span>Confirm Dialog</span>
            <ConfirmDialog />
        </>
    );
}

function clickOK(okText: string = 'OK') {
    setTimeout(() => {
        const button = screen.getByText(okText);
        fireEvent.click(button);
    }, 100);
}

function clickCancel(cancelText: string = 'Cancel') {
    setTimeout(() => {
        const button = screen.getByText(cancelText);
        fireEvent.click(button);
    }, 100);
}

test('OK Click resolves dialog', async () => {
    render(<Page />);
    clickOK();
    try {
        await showConfirmDialog({text: 'Test confirm dialog'});
    } catch(err) {
        fail('Promise should resolve on OK click');
    }
});

test('Cancel Click rejects dialog', async () => {
    render(<Page />);
    clickCancel();
    try {
        await showConfirmDialog({text: 'Test confirm dialog'});
        fail('Promise should reject on cancel click');
    } catch(err) {
    }
});
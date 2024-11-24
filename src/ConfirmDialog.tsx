import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import EventEmitter from 'events';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface PromiseResults {
    reject: (err: Error | string) => void,
    resolve: () => void
}

interface ConfirmDialogProps {
    /**
     * The text to display in the confirm prompt
     */
    text: string,
    /**
     * The title of the dialog
     * @default "Confirm"
     */
    title?: string,
    /**
     * The text on the OK button
     * @default "OK"
     */
    OKText?: string,
    /**
     * The text on the cancel button
     * @default "Cancel"
     */
    CancelText?: string
}

const showDialogEvent: EventEmitter = new EventEmitter();
let promise: PromiseResults = null!;
/**
 * Open and show the confirm dialog with the provided properties
 * @param props 
 * @returns Promise that will resolve on the OK button being clicked, reject on cancel being clicked
 */
export function showConfirmDialog(props: ConfirmDialogProps): Promise<void> {
    showDialogEvent.emit<ConfirmDialogProps>('show', props);
    return new Promise<void>((resolve, reject) => {
        promise = { resolve, reject };
    });
}

/**
 * ConfirmDialog component
 * @returns Confirm dialog JSX element
 */
function _ConfirmDialog(): React.JSX.Element {
    const [props, setProps] = useState<ConfirmDialogProps>(null!);

    useEffect((): () => void => {
        showDialogEvent.addListener('show', setProps);
        return () => showDialogEvent.removeListener('show', setProps);
    }, []);

    const handleDialogClose = useCallback(() => {
        setProps(null!);
        promise?.reject(new Error('Cancelled'));
    }, []);

    const handleDialogOK = useCallback(() => {
        setProps(null!);
        promise?.resolve();
    }, []);

    return (
        <>
            {Boolean(props) &&
                <Dialog onClose={handleDialogClose} open>
                    <DialogTitle>{props.title || 'Confirm'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {props.text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="secondary">
                            {props.CancelText || 'Cancel'}
                        </Button>
                        <Button onClick={handleDialogOK} color="primary">
                            {props.OKText || 'OK'}
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    )
}

export const ConfirmDialog = React.memo(_ConfirmDialog);
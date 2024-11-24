# ConfirmDialog
An easy to use confirm dialog using [@mui/material/Dialog](https://mui.com/material-ui/react-dialog/). Use async/await to control program flow
with the confirm dialog as the dialog resolves on "OK" click and rejects on "Cancel" click or dialog dismiss.

## Installation
`npm install @mattyreacts/mui-confirm-dialog`

## Setup
Include the ConfirmDialog component anywhere in your application, but usually at the root of the tree.

```tsx
import * as React from 'react';
import { ConfirmDialog } from '@mattyreacts/mui-confirm-dialog';

function App(): React.JSX.Element {
    return (
        <>
            <ConfirmDialog />
            {...otherComponents}
        </>
    )
}
```

## Usage
Call the `showConfirmDialog(props: ConfirmDialogProps): Promise<void>` function to show the dialog from anywhere in your React application.

### ConfirmDialogProps Interface
| Property   | Type   | Description                                             | Required | Default   |
|------------|--------|---------------------------------------------------------|----------|-----------|
| text       | string | The text to display in the body of the confirm dialog   | Yes      | -         |
| title      | string | The title of the dialog box                             | No       | "Confirm" |
| OKText     | string | The text to show on the OK button of the dialog box     | No       | "OK"      |
| CancelText | string | The text to show on the Cancel button of the dialog box | No       | "Cancel"  |

## Example
```tsx
import * as React from 'react';
import { useCallback } from 'react';
import { showConfirmDialog, ConfirmDialog } from '@mattyreacts/mui-confirm-dialog';
import { Button } from '@mui/material'

function Component(): React.JSX.Element {
    const handleDelete = useCallback(async (): Promise<void> => {
        try {
            await showConfirmDialog({
                text: 'Are you sure you want to delete this item?',
                title: 'Confirm Delete',
                OKText: 'Yes',
                CancelText: 'No'
            });
        } catch(err) {
            //dialog cancelled
            return;
        }
        await fetch('/api/delete');
    }, []);

    return (
        <>
            <ConfirmDialog />
            <Button onClick={handleDelete}>
                Delete Item
            </Button>
        </>
    )
}
```
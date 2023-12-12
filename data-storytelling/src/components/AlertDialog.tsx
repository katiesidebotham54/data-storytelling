import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/**
 * AlertDialog Component
 * 
 * A reusable component that displays an alert dialog with customizable title,
 * content, and agree button text. It is typically used for showing informative
 * messages or errors to users.
 *
 * @component
 * @param {boolean} open - Determines whether the dialog is open or closed.
 * @param {string} buttonText - The text to display on the agree button. Defaults to 'OK'.
 * @param {string} dialogTitle - The title of the alert dialog.
 * @param {string} dialogContent - The content or message to be displayed in the alert dialog.
 * @param {Function} onAgree - The callback function to be executed when the user agrees (clicks the button).
 * @returns {JSX.Element} - Returns the JSX element representing the AlertDialog.
 * 
 * @example
 * // Usage in another component:
 * const [showAlertDialog, setShowAlertDialog] = useState(true);
 * 
 * return (
 *   <AlertDialog
 *     open={showAlertDialog}
 *     buttonText="OK"
 *     dialogTitle="Alert Title"
 *     dialogContent="This is an example alert message."
 *     onAgree={() => setShowAlertDialog(false)}
 *   />
 * );
 */
export default function AlertDialog({ open, buttonText, dialogTitle, dialogContent, onAgree }) {

  return (
    <React.Fragment>
      <Dialog open={open}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
        </DialogContent>
        <Button variant="outlined" onClick={onAgree}>
          {buttonText || 'OK'}
        </Button>
      </Dialog>
    </React.Fragment>
  );
}

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { requestChecklistCountries, } from "../../actions";

export function ChecklistsDialog({ onClose, open, checklistName }) {
  let [checklists, setCheckLists] = useState({});

  useEffect(() => {
    async function fetchChecklists() {
      let cl = await requestChecklistCountries()
      console.log(cl)
      setCheckLists(cl[checklistName])
    }
    fetchChecklists();
  }, [checklistName]); // hit the API everytime checklistName changes

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Checklist name: {checklists?.source_name} </DialogTitle>
      <DialogContent dividers>
        <Typography variant='h5' gutterBottom>
          {checklists?.checklist_details}
        </Typography>
        <Typography gutterBottom>
          Coutries: {checklists?.countries?.split(',').join(', ')}
        </Typography>
        <Typography gutterBottom>
          Date accessed: {checklists?.date_accessed}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ChecklistsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

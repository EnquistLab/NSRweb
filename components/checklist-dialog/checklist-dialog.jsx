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

import {
  BibTexDialog
} from "../";

export function ChecklistsDialog({ onClose, open, checklistName, citations }) {
  let [checklists, setCheckLists] = useState({});
  let [citation, setCitation] = useState(null)

  useEffect(() => {
    async function fetchChecklists() {
      let cl = await requestChecklistCountries()
      setCheckLists(cl[checklistName])
    }
    fetchChecklists();

    const citation = citations.find(e => e.source === checklistName);
    setCitation(citation)

    console.log(citations)

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
        {citation &&
          <div >
            <Typography variant='h6'>
              Citation
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: citation.formatted,
              }}
            ></div>
            <BibTexDialog displayText={citation.raw} />
            <br />
          </div>
        }
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

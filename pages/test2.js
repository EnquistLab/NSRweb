import { useState, useEffect } from 'react';

import { resolveRecords } from "../actions/";

import PropTypes from 'prop-types';

import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';


import { requestChecklistCountries, } from "../actions/";

import {
  Layout,
  SearchBox,
  ResolveTable
} from "../components/";

function ChecklistsDialog({ onClose, open, checklistName }) {
  let [checklists, setCheckLists] = useState({});

  useEffect(() => {
    async function fetchChecklists() {
      let cl = await requestChecklistCountries()
      setCheckLists(cl[checklistName])
    }
    fetchChecklists();
  }, []);



  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Checklist name: {checklists?.source_name} </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          {checklists?.checklist_details}
        </Typography>
        <Typography gutterBottom>
          Coutries: {checklists?.countries?.split(',').join(', ')}
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


export default function Index() {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Layout>
      <Typography variant="subtitle1" component="div">
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <ChecklistsDialog
        open={open}
        onClose={handleClose}
        checklistName={'usda'}
      />
    </Layout>
  );
}

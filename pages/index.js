import { useState } from 'react';

import { Box, Paper, Typography } from '@mui/material';
import { resolveRecords } from "../actions/";

import {
  Layout,
  SearchBox,
  ResolveTable
} from "../components/";

export default function Index() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [resolvedRecords, setResolvedRecords] = useState([])
  const [errorMessage, setErrorMessage] = useState(null);

  const showErrorMessage = (errorMessage) => {
    setErrorMessage(errorMessage);
    setIsProcessing(false);
  }

  // Format: taxon, country, state_province, country_parish
  // example input: Ceiba pentandra,Brazil,,
  // data format: [[taxon,country,state_province,country_parish,id_sequential]]
  const handleResolveRecords = async (records) => {
    setResolvedRecords([])

    let resolved = await resolveRecords(
      records,
      showErrorMessage,
      setIsProcessing
    )

    if (resolved) {
      setResolvedRecords(resolved)
    }
  }

  return (
    <Layout>
      <SearchBox onSubmit={handleResolveRecords} isProcessing={isProcessing} />
      {errorMessage && (
        <Box pt={2}>
          <Paper color="primary" variant="outlined">
            <Box m={2}>
              <Typography>{errorMessage}</Typography>
            </Box>
          </Paper>
        </Box>
      )}
      <ResolveTable tableData={resolvedRecords} />
    </Layout>
  );
}

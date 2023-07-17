import { useState } from 'react';

//import { Container, } from '@mui/material';
import { readString } from "react-papaparse";
import { requestResolveRecords } from "../actions/";


import {
  Layout,
  SearchBox
} from "../components/";

const formatResponse = (data) => {
  // save header for later
  let header = data['id']

  // remove header from main structure
  delete data.id

  // create objects with the header and data
  // [{header:data, ...}]
  let result = Object.keys(data).map((recordIndex) => {
    var tmp = new Object();
    header.map((headerIndex, headerK) => {
      tmp[headerIndex] = data[recordIndex][headerK]
    })
    return tmp
  })

  return result
}

const resolveRecords = async (records, setIsProcessing, setResolvedRecords, setIsBadInput) => {

  // clear the records
  setResolvedRecords([])

  // show spinner and clean errors
  setIsProcessing(true)
  setIsBadInput(false)

  // split names with react-papaparse
  var splitRecords = readString(records)["data"];

  if (splitRecords.every((row) => row.length == 4) == false) {
    //displayError("All rows must have 3 columns");
    console.log("All rows must have 3 columns")
    return;
  }

  // add an extra column to the end of the structure
  splitRecords = splitRecords
    .filter((row) => row.length == 4)
    .map((row, i) => row.concat([i + 1]));



  var resolvedRecords = await requestResolveRecords(splitRecords);
  // the API returns the following format:
  // one object named 'id' with the header
  // one object per record submited containing an

  // format response to a javascript object
  resolvedRecords = formatResponse(resolvedRecords)

  console.log(resolvedRecords)
}

export default function Index() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBadInput, setIsBadInput] = useState(false);
  const [resolvedRecords, setResolvedRecords] = useState([])

  // Format: taxon, country, state_province, country_parish
  // example input: Ceiba pentandra,Brazil,,
  // data format: [[taxon,country,state_province,country_parish,id_sequential]]
  const handleResolveRecords = async (records) => {
    resolveRecords(
      records,
      setIsProcessing,
      setResolvedRecords,
      setIsBadInput
    )
  }

  return (
    <Layout>
      {resolvedRecords}
      <SearchBox onSubmit={handleResolveRecords} isProcessing={isProcessing} />
      {isBadInput && (
        <Box pt={2}>
          <Paper color="primary" variant="outlined">
            <Box m={2}>
              <Typography>{errorMessage}</Typography>
            </Box>
          </Paper>
        </Box>
      )}
    </Layout>
  );
}

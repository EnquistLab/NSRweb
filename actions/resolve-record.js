import { readString } from "react-papaparse";
import { requestResolveRecords, formatResponse } from "./";

export const resolveRecords = async (records, showErrorMessage, setIsProcessing) => {
  // show spinner and clean errors
  showErrorMessage(null)
  setIsProcessing(true)

  // split names with react-papaparse
  var splitRecords = readString(records)["data"];

  // make sure there's data before submitting to the API
  if (splitRecords.length === 0) {
    showErrorMessage("The input is empty")
    return;
  }

  // make sure every row has 4 columns
  if (splitRecords.every((row) => row.length == 4) == false) {
    showErrorMessage("All rows must have 4 columns")
    return;
  }

  // add an extra column to the end of the structure
  // this seems to be required by the API
  splitRecords = splitRecords
    .filter((row) => row.length == 4)
    .map((row, i) => row.concat([i + 1]));

  var resolvedRecords = await requestResolveRecords(splitRecords);

  // server side error handling
  // if the response of the API is a string instead of an object
  // the API returned an error
  if (typeof resolvedRecords === "string") {
    // here resolved names should contain the error returned by the API
    showErrorMessage(resolvedRecords)
    return;
  }

  // format response to a javascript object
  // once the API changes we comment this line out
  resolvedRecords = formatResponse(resolvedRecords)
  setIsProcessing(false)

  return resolvedRecords
}

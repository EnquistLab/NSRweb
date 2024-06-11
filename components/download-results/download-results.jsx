import { useState } from "react";
import { Parser } from "json2csv";
import { saveAs } from "file-saver";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
} from "@mui/material";


export function DownloadResults({ data }) {
  // controls the popup visibility
  const [open, setOpen] = useState(false);
  // the filename when downloading
  const [fileName, setFileName] = useState("nsr_result");
  // default format when downloading
  const [fileFormat, setFileFormat] = useState("csv");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Download Data
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Download Options</DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <TextField
              label="File Name"
              defaultValue={fileName}
              onChange={(e) => setFileName(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mt={4}>
            <FormControl>
              <FormLabel>Download Format</FormLabel>
              <RadioGroup
                value={fileFormat}
                onChange={(e) => setFileFormat(e.target.value)}
              >
                <FormControlLabel value="csv" control={<Radio />} label="CSV" />
                <FormControlLabel value="tsv" control={<Radio />} label="TSV" />
              </RadioGroup>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => generateDownloadFile(data, fileName, fileFormat)}
            color="primary"
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const generateDownloadFile = (data, fileName, fileFormat) => {
  // Rename "user_id" to "ID" and reorder it to be the first column
  const modifiedData = data.map(row => {
    const { user_id, ...rest } = row;
    return { ID: user_id, ...rest };
  });

  // Define the fields for the CSV/TSV output, ensuring "ID" is the first field
  const fields = ['ID', ...Object.keys(data[0]).filter(field => field !== "user_id" && field !== "isCultivatedNSR")];

  let opts;
  if (fileFormat === "tsv") {
    opts = { fields, delimiter: "\t" };
  } else {
    opts = { fields };
  }

  const parser = new Parser(opts);

  // Convert modified data to CSV or TSV
  try {
    const fileData = parser.parse(modifiedData);
    const fileBlob = new Blob([fileData], { type: "text/plain;charset=utf-8" });
    saveAs(fileBlob, fileName + "." + fileFormat);
  } catch (error) {
    console.error("Error generating the file:", error);
  }
};

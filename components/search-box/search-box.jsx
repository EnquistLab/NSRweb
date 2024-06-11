import React, { useState, useCallback, useRef } from 'react';
import {
  Paper,
  TextField,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';

export function SearchBox({ onSubmit, isProcessing }) {
  const [names, setNames] = useState("");
  const fileInputRef = useRef();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsText = reader.result;
        setNames(fileAsText);
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true
  });

  const handleAddFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const apiServer = process.env.apiServer;

  const predefinedRecords = `Pinus ponderosa,United States,Arizona,
Pinus ponderosa,Germany,,
Pinus ponderosa,Peru,,
Eucalyptus albida,Peru,,
Eucalyptus albida,Australia,,
Solanum tuberosum,Peru,,`;


  return (
      <Paper>
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height={1}
            {...getRootProps()}
        >
          <Box p={2}>
            <input {...getInputProps()} ref={fileInputRef} style={{ display: 'none' }} />
            <TextField
                rows={10}
                multiline
                fullWidth
                variant="outlined"
                label="Records to check."
                value={names}
                helperText="Enter up to 5000 records or drag and drop and drop CSV/TXT file"
                onChange={(e) => setNames(e.target.value)}
            />
          </Box>
          <Box
              p={2}
              pt={0}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
          >
            <Box>
              <Button
                  onClick={() => onSubmit(names)}
                  variant="contained"
                  color="primary"
              >
                Submit
              </Button>
              <Button
                  onClick={() => setNames("")}
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: 10 }}
              >
                Clear
              </Button>
              <Button
                  variant="contained"
                  onClick={handleAddFileClick}
                  style={{ marginLeft: 10 }}
              >
                Add File
              </Button>
            </Box>
            <Box>
              <Button
                  onClick={() => setNames(predefinedRecords)}
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: 700 }}
              >
                Try me!
              </Button>
            </Box>
            <Box>
              {isProcessing && <CircularProgress size={30} />}
            </Box>
          </Box>
        </Box>
      </Paper>
  );
}
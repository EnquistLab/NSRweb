import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Link,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from '@mui/material';

import { requestCitations, requestMeta } from "../actions/";
import Cite from "citation-js";

import {
  Layout,
} from "../components/";

function BibTexDialog({ displayText }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link href="#" onClick={handleClickOpen}>
        [bibtex]
      </Link>
      <Dialog maxWidth={"md"} fullWidth open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{"BibTeX entry"}</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={10}
            disabled
            fullWidth
            defaultValue={displayText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}
BibTexDialog.propTypes = {
  displayText: PropTypes.string
};

export default function Index() {
  let [citationsState, setCitationsState] = useState([]);
  let [metaState, setMetaState] = useState("");
  useEffect(() => {
    async function fetchCitations() {
      let citationsResponse = await requestCitations();
      let metaResponse = await requestMeta();

      let parsedCitations = citationsResponse.flatMap(({ citations: c }) => {
        try {
          let cleanedCitation = c.source_citation.replace(/\\n/g, '')
          let parsed = new Cite(cleanedCitation)

          let formatted = parsed.format('bibliography', {
            format: 'html',
            template: 'apa',
            lang: 'en-US'
          })

          let raw = parsed.format('bibtex', { format: 'text' })

          return { 'source': c.name, 'parsed': parsed, 'raw': raw, 'formatted': formatted }
        } catch (error) {
          console.log(error)
          // returning empty vector will make flatMap drop it
          return [];
        }
      })
      setCitationsState(parsedCitations);

      try {
        setMetaState(metaResponse[0].meta.code_version)
      } catch (error) {
        console.log("Error getting metadata from API")
      }
    }
    fetchCitations();
  }, []);

  return (
    <Layout>
      <Typography variant="h3" gutterBottom>
        How to Cite the NSR
      </Typography>
      {/* {citationsList.map((v) => renderedCitations[v])} */}

      {citationsState.map((s, k) => (
        <div key={k}>
          <div
            dangerouslySetInnerHTML={{
              __html: s.formatted,
            }}
          ></div>
          <BibTexDialog displayText={s.raw} />
          <br />
        </div>
      ))
      }

      <Typography variant="h6">
        API Version
      </Typography>
      <Typography variant="body1" gutterBottom>
        {metaState}
      </Typography>
    </Layout>
  );
}

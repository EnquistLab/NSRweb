import { useState, useEffect } from 'react';

import {
  Box,
  Typography,
  Link,
  Divider,

} from '@mui/material';

import { requestSources } from "../actions/";
import { Layout } from "../components/";

export default function Sources() {
  let [sourcesState, setSourcesState] = useState([]);
  useEffect(() => {
    async function fetchSources() {
      let sources = await requestSources();
      setSourcesState(sources);
    }
    fetchSources();
  }, []);

  return (
    <Layout>
      <Typography variant="h3">Sources</Typography>
      <Box sx={{ mt: 2 }}>
        {sourcesState.map(({ sources }, k) => (
          <Box key={k}>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">
                Source name
              </Typography>
              {sources.source_name_full}
            </Box>
            <Box>
              <Typography variant="h6">
                Date accessed
              </Typography>
              {sources.date_accessed}
            </Box>
            <Box>
              <Typography variant="h6">
                Comprehensive
              </Typography>
              {sources.is_comprehensive === "1" ? "Yes" : "No"}
            </Box>
            {sources.source_url &&
              <Box>
                <Typography variant="h6">
                  URL
                </Typography>
                <Link href={sources.source_url}>
                  {sources.source_url}
                </Link>
              </Box>
            }
            <Box sx={{ mb: 2 }} />
          </Box>
        ))}
      </Box>
    </Layout >
  );
}

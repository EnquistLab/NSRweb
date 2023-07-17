import { useState } from 'react';

import { Container, } from '@mui/material';

import {
  Layout,
  SearchBox
} from "../components/";

const resolveRecords = async (records, setIsProcessing) => {
  console.log(records)

}

export default function Index() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [resolvedRecords, setResolvedRecords] = useState([])

  // Format: taxon, country, state_province, country_parish
  const handleResolveRecords = async (records) => {
    resolveRecords(records, setIsProcessing)
  }

  return (
    <Layout>
      <SearchBox onSubmit={handleResolveRecords} isProcessing={isProcessing} />
    </Layout>
  );
}

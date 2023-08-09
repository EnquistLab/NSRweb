import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import {
  TopBar,
  ChecklistsDialog
} from "../components/";


import {
  requestCountryChecklists,
  requestCitations
} from "../actions/";

export default function Home() {
  let [checklists, setCheckLists] = useState([]);
  let [citations, setCitations] = useState([])

  useEffect(() => {
    async function fetchMapInfo() {
      let checklists = await requestCountryChecklists()
      // TODO: move this inside requestCountry
      var returnObj = new Object();
      checklists.forEach(({ country_checklists: c }) => {
        returnObj[c.gid_0] = c
        delete c.gid_0
      })
      setCheckLists(returnObj)

      // getting citations
      let parsedCitations = await requestCitations();
      setCitations(parsedCitations)

      // request groupedChecklists

    }
    fetchMapInfo()
  }, []);

  const MapWithNoSSR = dynamic(() => import("../components/map/map"), {
    ssr: false
  });


  return (
    <>
      <TopBar />
      <MapWithNoSSR checklists={checklists} citations={citations} />
    </>
  );
}

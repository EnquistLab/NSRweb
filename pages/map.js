import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import {
  TopBar,
  ChecklistsDialog
} from "../components/";


import {
  requestCountryChecklists,
} from "../actions/";

export default function Home() {
  let [checklists, setCheckLists] = useState([]);

  useEffect(() => {
    async function fetchChecklists() {
      let checklists = await requestCountryChecklists()
      // TODO: move this inside requestCountry
      var returnObj = new Object();
      checklists.forEach(({ country_checklists: c }) => {
        returnObj[c.gid_0] = c
        delete c.gid_0
      })
      setCheckLists(returnObj)
    }
    fetchChecklists()
  }, []);

  const MapWithNoSSR = dynamic(() => import("../components/map/map"), {
    ssr: false
  });


  return (
    <>
      <TopBar />
      <MapWithNoSSR checklists={checklists} />
    </>
  );
}

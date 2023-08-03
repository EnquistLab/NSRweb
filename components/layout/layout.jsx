import { Box } from "@mui/material";
import Head from "next/head";

import { TopBar, Footer, ContainerLG } from "../";

export function Layout(props) {
  return (
    <>
      <Head>
        <title>GNRS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box>
          <TopBar />
        </Box>
        <Box flexGrow={1} my={2}>
          <ContainerLG>{props.children}</ContainerLG>
        </Box>
        {/* <Box> */}
        {/*   <Footer /> */}
        {/* </Box> */}
      </Box>
    </>
  );
}

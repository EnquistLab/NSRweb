import { Box } from "@mui/material";
import Head from "next/head";

import { TopBar, Footer, ContainerLG } from "../";

export function Layout(props) {
  return (
    <>
        <Head>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-EH3SF47RJ5"></script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EH3SF47RJ5');
            `
                }}
            />
            <title>NSR - Native Species Resolver</title>
            <meta name="description" content="An online tool for the detection of introduced species occurrences."/>
            <meta name="keywords"
                  content="Native Species Resolver, NSR, Introduced Species Detection, Species Occurrences, Online Species Detection Tool, Biodiversity Tool, Invasive Species Monitoring, Native Species Identification, Species Database, Ecological Tool, Species Mapping, Environmental Monitoring, Species Distribution, Wildlife Management, Biological Data, Habitat Analysis, Conservation Tool, Ecological Research, Endangered Species Tracking, Species Identification System, Ecological Impact Assessment, Species Habitat Monitoring, Ecosystem Health, Environmental Protection, Species Conservation, Native Wildlife Detection, Biodiversity Conservation, Ecological Preservation, Alien Species Detection, Species Observation, Environmental Science, Natural Resource Management"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="theme-color" content="#ffffff"/>
            <meta property="og:title" content="NSR - Native Species Resolver"/>
            <meta property="og:description"
                  content="An online tool for the detection of introduced species occurrences."/>
            <meta property="og:image" content="/favicon-32x32.png"/>
            <meta property="og:url" content="https://nsr.biendata.org"/>
            <meta name="twitter:title" content="NSR - Native Species Resolver"/>
            <meta name="twitter:description"
                  content="An online tool for the detection of introduced species occurrences."/>
            <meta name="twitter:url" content="https://nsr.biendata.org"/>
            <meta name="twitter:image" content="/favicon-32x32.png"/>
            <meta name="twitter:card" content="An online tool for the detection of introduced species occurrences."/>
            <link rel="canonical" href="https://nsr.biendata.org"/>
        </Head>
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Box>
                <TopBar/>
            </Box>
            <Box flexGrow={1} my={2}>
                <ContainerLG>{props.children}</ContainerLG>
            </Box>
            <Box>
                <Footer/>
            </Box>
        </Box>
    </>
  );
}

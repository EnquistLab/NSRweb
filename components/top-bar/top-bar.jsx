import { useState, useEffect, React } from "react";
import { requestMeta } from "../../actions";

import LowResBar from "./low-res-bar";

import GrassIcon from '@mui/icons-material/Grass';

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
} from "@mui/material";

import { ContainerLG } from "../";

export function TopBar() {
  const menuLinks = [
    { href: '/', name: 'Home' },
    { href: '/map', name: 'Map' },
    { href: '/about', name: 'About' },
    { href: '/instructions', name: 'Instructions' },
    { href: '/nsrapi', name: 'API' },
    { href: '/sources', name: 'Sources' },
    { href: '/cite', name: 'Cite' },
    { href: '/data_dictionary', name: 'Data Dictionary' },
  ]

  // API version
  const [apiVersion, setApiVersion] = useState("");
  useEffect(() => {
    let metaPromise = requestMeta();
    metaPromise.then((meta) => {
      let codeVersion = meta[0].meta.code_version
      setApiVersion(codeVersion);
    });
  }, []);

  return (
      <AppBar position="static">
        <ContainerLG>
          <Toolbar>
            <Box mr={2}>
              <Link href="/" color="inherit" underline="none">
                <img height="40" src="/favicon.ico" alt="Logo" />
              </Link>
            </Box>

            <Link href="/" color="inherit" variant="h6" sx={{ pr: 2 }} underline="none">
              NSR
            </Link>

            <Box sx={{ flexGrow: 1 }}></Box>

            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
              <Typography variant="caption" >
                Native Species Resolver {apiVersion}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}></Box>

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              {menuLinks.map((item, k) =>
                  <Button key={k} color="inherit" href={item.href}>{item.name}</Button>
              )}
            </Box>

            <Box sx={{ display: { sm: 'block', md: 'none' } }}>
              <LowResBar menuLinks={menuLinks} />
            </Box>
          </Toolbar>
        </ContainerLG>
      </AppBar >
  );
}

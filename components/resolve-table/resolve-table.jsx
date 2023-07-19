import React, { useState } from "react";

import {
  Box,
  TableContainer,
  TableRow,
  TablePagination,
  TableCell,
  TableBody,
  Link,
  Table,
  Paper,
} from "@mui/material";

import DetailsDialog from "./resolve-details-dialog";
import EnhancedTableHead from "./resolve-table-head";
import TablePaginationActions from "./table-pagination-actions";

import { DownloadResults, } from "../";
import { getComparator, stableSort } from "../../actions";

export function ResolveTable({ tableData }) {
  // states
  const [dataPopUpOpen, setDataPopUpOpen] = useState(false);
  const [popUpDetails, setPopUpDetails] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // for enhanced table head
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  //
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickClose = () => {
    setDataPopUpOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const renderRow = (row, id) => {
    return (
      <TableRow key={id}>
        <TableCell>
          {[
            row.country,
            row.state_province,
            row.county_parish,
          ]
            .filter((row) => row)
            .join(":")}
        </TableCell>
        <TableCell>{row.genus}</TableCell>
        <TableCell>{row.native_status}</TableCell>
        <TableCell>{row.native_status_reason}</TableCell>
        <TableCell>{row.native_status_sources}</TableCell>
        <TableCell>
          {
            <Link
              href="#"
              onClick={() => {
                setDataPopUpOpen(true);
                setPopUpDetails(row);
              }}
            >
              Details
            </Link>
          }
        </TableCell>
      </TableRow>
    );
  };

  // only show the table when data is available
  if (tableData.length > 0)
    return <>
      <Paper>
        <Box pt={2} m={2} mb={0}>
          <DownloadResults data={tableData} />
        </Box>
        <Box m={2}>
          <TableContainer>
            <Table size="small">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(tableData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(renderRow)}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableContainer>
        </Box>
        <DetailsDialog
          open={dataPopUpOpen}
          onClose={handleClickClose}
          row={popUpDetails}
        />
      </Paper>
    </>;
  else return <></>;
}


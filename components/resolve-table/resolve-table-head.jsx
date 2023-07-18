import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@mui/material";

export default function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  // to save space we define a vector with the names of the columns
  let tableColumns = [
    ["country", "Political Division Submitted"],
    ["genus", "Genus"],
    ["native_status", "Native Status"],
    ["native_status_reason", "Native Status Reason"],
    ["native_status_sources", "Native Status Sources"],
  ];

  // we render the names using a map
  let tableColumnsJsx = tableColumns.map((names, idx) => {
    return (
      <TableCell key={idx}>
        <TableSortLabel
          active={orderBy === names[0]}
          direction={orderBy === names[0] ? order : "asc"}
          onClick={createSortHandler(names[0])}
        >
          {names[1]}
        </TableSortLabel>
      </TableCell>
    );
  });

  return (
    <TableHead>
      <TableRow>
        {
          // here we add the previously rendered table cells
          tableColumnsJsx
        }
        <TableCell>Details</TableCell>
      </TableRow>
    </TableHead>
  );
}

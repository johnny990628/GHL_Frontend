import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";

import useStyles from "./Style";

const CustomToolbar = ({ handleDelete }) => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport csvOptions={{ fileName: "診所檔案", utf8WithBom: true }} printOptions={{ hideToolbar: true, hideFooter: true }} />
      <Button startIcon={<Delete />} variant="text" color="primary" onClick={handleDelete}>
        Delete
      </Button>
    </GridToolbarContainer>
  );
};

const CustomTable = ({ rows, columns }) => {
  const [pageSize, setPageSize] = useState(5);
  const [selectionModel, setSelectionModel] = useState([]);
  const [data, setData] = useState(rows);
  const classes = useStyles();

  const handleDelete = () => {
    setData((rows) => rows.filter((r) => !selectionModel.includes(r.id)));
  };
  return (
    <Box className={classes.container}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        onSelectionModelChange={setSelectionModel}
        selectionModel={selectionModel}
        checkboxSelection
        components={{ Toolbar: CustomToolbar }}
        componentsProps={{ toolbar: { handleDelete } }}
        className={classes.table}
      />
    </Box>
  );
};

export default CustomTable;

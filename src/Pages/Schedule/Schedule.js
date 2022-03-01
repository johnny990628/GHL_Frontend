import React from "react";
import { Box, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import useStyles from "./Style";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { randomTraderName } from "@mui/x-data-grid-generator";

const columns = [
  { field: "id", headerName: "身分證字號", width: 200, editable: true },
  { field: "name", headerName: "病患姓名", width: 200, editable: true },
  {
    field: "age",
    headerName: "年齡",
    width: 150,
    editable: true,
  },
  { field: "doctor", headerName: "醫師", type: "singleSelect", valueOptions: ["楊醫師", "李醫師", "張醫師"], width: 200, editable: true },
  { field: "time", headerName: "時間", type: "dateTime", width: 200, editable: true },
];

const rows = [
  { id: "A000000001", doctor: "楊醫師", name: randomTraderName(), age: 42, time: "1700-1800" },
  { id: "A000000000", doctor: "李醫師", name: randomTraderName(), age: 35, time: "1700-1800" },
  { id: "A000000002", doctor: "張醫師", name: randomTraderName(), age: 45, time: "1400-1500" },
  { id: "A000000003", doctor: "李醫師", name: randomTraderName(), age: 16, time: "1700-1800" },
  { id: "A000000004", doctor: "楊醫師", name: randomTraderName(), age: 62, time: "1700-1800" },
  { id: "A000000005", doctor: "張醫師", name: randomTraderName(), age: 150, time: "1300-1400" },
  { id: "A000000006", doctor: "李醫師", name: randomTraderName(), age: 44, time: "1700-1800" },
  { id: "A000000007", doctor: "楊醫師", name: randomTraderName(), age: 36, time: "1700-1800" },
  { id: "A000000008", doctor: "李醫師", name: randomTraderName(), age: 65, time: "1700-1800" },
  { id: "A000000009", doctor: "楊醫師", name: randomTraderName(), age: 65, time: "1700-1800" },
  { id: "A000000010", doctor: "張醫師", name: randomTraderName(), age: 65, time: "1700-1800" },
];

const Schedule = () => {
  const classes = useStyles();
  return (
    <>
      <CustomTable rows={rows} columns={columns} />
      <Fab color="primary" aria-label="add" variant="extended" sx={{ position: "fixed", right: 100, bottom: 50, p: 3 }}>
        <Add />
        <Box sx={{ fontSize: "1.5rem", marginLeft: ".3rem" }}>新增排程</Box>
      </Fab>
    </>
  );
};

export default Schedule;

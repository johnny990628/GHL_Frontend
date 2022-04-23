import React, { useMemo, useCallback } from 'react'
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material'
import { ArrowDropDown, ArrowRight, Assignment } from '@mui/icons-material'

import { useDispatch, useSelector } from 'react-redux'

import useStyles from './Style'
import CustomTable from '../../Components/CustomTable/CustomTable'
import ReportDialog from '../../Components/ReportDialog/ReportDialog'
import { openDialog } from '../../Redux/Slices/Dialog'
import { id } from 'date-fns/locale'
import CustomScrollbar from '../../Components/CustomScrollbar/CustomScrollbar'

const Report = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.patients)

    const handleClick = ({ patient, reports }) => {
        dispatch(openDialog({ type: 'report', row: { patient, reports } }))
    }

    const renderSubRow = useCallback(({ row }) => {
        return (
            <Box>
                <Box sx={{ fontSize: '1.5rem' }}>報告紀錄</Box>
                <List sx={{ maxHeight: '200123.rem', overflowY: 'auto' }}>
                    {row.original.reports.map((report, index) => (
                        <ListItem
                            key={report.id}
                            disablePadding
                            onClick={() => handleClick({ patient: row.original, reports: { id: report._id, records: report.records } })}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <Assignment />
                                </ListItemIcon>
                                <ListItemText
                                    primary={`第${index + 1}次報告`}
                                    secondary={`${new Date(report.updatedAt).toLocaleDateString()}_v${report.records.length}`}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        )
    }, [])

    const columns = useMemo(
        () => [
            {
                // Build our expander column
                id: 'expander', // Make sure it has an ID
                Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                    <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? <ArrowDropDown /> : <ArrowRight />}</span>
                ),
                Cell: ({ row }) => <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? <ArrowDropDown /> : <ArrowRight />}</span>,
            },
            { accessor: 'id', Header: '身分證字號' },
            { accessor: 'name', Header: '姓名' },
            { accessor: 'gender', Header: '性別' },
            { accessor: 'birth', Header: '生日', Cell: row => new Date(row.row.original.birth).toLocaleDateString() },
            { accessor: 'phone', Header: '電話' },
            { accessor: 'department', Header: '部門單位' },
            // { accessor: 'address', Header: '地址' },
            // { accessor: 'updateTime', Header: '更新日期' },
        ],
        []
    )

    return (
        <Box className={classes.container}>
            <CustomTable renderSubRow={renderSubRow} data={data.filter(d => d.reports.length > 0)} columns={columns} />
            <ReportDialog mode="edit" />
        </Box>
    )
}

export default Report

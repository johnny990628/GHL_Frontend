import React, { useEffect, useMemo, useState } from 'react'
import { Box, FormControl, InputLabel, ListItemText, MenuItem, MenuList, Select } from '@mui/material'
import useStyles from './Style'
import { apiGetDepartments } from '../../Axios/Department'
import CustomTable from '../../Components/CustomTable/CustomTable'
import ReportDialog from '../../Components/ReportDialog/ReportDialog'

const Department = () => {
    const [departments, setDepartments] = useState([])
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(1)
    const classes = useStyles()

    const fetchData = async params => {
        const res = await apiGetDepartments(params)
        const { count, results } = res.data
        setDepartments(results)
        setCount(count)
        setPage(Math.ceil(count / params.limit))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const columns = useMemo(
        () => [
            { accessor: 'name', Header: '部門名稱', Cell: row => row.row.original.name },
            { accessor: 'address', Header: '部門地址', Cell: row => row.row.original.address },
        ],
        []
    )

    return (
        <Box className={classes.container}>
            {/* <CustomTable renderSubRow={renderSubRow} data={data.filter(d => d.reports.length > 0)} columns={columns} /> */}
            <CustomTable columns={columns} fetchData={fetchData} data={departments} totalPage={page} totalCount={count} />
            <ReportDialog mode="edit" />
        </Box>
    )
}

export default Department

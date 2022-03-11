import React, { useState, useMemo } from 'react'
import { Grid, List, Card, CardHeader, ListItem, ListItemText, ListItemIcon, Checkbox, Button, Divider } from '@mui/material'

import useStyles from './Style'

import { useDispatch, useSelector } from 'react-redux'
import { fetchPatients, addPatient, removePatient, addProcessing, removeProcessing } from '../../Redux/Slices/Patient'
import CustomTable from '../../Components/CustomTable/CustomTable'

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1)
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1)
}

function union(a, b) {
    return [...a, ...not(b, a)]
}

const Schedule = () => {
    const { data } = useSelector(state => state.patients)
    const [checked, setChecked] = useState([])
    const [left, setLeft] = useState(data.filter(d => d.processing))
    const [right, setRight] = useState(data.filter(d => !d.processing))

    const leftChecked = intersection(checked, left)
    const rightChecked = intersection(checked, right)
    const classes = useStyles()

    const columns = useMemo(
        () => [
            { accessor: 'id', Header: '身分證字號' },
            { accessor: 'name', Header: '姓名' },
            { accessor: 'gender', Header: '性別' },
            // { accessor: 'birth', Header: '生日' },
            // { accessor: 'phone', Header: '電話' },
            // { accessor: 'department', Header: '部門單位' },
            // { accessor: 'address', Header: '地址' },
            // { accessor: 'updateTime', Header: '更新日期' },
        ],
        []
    )

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    const numberOfChecked = items => intersection(checked, items).length

    const handleToggleAll = items => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items))
        } else {
            setChecked(union(checked, items))
        }
    }

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked))
        setLeft(not(left, leftChecked))
        setChecked(not(checked, leftChecked))
    }

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked))
        setRight(not(right, rightChecked))
        setChecked(not(checked, rightChecked))
    }

    // const customList = (title, items) => (
    //     <Card>
    //         <CardHeader
    //             sx={{ px: 2, py: 1 }}
    //             avatar={
    //                 <Checkbox
    //                     onClick={handleToggleAll(items)}
    //                     checked={numberOfChecked(items) === items.length && items.length !== 0}
    //                     indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
    //                     disabled={items.length === 0}
    //                     inputProps={{
    //                         'aria-label': 'all items selected',
    //                     }}
    //                 />
    //             }
    //             title={title}
    //             subheader={`${numberOfChecked(items)}/${items.length} selected`}
    //         />
    //         <Divider />
    //         <List
    //             sx={{
    //                 width: 200,
    //                 height: 230,
    //                 bgcolor: 'background.paper',
    //                 overflow: 'auto',
    //             }}
    //             dense
    //             component="div"
    //             role="list"
    //         >
    //             {items.map(value => {
    //                 const labelId = `transfer-list-all-item-${value}-label`

    //                 return (
    //                     <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
    //                         <ListItemIcon>
    //                             <Checkbox
    //                                 checked={checked.indexOf(value) !== -1}
    //                                 tabIndex={-1}
    //                                 disableRipple
    //                                 inputProps={{
    //                                     'aria-labelledby': labelId,
    //                                 }}
    //                             />
    //                         </ListItemIcon>
    //                         <ListItemText id={labelId} primary={`${value.id}`} />
    //                     </ListItem>
    //                 )
    //             })}
    //             <ListItem />
    //         </List>
    //     </Card>
    // )

    return (
        <Grid container spacing={2} className={classes.container}>
            <Grid item xs={5}>
                <CustomTable data={left} columns={columns} deleteAction={removePatient} />
            </Grid>
            <Grid item xs={1}>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <CustomTable data={right} columns={columns} deleteAction={removePatient} mode="processing" />
            </Grid>
        </Grid>
    )
}

export default Schedule

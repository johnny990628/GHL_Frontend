import { Box, TextField, Button, CircularProgress, InputAdornment } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import useStyles from './Style'

const GlobalFilter = ({ setSearch, search, totalCount, loading }) => {
    const classes = useStyles()
    const [value, setValue] = useState('')
    const handleSearch = useDebouncedCallback(text => {
        setSearch(text)
    }, 500)

    return (
        <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', margin: '1rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Search sx={{ color: 'text.gray', mr: 1, my: 0.5 }} />
                <TextField
                    variant="standard"
                    label={`${totalCount}筆資料`}
                    value={value}
                    onChange={e => {
                        setValue(e.target.value)
                        handleSearch(e.target.value)
                    }}
                    onKeyPress={e => {
                        e.key === 'Enter' && setSearch(value)
                    }}
                    sx={{ width: '20rem' }}
                />
            </Box>
            <Box style={{ marginLeft: '1rem' }}>
                {loading ? <CircularProgress color="primary" size={20} /> : <Box style={{ width: '20px' }}></Box>}
            </Box>
        </Box>
    )
}

export default GlobalFilter

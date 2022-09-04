import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetDepartments } from '../../Axios/Department'

import { tokenExpirationHandler } from '../../Utils/ErrorHandle'
import { apiGetStats, apiGetStatsByDepartmentID } from './../../Axios/Stats'

const initialState = {
    departments: [],
    numsOfPeople: [
        {
            name: 'total',
            label: '超音波檢查總次數',
            amount: 0,
            totalFemale: {
                name: 'totalFemale',
                label: '女',
                value: 0,
            },
            totalMale: {
                name: 'totalMale',
                label: '男',
                value: 0,
            },
        },
        {
            name: 'reserve',
            label: '預約總人數',
            amount: 0,
            reserveFemale: {
                name: 'reserveFemale',
                label: '女',
                value: 0,
            },
            reserveMale: {
                name: 'reserveMale',
                label: '男',
                value: 0,
            },
        },
        {
            name: 'absent',
            label: '未報到人數',
            amount: 0,
            absentFemale: {
                name: 'absentFemale',
                label: '女',
                value: 0,
            },
            absentMale: {
                name: 'absentMale',
                label: '男',
                value: 0,
            },
        },
    ],
    numsOfReport: [
        {
            name: 'liver',
            label: '肝臟異常',
            amount: 0,
            FLD: {
                name: 'FLD',
                label: '脂肪肝',
                value: 0,
            },
            SLPL: {
                name: 'SLPL',
                label: '疑似肝實質病變',
                value: 0,
            },
            LPL: { name: 'LPL', label: '肝實質病變', value: 0 },
            LC: {
                name: 'LC',
                label: '肝硬化',
                value: 0,
            },
            PLD: {
                name: 'PLD',
                label: '肝囊腫',
                value: 0,
            },
            HEM: {
                name: 'HEM',
                label: '血管瘤',
                value: 0,
            },
            IC: {
                name: 'IC',
                label: '肝內鈣化點',
                value: 0,
            },
            HEP: {
                name: 'HEP',
                label: '肝腫瘤(疑似肝癌)',
                value: 0,
            },
            HEPU: {
                name: 'HEPU',
                label: '肝腫瘤(性質不明)',
                value: 0,
            },
        },
        {
            name: 'gallbladder',
            label: '膽囊異常',
            amount: 0,
            CL: {
                name: 'CL',
                label: '膽結石',
                value: 0,
            },
            GP: {
                name: 'GP',
                label: '膽息肉',
                type: 'radio',
                value: 0,
            },
        },
        {
            name: 'kidney',
            label: '腎臟異常',
            amount: 0,
            KS: {
                name: 'KS',
                label: '腎結石',
                value: 0,
            },
            RC: {
                name: 'RC',
                label: '腎囊腫',
                value: 0,
            },
            KC: {
                name: 'KC',
                label: '腎腫瘤',
                value: 0,
            },
        },
        {
            name: 'pancreas',
            label: '胰臟異常',
            amount: 0,
        },
        {
            name: 'spleen',
            label: '脾臟異常',
            amount: 0,
            ES: {
                name: 'ES',
                label: '脾臟腫大',
                value: 0,
            },
        },
        {
            name: 'suggestion',
            label: '需進一步檢查',
            amount: 0,
            datetime: {
                name: 'datetime',
                label: '請每隔幾年幾月定期追蹤一次',
                value: 0,
            },
            examination: {
                name: 'examination',
                label: '請至各大醫院近一步詳細檢查',
                value: 0,
            },
        },
    ],
}

export const fetchDepartment = createAsyncThunk('statistic/fetchDepartment', async (_, thunkAPI) => {
    try {
        const departments = await apiGetDepartments({ limit: 100, offset: 0, sort: 'createdAt', desc: -1 })
        return { departments: departments.data.results }
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})
export const fetchStatistic = createAsyncThunk('statistic/fetchStatistic', async ({ departmentID, params }, thunkAPI) => {
    try {
        const stats = departmentID ? await apiGetStatsByDepartmentID(departmentID, params) : await apiGetStats(params)
        return stats.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

const statisticSlice = createSlice({
    name: 'statistic',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchDepartment.fulfilled]: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        [fetchDepartment.rejected]: (state, action) => {
            return initialState
        },
        [fetchStatistic.fulfilled]: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        [fetchStatistic.rejected]: (state, action) => {
            return {
                ...initialState,
                departments: state.departments,
            }
        },
    },
})

export default statisticSlice.reducer

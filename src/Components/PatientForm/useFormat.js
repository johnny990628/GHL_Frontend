import React, { useEffect, useState } from 'react'
import { apiGetDepartments } from '../../Axios/Department'

export const useFormat = () => {
    const [departments, setDepartments] = useState([])
    useEffect(() => {
        apiGetDepartments({ limit: 100, offset: 0 }).then(res => setDepartments(res.data.results))
    }, [])

    const format = [
        {
            formtype: 'Select',
            name: 'department',
            label: departments,
            value:"部門",
            required: true,
        },
        {
            formtype: 'Text',
            name: 'name',
            label: '姓名',
            type: 'String',
            required: true,
            disabled: false,
        },
        {
            formtype: 'Text',
            name: 'id',
            label: '身分證字號',
            type: 'String',
            required: true,
            disabled: false,
        },
        {
            formtype: 'Text',
            name: 'phone',
            label: '手機號碼',
            type: 'Number',
            required: true,
            disabled: false,
        },
        {
            formtype: 'Text',
            name: 'address',
            label: '住址',
            type: 'String',
            required: true,
            disabled: false,
        },
        {
            formtype: 'Time',
            name: 'birth',
            label: '生日',
            required: true,
        },
        // {
        //     formtype: 'Radio',
        //     name: 'gender',
        //     label: [
        //         {
        //             name: '男',
        //             label: '男性',
        //         },
        //         {
        //             name: '女',
        //             label: '女性',
        //         },
        //     ],
        //     required: true,
        // },
    ]

    return { format }
}

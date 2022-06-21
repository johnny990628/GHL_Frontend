import { apiGetDepartments } from "../../Axios/Department";
import React, { useEffect, useState } from "react";

const department = {};
apiGetDepartments({ limit: 100, offset: 0 }).then(
    (res) => (department = res.data.results)
);

export const Format = {
    Format: [ 
        {
            formtype: "Select",
            name: "department",
            label: department.map((item) => {
                return {
                    name: item.name,
                    Lable: item.name,
                };
            }),
            // [
            //     {
            //         name: "紅十字會",
            //         label: "紅十字會",
            //     },
            //     {
            //         name: "創世基金會",
            //         label: "創世基金會",
            //     },
            // ],
            required: true,
        },
        {
            formtype: "Text",
            name: "id",
            label: "身分證字號",
            type: "String",
            required: true,
            disabled: false,
        },
        {
            formtype: "Text",
            name: "name",
            label: "姓名",
            type: "String",
            required: true,
            disabled: false,
        },
        {
            formtype: "Text",
            name: "address",
            label: "住址",
            type: "String",
            required: true,
            disabled: false,
        },
        {
            formtype: "Text",
            name: "phone",
            label: "手機號碼",
            type: "Number",
            required: true,
            disabled: false,
        },
        {
            formtype: "Time",
            name: "birth",
            label: "生日",
            required: true,
        },
        {
            formtype: "Radio",
            name: "gender",
            label: [
                {
                    name: "男",
                    label: "男性",
                },
                {
                    name: "女",
                    label: "女性",
                },
            ],
            required: true,
        },
    ],
};

export const Format = {
    Format: [
        {
            formtype: "Select",
            name: "department",
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

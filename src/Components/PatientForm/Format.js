export const Format = {
    Format: [
        {
            formtype: "Text",
            name: "ID",
            label: "身分證字號",
            type: "String",
            required: true,
            disabled: false,
        },
        {
            formtype: "Text",
            name: "Name",
            label: "姓名",
            type: "String",
            required: true,
            disabled: false,
        },
        {
            formtype: "Text",
            name: "Address",
            label: "住址",
            type: "String",
            required: true,
            disabled: false,
        },
        {
            formtype: "Text",
            name: "Phone",
            label: "手機號碼",
            type: "Number",
            required: true,
            disabled: false,
        },
        {
            formtype: "Select",
            name: "Gender",
            label: [
                {
                    name: "Male",
                    label: "男性",
                },
                {
                    name: "Female",
                    label: "女性",
                },
            ],
            required: true,
        },
        {
            formtype: "Time",
            name: "Birth",
            label: "生日",
            required: true,
        },
    ],
};

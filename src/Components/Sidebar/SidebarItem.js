import { Home, EventAvailable, ReceiptLong, Accessible, Settings, CreateNewFolder, Person } from '@mui/icons-material'

const data = [
    {
        display_name: '首頁',
        name: 'home',
        route: '/',
        icon: <Home />,
    },
    {
        display_name: '病人管理',
        name: 'patient',
        route: '/patient',
        icon: <Accessible />,
    },
    {
        display_name: '新增報告',
        name: 'createReport',
        route: '/createReport',
        icon: <EventAvailable />,
    },
    {
        display_name: '報告管理',
        name: 'report',
        route: '/report',
        icon: <CreateNewFolder />,
    },
    {
        display_name: '使用者管理',
        name: 'user',
        route: '/user',
        icon: <Person />,
    },
    {
        display_name: '設定',
        name: 'setting',
        route: '/setting',
        icon: <Settings />,
    },
]

export default data

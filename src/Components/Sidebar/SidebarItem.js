import { Home, EventAvailable, ReceiptLong, Accessible, Settings, CreateNewFolder } from '@mui/icons-material';

const data = [
    {
        display_name: '首頁',
        name: 'home',
        route: '/',
        icon: <Home />,
    },
    {
        display_name: '排程管理',
        name: 'schedule',
        route: '/schedule',
        icon: <EventAvailable />,
    },
    {
        display_name: '病歷管理',
        name: 'record',
        route: '/record',
        icon: <ReceiptLong />,
    },
    {
        display_name: '病人管理',
        name: 'patient',
        route: '/patient',
        icon: <Accessible />,
    },
    {
        display_name: '報告管理',
        name: 'report',
        route: '/report',
        icon: <CreateNewFolder />,
    },
    {
        display_name: '設定',
        name: 'setting',
        route: '/setting',
        icon: <Settings />,
    },
];

export default data;

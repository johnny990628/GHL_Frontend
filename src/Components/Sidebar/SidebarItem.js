import { Home, EventAvailable, ReceiptLong, Accessible, Settings } from '@mui/icons-material';

const data = [
    {
        display_name: '首頁',
        name: 'home',
        route: '/',
        icon: <Home />,
    },
    {
        display_name: '排程',
        name: 'schedule',
        route: '/schedule',
        icon: <EventAvailable />,
    },
    {
        display_name: '病歷',
        name: 'record',
        route: '/record',
        icon: <ReceiptLong />,
    },
    {
        display_name: '病人資訊',
        name: 'patient',
        route: '/patient',
        icon: <Accessible />,
    },
    {
        display_name: '設定',
        name: 'setting',
        route: '/setting',
        icon: <Settings />,
    },
];

export default data;

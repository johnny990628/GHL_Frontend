import CreateReport from '../Pages/CreateReport/CreateReport'
import Home from '../Pages/Home/Home'
import Patient from '../Pages/Patient/Patient'
import Department from '../Pages/Department/Department'
import Report from '../Pages/Report/Report'
import User from '../Pages/User/User'
import {
    HomeOutlined,
    EventAvailableOutlined,
    AccessibleForwardOutlined,
    CreateNewFolderOutlined,
    PersonOutlined,
    AccountBalanceOutlined,
    InsertChartOutlined,
} from '@mui/icons-material'
import Statistic from '../Pages/Statistic/Statistic'

const routerList = [
    {
        display_name: '首頁',
        name: 'home',
        icon: <HomeOutlined />,
        path: '/',
        Component: Home,
    },
    {
        display_name: '病人管理',
        name: 'patient',
        icon: <AccessibleForwardOutlined />,
        path: '/patient',
        Component: Patient,
    },
    {
        display_name: '新增報告',
        name: 'createReport',
        icon: <EventAvailableOutlined />,
        path: '/createReport',
        Component: CreateReport,
        authority: [3, 2],
    },
    {
        display_name: '報告管理',
        name: 'report',
        icon: <CreateNewFolderOutlined />,
        path: '/report',
        Component: Report,
    },
    {
        display_name: '使用者管理',
        name: 'user',
        icon: <PersonOutlined />,
        path: '/user',
        Component: User,
        authority: [3],
    },
    {
        display_name: '部門管理',
        name: 'department',
        icon: <AccountBalanceOutlined />,
        path: '/department',
        Component: Department,
        authority: [3, 1],
    },
    {
        display_name: '數據中心',
        name: 'statistic',
        icon: <InsertChartOutlined />,
        path: '/statistic',
        Component: Statistic,
        authority: [3],
    },
]

export default routerList

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

export const SideBarData = [
    {
        icon: DashboardOutlinedIcon,
        title: 'Bảng điều khiển',
        url: ['/admin', '/admin/dashboard'], 
    },
    {
        icon: GroupOutlinedIcon,
        title: 'Người dùng',
        url: '/admin/users'
    },
    {
        icon: Inventory2OutlinedIcon,
        title: 'Sản phẩm',
        url: '/admin/products'
    },

];


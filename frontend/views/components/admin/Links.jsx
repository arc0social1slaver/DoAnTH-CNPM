import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const SideBarData = [
    {
        icon: DashboardOutlinedIcon,
        title: 'Dashboard',
        url: '/admin/dashboard'
    },
    {
        icon: GroupOutlinedIcon,
        title: 'Users',
        url: '/admin/users'
    },
    {
        icon: InventoryOutlinedIcon,
        title: 'Orders',
        url: '/admin/orders'
    },
    {
        icon: Inventory2OutlinedIcon,
        title: 'Products',
        url: '/admin/products'
    },
    {
        icon: SettingsOutlinedIcon,
        title: 'Setting',
        url: '/admin/setting'
    },

];


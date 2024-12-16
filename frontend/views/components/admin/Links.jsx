import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CategoryOutlineIcon from "@mui/icons-material/CategoryOutlined";

export const SideBarData = [
    {
        icon: DashboardOutlinedIcon,
        title: 'Bảng điều khiển',
        url: '/admin/dashboard'
    },
    {
        icon: GroupOutlinedIcon,
        title: 'Người dùng',
        url: '/admin/users'
    },
    {
        icon: InventoryOutlinedIcon,
        title: 'Đơn hàng',
        url: '/admin/orders'
    },
    {
        icon: Inventory2OutlinedIcon,
        title: 'Sản phẩm',
        url: '/admin/products'
    },
    {
        icon: CategoryOutlineIcon,
        title: 'Danh mục',
        url: '/admin/categories'
    },
    {
        icon: SettingsOutlinedIcon,
        title: 'Cài đặt',
        url: '/admin/setting'
    },

];


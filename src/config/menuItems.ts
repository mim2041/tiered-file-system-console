export interface MenuItem {
    key: string;
    label: string;
    icon?: string;
    path?: string;
    children?: MenuItem[];
}

// SaaS file-management admin menu items
export const menuItems: MenuItem[] = [
    { key: 'admin-packages', label: 'Subscription Packages', icon: 'CrownOutlined', path: '/dashboard/admin/packages' },
];

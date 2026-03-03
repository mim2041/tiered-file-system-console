export interface MenuItem {
    key: string;
    label: string;
    icon?: string;
    path?: string;
    children?: MenuItem[];
}

// SaaS file-management admin menu items
export const menuItems: MenuItem[] = [
    { key: 'admin-home', label: 'Dashboard', icon: 'DashboardOutlined', path: '/dashboard/admin' },
    { key: 'admin-users', label: 'Users', icon: 'UserOutlined', path: '/dashboard/admin/users' },
    { key: 'admin-packages', label: 'Subscription Packages', icon: 'CrownOutlined', path: '/dashboard/admin/packages' },
    { key: 'admin-enrollments', label: 'Package History', icon: 'HistoryOutlined', path: '/dashboard/admin/enrollments' },
    { key: 'admin-audit-logs', label: 'Audit Logs', icon: 'AuditOutlined', path: '/dashboard/admin/audit-logs' },
];

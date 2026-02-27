export interface MenuItem {
    key: string;
    label: string;
    icon?: string;
    path?: string;
    children?: MenuItem[];
}

// SaaS file-management admin menu items
export const menuItems: MenuItem[] = [
    { key: 'dashboard', label: 'Dashboard', icon: 'DashboardOutlined', path: '/dashboard' },

    {
        key: 'admin-packages',
        label: 'Subscription Packages',
        icon: 'CrownOutlined',
        path: '/dashboard/admin/packages',
        children: [
            { key: 'admin-packages-list', label: 'Package Rules', icon: 'ControlOutlined', path: '/dashboard/admin/packages' },
            { key: 'admin-users', label: 'User Quotas', icon: 'TeamOutlined', path: '/dashboard/admin/users' },
            { key: 'admin-audits', label: 'Audit Logs', icon: 'FileSearchOutlined', path: '/dashboard/admin/audits' },
        ],
    },

    {
        key: 'storage',
        label: 'File & Folder',
        icon: 'FolderOpenOutlined',
        path: '/dashboard/storage/folders',
        children: [
            { key: 'storage-folders', label: 'Folders', icon: 'FolderOutlined', path: '/dashboard/storage/folders' },
            { key: 'storage-files', label: 'Files', icon: 'FileOutlined', path: '/dashboard/storage/files' },
        ],
    },

    {
        key: 'subscriptions',
        label: 'My Subscription',
        icon: 'SafetyCertificateOutlined',
        path: '/dashboard/subscriptions/current',
        children: [
            { key: 'subscription-current', label: 'Current Plan', icon: 'InfoCircleOutlined', path: '/dashboard/subscriptions/current' },
            { key: 'subscription-history', label: 'Plan History', icon: 'HistoryOutlined', path: '/dashboard/subscriptions/history' },
        ],
    },

    { key: 'reports', label: 'Usage Reports', icon: 'BarChartOutlined', path: '/dashboard/reports' },

    { key: 'api-docs', label: 'API Docs (Swagger)', icon: 'ApiOutlined', path: '/dashboard/api-docs' },

    {
        key: 'settings',
        label: 'Settings',
        icon: 'SettingOutlined',
        path: '/dashboard/settings',
        children: [
            { key: 'settings-general', label: 'General', icon: 'SettingOutlined', path: '/dashboard/settings' },
            { key: 'settings-permissions', label: 'Permissions', icon: 'SafetyOutlined', path: '/dashboard/placeholder/settings-permissions' },
        ],
    },
];

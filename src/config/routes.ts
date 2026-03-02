// Application routes configuration
export const routes = {
    root: '/',
    auth: {
        root: '/auth',
        login: '/auth/login',
        register: '/auth/register',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',
    },
    dashboard: {
        root: '/dashboard',
        admin: {
            packages: '/dashboard/admin/packages',
        },
    },
    errors: {
        notFound: '/404',
        forbidden: '/403',
        serverError: '/500',
        unauthorized: '/401',
    },
    public: {},
} as const;

// Route types for type safety
export type RouteKey = keyof typeof routes;
export type AuthRouteKey = keyof typeof routes.auth;
export type DashboardRouteKey = keyof typeof routes.dashboard;
export type ErrorRouteKey = keyof typeof routes.errors;
export type PublicRouteKey = keyof typeof routes.public;

// Helper function to get route path
export const getRoutePath = (routeKey: string, subKey?: string): string => {
    const route = routes[routeKey as RouteKey];
    if (typeof route === 'string') {
        return route;
    }
    if (subKey && typeof route === 'object') {
        return route[subKey as keyof typeof route] as string;
    }
    return '/';
};

// Route guards configuration
export const routeGuards = {
    public: [], // No authentication required
    auth: ['guest'], // Only for non-authenticated users
    protected: ['auth'], // Requires authentication
    admin: ['auth', 'admin'], // Requires authentication and admin role
} as const;

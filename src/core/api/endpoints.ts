// API Endpoints Configuration
// Centralized location for all API endpoints

export const API_ENDPOINTS = {
    // SaaS File Management core endpoints
    PACKAGES: {
        GET_ALL: '/packages',
        CREATE: '/admin/packages',
        UPDATE: (id: string) => `/admin/packages/${id}`,
        DELETE: (id: string) => `/admin/packages/${id}`,
        HISTORY: (id: string) => `/admin/packages/${id}/history`,
    },

    USER_SUBSCRIPTIONS: {
        ACTIVATE: '/subscriptions/activate',
        MY_CURRENT: '/subscriptions/me',
        MY_HISTORY: '/subscriptions/me',
    },

    FOLDERS: {
        LIST: '/folders',
        CREATE: '/folders',
        UPDATE: (id: string) => `/folders/${id}`,
        DELETE: (id: string) => `/folders/${id}`,
    },

    FILES: {
        LIST: '/files',
        UPLOAD: '/files',
        GET_BY_ID: (id: string) => `/files/${id}`,
        DOWNLOAD: (id: string) => `/files/${id}/download`,
        UPDATE: (id: string) => `/files/${id}`,
        DELETE: (id: string) => `/files/${id}`,
    },

    QUOTA: {
        MY_QUOTA: '/users/me/quota',
        ADMIN_USER_SUMMARY: '/admin/users',
    },

    // Authentication endpoints
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        VERIFY_OTP: '/auth/verify-otp',
        RESEND_OTP: '/auth/resend-otp',
        SETUP_PASSWORD: '/auth/setup-password',
        SUBSCRIPTION_PLANS: '/auth/subscription-plans',
        CREATE_ONBOARDING_CHECKOUT_SESSION: '/auth/create-onboarding-checkout-session',
        CHANGE_PASSWORD: '/auth/change-password',
        GET_CURRENT_USER: '/auth/me',
        UPDATE_PROFILE: '/auth/profile',
        REFRESH_TOKEN: '/auth/refresh-token',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
        RESEND_VERIFICATION: '/auth/resend-verification',
        // Legacy: ACCEPT_INVITATION
        ACCEPT_INVITATION: '/auth/accept-invitation',
        // New endpoints for invited user flow
        ACCEPT_TEAM_INVITATION: '/auth/accept-team-invitation',
        SETUP_INVITED_USER_PASSWORD: '/auth/setup-invited-user-password',
        SKIP_TEAM_INVITATION: '/auth/skip-team-invitation-step',
        SKIP_SUBSCRIPTION: '/auth/skip-subscription-step',
        SKIP_DATA_UPLOAD: '/auth/skip-data-upload-step',
        SKIP_STAKEHOLDER_SETUP: '/auth/skip-reviewer-setup-step',
        GET_PASSWORD_SETUP_TOKEN: (userId: string) => `/auth/password-setup-token/${userId}`,
    },

    // Media endpoints
    MEDIA: {
        UPLOAD: '/media/upload',
    },

    // Organization endpoints
    ORGANIZATION: {
        INVITE_MEMBER: (organizationId: string) => `/organization/${organizationId}/invite-member`,
        UPDATE_PROFILE: (organizationId: string) => `/organization/${organizationId}/profile`,
        INVITE_STAKEHOLDER: (organizationId: string) => `/organization/${organizationId}/invite-stakeholder`,
        AVAILABLE_QUARTERS: '/organization/available-quarters',
    },

    // Subscription endpoints
    SUBSCRIPTION: {
        GET_PLANS: '/subscription-plan',
        CREATE_CHECKOUT_SESSION: '/subscription/create-checkout-session',
        COMPLETE_SUBSCRIPTION: '/subscription/complete-subscription',
    },

    // Upload endpoints
    UPLOAD: {
        LIST: '/data-upload',
        GET_METHODS: '/data-upload/methods',
        // New AI parser upload endpoint
        UPLOAD_FILE: '/data-upload/process-file-upload',
        GET_PROCESSING_STATUS: (uploadId: string) => `/data-upload/${uploadId}/status`,
        UPDATE_MAPPINGS: (uploadId: string) => `/data-upload/${uploadId}/mappings`,
        GET_FINAL_DATA: (uploadId: string) => `/data-upload/${uploadId}/data`,
        RETRY: (uploadId: string) => `/data-upload/${uploadId}/retry`,
        SAVE_DRAFT: '/metric-submission/draft',
        AVAILABLE_CYCLES: '/data-upload/available-cycles',
    },

    // Metric Submission endpoints
    METRIC_SUBMISSION: {
        GET_DETAILS: (submissionId: string) => `/metric-submission/${submissionId}/details`,
        GET_VERSION_HISTORY: (submissionId: string) => `/metric-submission/${submissionId}/version-history`,
        UPDATE_VERSION: (submissionId: string) => `/metric-submission/${submissionId}/version`,
    },

    // Metrics endpoints
    METRICS: {
        GET_ALL: '/metrics',
        GET_BY_ID: (id: string) => `/metrics/${id}`,
        CREATE: '/metrics',
        UPDATE: (id: string) => `/metrics/${id}`,
        DELETE: (id: string) => `/metrics/${id}`,
    },

    // Metrics Dictionary endpoints (new)
    METRICS_DICTIONARY: {
        GET_ALL: '/metrics-dictionary',
        GET_BY_ID: (id: string) => `/metrics-dictionary/${id}`,
        GET_INDUSTRIES: '/metrics-dictionary/industries',
        GET_CATEGORIES: '/metrics-dictionary/categories',
        SEARCH: '/metrics-dictionary',
    },

    // Cycle Management endpoints (new)
    CYCLE_MANAGEMENT: {
        GET_CYCLES: '/reporting-cycle',
        GET_CYCLE: (cycleId: string) => `/reporting-cycle/${cycleId}`,
        CREATE_CYCLE: '/reporting-cycle',
        UPDATE_CYCLE: (cycleId: string) => `/reporting-cycle/${cycleId}`,
        DELETE_CYCLE: (cycleId: string) => `/reporting-cycle/${cycleId}`,
        GET_ACTIVE_CYCLE: '/reporting-cycle/active',
        START_CYCLE: (cycleId: string) => `/reporting-cycle/${cycleId}/start`,
        END_CYCLE: (cycleId: string) => `/reporting-cycle/${cycleId}/end`,
        GET_CYCLE_METRICS: (cycleId: string) => `/reporting-cycle/${cycleId}/metrics`,
        ADD_METRIC_TO_CYCLE: (cycleId: string) => `/reporting-cycle/${cycleId}/metrics`,
        REMOVE_METRIC_FROM_CYCLE: (cycleId: string, metricId: string) => `/reporting-cycle/${cycleId}/metrics/${metricId}`,
    },

    // Analytics endpoints
    ANALYTICS: {
        GET_OVERVIEW: '/analytics/overview',
        GET_TRENDS: '/analytics/trends',
        GET_INSIGHTS: '/analytics/insights',
        GET_PERFORMANCE: '/analytics/performance',
    },

    // Billing endpoints
    BILLING: {
        GET_PLANS: '/billing/plans',
        GET_USAGE: '/billing/usage',
        GET_INVOICES: '/billing/invoices',
        GET_PAYMENT_METHODS: '/billing/payment-methods',
    },

    // Admin endpoints
    ADMIN: {
        GET_USERS: '/admin/users',
        GET_ROLES: '/admin/roles',
        GET_SYSTEM: '/admin/system',
        GET_LOGS: '/admin/logs',
        GET_ALL_METRICS: '/metric-request/admin/metrics/all-metrics',
        GET_METRIC_HISTORY: (metricId: string) => `/metric-request/admin/metrics/${metricId}/history`,
    },

    // User management endpoints
    USER: {
        GET_PROFILE: '/user/profile',
        UPDATE_PROFILE: '/user/profile',
        GET_SETTINGS: '/user/settings',
        UPDATE_SETTINGS: '/user/settings',
        TEAM: '/user/team',
        ROLES: '/user/roles',
        UPDATE_ROLE: (userId: string) => `/user/${userId}/role`,
        ACCEPT_STAKEHOLDER_INVITATION: '/user/accept-stakeholder-invitation',
    },

    // Dashboard endpoints
    DASHBOARD: {
        GET_OVERVIEW: '/dashboard/overview',
        GET_STAKEHOLDER: '/dashboard/stakeholder',
    },

    // Stakeholder admin endpoints
    STAKEHOLDER: {
        LIST: '/stakeholder/list',
        GET_ONE: (stakeholderId: string) => `/stakeholder/${stakeholderId}`,
        UPDATE: (stakeholderId: string) => `/stakeholder/${stakeholderId}`,
        DELETE: (stakeholderId: string) => `/stakeholder/${stakeholderId}`,
    },

    // Request endpoints
    REQUESTS: {
        GET_ALL: '/requests',
        GET_BY_ID: (id: string) => `/requests/${id}`,
        CREATE: '/requests',
        UPDATE: (id: string) => `/requests/${id}`,
        DELETE: (id: string) => `/requests/${id}`,
    },

    // Metric Request flow (stakeholder -> admin)
    METRIC_REQUEST: {
        SUBMIT: '/metric-request/submit',
        SUBMIT_QUARTER_SPECIFIC: '/metric-request/submit-quarter-specific',
        ADMIN_ALL: '/metric-request/admin/all',
        PENDING: '/metric-request/admin/pending',
        UPDATE_STATUS: (requestId: string) => `/metric-request/${requestId}/status`,
        STAKEHOLDER_LIST: '/metric-request/stakeholder/list',
        // New package-based endpoints
        CREATE_PACKAGE: '/metric-request',
        GET_AVAILABLE_METRICS: (cycleId: string) => `/metric-request/available-metrics/${cycleId}`,
        GET_AVAILABLE_CYCLES: '/reporting-cycle/stakeholder/available',
        CHECK_CYCLE_AVAILABILITY: (cycleId: string) => `/reporting-cycle/${cycleId}/availability`,
        ADD_METRICS_TO_PACKAGE: (packageId: string) => `/metric-request/${packageId}/add-metrics`,
        REMOVE_METRICS_FROM_PACKAGE: (packageId: string) => `/metric-request/${packageId}/remove-metrics`,
        UPDATE_PACKAGE: (packageId: string) => `/metric-request/${packageId}`,
        SET_BULK_DUE_DATE: (packageId: string) => `/metric-request/${packageId}/bulk-due-date`,
        SET_INDIVIDUAL_DUE_DATES: (packageId: string) => `/metric-request/${packageId}/individual-due-dates`,
        SUBMIT_PACKAGE: (packageId: string) => `/metric-request/${packageId}/submit`,
        // Stakeholder-specific endpoints
        GET_MY_PACKAGES: '/metric-request/my-packages',
        GET_PACKAGE_DETAILS: (packageId: string) => `/metric-request/${packageId}`,
        GET_APPROVED_METRICS_WITH_VALUES: (cycleId: string) => `/metric-request/approved-metrics/${cycleId}/with-values`,
        // Admin-specific endpoints
        GET_ADMIN_PACKAGES: '/metric-request',
        GET_ADMIN_PACKAGE_SUMMARY: '/metric-request/summary',
        GET_ADMIN_PACKAGE_DETAILS: (packageId: string) => `/metric-request/admin/${packageId}`,
        ADMIN_RESPONSE: '/metric-request/admin/response',
        BULK_APPROVE_PACKAGE: (packageId: string) => `/metric-request/${packageId}/bulk-approve`,
        BULK_REJECT_PACKAGE: (packageId: string) => `/metric-request/${packageId}/bulk-reject`,
        ADMIN_BULK_DUE_DATE: (packageId: string) => `/metric-request/${packageId}/admin/bulk-due-date`,
    },

    // Submission endpoints
    SUBMISSION: {
        SAVE_DRAFT: '/metric-submission/draft',
        DRAFTS: '/metric-submission/drafts',
        GET_DETAILS: (submissionId: string) => `/metric-submission/${submissionId}/details`,
        UPDATE_VERSION: (submissionId: string) => `/metric-submission/${submissionId}/version`,
        GET_VERSION_HISTORY: (submissionId: string) => `/metric-submission/${submissionId}/version-history`,
        SUBMIT: (submissionId: string) => `/metric-submission/${submissionId}/submit`,
        SHARE: (submissionId: string) => `/metric-submission/${submissionId}/share`,
        STATUS: (submissionId: string) => `/metric-submission/${submissionId}/status`,
    },

    // Export endpoints (singular base per API spec)
    EXPORT: {
        REQUEST: '/export/request',
        STATUS: (exportRequestId: string) => `/export/${exportRequestId}/status`,
        DOWNLOAD: (exportRequestId: string) => `/export/${exportRequestId}/download`,
        LIST: '/export/list',
        // New stakeholder export endpoints
        METRIC_REPORT: '/export/metric-report',
        PACKAGE_WISE: '/export/request',
    },

    // Stakeholder specific endpoints
    STAKEHOLDER_PORTAL: {
        DASHBOARD: '/stakeholder/dashboard',
        SUBMISSION_DETAILS: (submissionId: string) => `/stakeholder/submission/${submissionId}`,
        EXPORT: '/stakeholder/export',
        REQUESTED_METRICS: '/stakeholder/requested-metrics',
        REVIEW_SUBMISSION: (submissionId: string) => `/stakeholder/${submissionId}/review`,
        HISTORICAL_DATA: (metricId: string) => `/stakeholder/historical/${metricId}`,
    },

    // Manual upload
    MANUAL_UPLOAD: '/data-upload/manual-upload',

    // Template endpoints
    TEMPLATES: {
        GET_ALL: '/templates',
        GET_BY_ID: (id: string) => `/templates/${id}`,
        CREATE: '/templates',
        UPDATE: (id: string) => `/templates/${id}`,
        DELETE: (id: string) => `/templates/${id}`,
    },

    // Notification endpoints
    NOTIFICATIONS: {
        GET_ALL: '/notifications',
        MARK_READ: (id: string) => `/notifications/${id}/read`,
        MARK_ALL_READ: '/notifications/mark-all-read',
    },

    // Support endpoints
    SUPPORT: {
        GET_TICKETS: '/support/tickets',
        CREATE_TICKET: '/support/tickets',
        GET_TICKET: (id: string) => `/support/tickets/${id}`,
        UPDATE_TICKET: (id: string) => `/support/tickets/${id}`,
    },

    // Help endpoints
    HELP: {
        GET_ARTICLES: '/help/articles',
        GET_ARTICLE: (id: string) => `/help/articles/${id}`,
        SEARCH: '/help/search',
    },

    // Audit endpoints
    AUDIT: {
        GET_LOGS: '/audit/logs',
        GET_BY_ID: (id: string) => `/audit/logs/${id}`,
    },
} as const;

// Helper function to build dynamic endpoints
export const buildEndpoint = (base: string, params: Record<string, string> = {}): string => {
    let endpoint = base;
    Object.entries(params).forEach(([key, value]) => {
        endpoint = endpoint.replace(`:${key}`, value);
    });
    return endpoint;
};

// Type for endpoint keys
export type EndpointKey = keyof typeof API_ENDPOINTS; 
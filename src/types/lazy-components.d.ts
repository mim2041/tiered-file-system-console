// Type declarations for lazy-loaded components

// Auth pages
declare module '../../features/auth/pages/Login' {
    const Login: React.ComponentType;
    export default Login;
}


declare module '../../features/auth/pages/ForgotPassword' {
    const ForgotPassword: React.ComponentType;
    export default ForgotPassword;
}

declare module '../../features/auth/pages/ResetPassword' {
    const ResetPassword: React.ComponentType;
    export default ResetPassword;
}


// Generic fallback for any other lazy-loaded components
declare module '../../features/*/pages/*' {
    const Component: React.ComponentType;
    export default Component;
} 
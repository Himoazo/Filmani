/**
 * Login and sign up models
 */
export interface Login {
    email: string,
    password: string
}

export interface User {
    id: string,
    username: string,
    email: string,
    token: string,
    role: string //Admin / User
}

export interface Register {
    username: string,
    email: string,
    password: string
}

export interface AuthContext {
    user: User | null,
    login: (loginData: Login) => Promise<void>,
    signUp: (registerData: Register)=> Promise<void>,
    logout: () => void
}
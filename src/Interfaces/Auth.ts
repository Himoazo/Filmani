export interface Login {
    email: string,
    password: string
}

export interface User {
    username: string,
    email: string,
    token: string
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
    logout: () => void,
    loading: boolean
}
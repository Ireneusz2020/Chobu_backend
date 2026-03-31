import { createContext, useContext, useState } from 'react'

type AuthState = { token: string | null; role: string | null }

const Ctx = createContext<{ auth: AuthState; setAuth: (a: AuthState) => void }>({
  auth: { token: null, role: null },
  setAuth: () => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({ token: localStorage.getItem('access_token'), role: localStorage.getItem('role') })
  return <Ctx.Provider value={{ auth, setAuth }}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)

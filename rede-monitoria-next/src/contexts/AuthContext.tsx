"use client";

import { createContext } from "react";

type AuthContextType = {

};

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    );
}
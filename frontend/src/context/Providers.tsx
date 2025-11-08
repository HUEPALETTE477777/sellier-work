import { AuthProvider } from "./AuthContext";
import { type ReactNode } from "react";

interface ProvidersProps {
    children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
};

export default Providers;

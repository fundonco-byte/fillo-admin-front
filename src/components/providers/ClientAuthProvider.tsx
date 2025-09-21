"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import AuthWrapper from "@/components/auth/AuthWrapper";

interface ClientAuthProviderProps {
  children: React.ReactNode;
}

const ClientAuthProvider: React.FC<ClientAuthProviderProps> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </AuthProvider>
  );
};

export default ClientAuthProvider;

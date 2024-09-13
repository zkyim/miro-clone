"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import {
    AuthLoading,
    Authenticated,
    ConvexReactClient
} from "convex/react"
import { Loading } from "@/components/ui/auth/loading";

interface ConvexClientProviderProps {
    children: React.ReactNode;
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const ConvexClientProvider = ({children}: ConvexClientProviderProps) => {
    return (
      <ClerkProvider >
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <Authenticated>
            {children}
          </Authenticated>
          <AuthLoading>
            <Loading />
          </AuthLoading>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    )
}


'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Create a client to be used in the provider for CSR
// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // _defaulted: true,
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

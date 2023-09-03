'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0
        }
    }
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "__Inter_20951f, __Inter_Fallback_20951f", margin: 0 }}>
      <QueryClientProvider client={queryClient}>
          {children}
      </QueryClientProvider>
      </body>
    </html>
  )
}

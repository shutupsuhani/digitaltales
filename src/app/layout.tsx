// src/app/layout.tsx
"use client";

import { Provider } from 'react-redux';
import store from '@/store/store';
import { useEffect } from 'react';
import { setUser } from '@/store/authSlice';
import { getStoredUser } from '@/utils/tokenManager';
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setUser(user); // Dispatch the user info to the store
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}

'use client';
import { Toaster } from 'sonner';

export const ToastProvider = () => {
  return (
      <Toaster
          position="top-right"
          closeButton={true}
          expand={true}
          visibleToasts={5}
          toastOptions={{
              // Default styling for all toast messages
              style: {
                  background: 'hsl(var(--background))',
                  // color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              },
              classNames: {
                  toast: 'shadow-md rounded-md',
                  // icon: 'text-emerald-500', // Default icon color
                  error: 'text-red-400',
                  success: 'text-emerald-500',
                  warning: 'text-yellow-400',
                  info: 'bg-blue-400',
              }

          }}
      />

  );
};

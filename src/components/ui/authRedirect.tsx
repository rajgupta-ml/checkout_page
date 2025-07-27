// app/components/auth-redirect-button.tsx
'use client'; // This is crucial to make it a Client Component

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// A simple spinner component
const Loader = () => (
    <div className="h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-t-transparent"></div>
);

type AuthRedirectButtonProps = {
  isAuthenticated: boolean;
};

export const AuthRedirectButton = ({ isAuthenticated }: AuthRedirectButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const href = isAuthenticated ? "/dashboard" : "/sign-up";
  const buttonText = isAuthenticated ? "Go to Dashboard" : "Get Started";

  const handleClick = () => {
    setIsLoading(true);
    // The router push will navigate, and the loading state will remain
    // until the new page takes over.
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="cursor-pointer bg-primary text-muted w-md flex min-h-[52px] items-center justify-center p-4 transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-75"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {buttonText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </>
      )}
    </button>
  );
};
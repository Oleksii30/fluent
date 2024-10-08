import { useEffect } from "react";
import { useAuthState } from "context/auth";
import { Routes } from 'enums/routes';
import { useRouter } from 'next/router';

export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const { isLoggedIn } = useAuthState();
    const router = useRouter();
    useEffect(() => {
      if (!isLoggedIn) {
        router.replace(Routes.ROOT);
      }
    }, []);
    return <WrappedComponent {...props} />;
  };
};

import { useEffect, ReactElement } from "react";
import { useAuthState } from "context/auth";
import { Routes } from 'enums/routes';
import { useRouter } from 'next/router';

export const withAuth = (WrappedComponent: () => ReactElement) => {
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

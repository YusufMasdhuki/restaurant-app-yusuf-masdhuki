import { lazy, type ComponentType } from 'react';

interface Router {
  path: string;
  element: ComponentType;
}

export const routes: Router[] = [
  {
    path: '/',
    element: lazy(() => import('../app/pages/homePage/home-page.tsx')),
  },
  {
    path: '/auth',
    element: lazy(() => import('../app/pages/authPage/auth-page.tsx')),
  },
  {
    path: '/all-restaurant',
    element: lazy(
      () => import('../app/pages/allRestaurantPage/all-restaurant-page.tsx')
    ),
  },
];

import { lazy, type LazyExoticComponent, type ComponentType } from 'react';

interface Router {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: LazyExoticComponent<ComponentType<any>>; // ✅ bisa terima lazy
}

export const routes: Router[] = [
  {
    path: '/',
    element: lazy(() => import('../pages/homePage')),
  },
  {
    path: '/auth',
    element: lazy(() => import('../pages/authPage')),
  },
  {
    path: '/all-restaurant',
    element: lazy(() => import('../pages/allRestaurantPage')),
  },
  {
    path: '/detail-restaurant/:id',
    element: lazy(() => import('../pages/detailRestoPage')),
  },
  {
    path: '/profile',
    element: lazy(() => import('../pages/profilePage')),
  },
  {
    path: '/my-cart',
    element: lazy(() => import('../pages/myCartPage')),
  },
  {
    path: '/my-orders',
    element: lazy(() => import('../pages/myOrdersPage')),
  },
  {
    path: '/checkout',
    element: lazy(() => import('../pages/checkoutPage')),
  },
  {
    path: '/success',
    element: lazy(() => import('../pages/successPage')),
  },
];

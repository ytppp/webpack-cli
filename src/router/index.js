import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'components/loading';

const routers = [
  {
    name: '/',
    path: '/',
    exact: true,
    component: Loadable({
      loading: Loading,
      loader: () => import('pages/home'),
    }),
  },
  {
    name: 'lazy',
    path: '/lazy',
    exact: true,
    component: Loadable({
      loading: Loading,
      loader: () => import('pages/lazy'),
    }),
  },
];

export default routers;

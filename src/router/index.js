import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/GridSpin',
    children: [
      {
        path: '/pages/GridSpin',
        name: 'GridSpin',
        component: () =>
          import(
            '@/views/pages/GridSpin.vue'
          ),
      },
      {
        path: '/pages/ListUsers',
        name: 'ListUsers',
        component: () => import('@/views/pages/ListUsers.vue'),
      },
      {
        path: '/pages/addUser',
        name: 'AddUser',
        component: () => import('@/views/pages/AddUser.vue'),
      },
      {
        path: '/pages/UpdateUser/:id',
        name: 'UpdateUser',
        component: () => import('@/views/pages/UpdateUser.vue'),
    },
    

    {
      path: '/pages/resetPassword/:id',
      name: 'ResetPassword',
      component: () => import('@/views/pages/ResetPassword.vue'),
  },
  {
    path: '/pages/ResetHeaders',
    name: 'Headers',
    component: () => import('@/views/pages/ResetHeaders.vue'),
  },
      
      {
        path: '/pages/ListEvents',
        name: 'ListEvents',
        component: () => import('@/views/pages/ListEvents.vue'),
      },
      {
        path: '/pages/AddEvent',
        name: 'AddEvent',
        component: () => import('@/views/pages/AddEvent.vue'),
      },
      {
        path: '/pages/UpdateEvent/:id',
        name: 'UpdateEvent',
        component: () => import('@/views/pages/UpdateEvent.vue'),
    },
      {
        path: '/pages/ListDoorprizes',
        name: 'ListDoorprizes',
        component: () => import('@/views/pages/ListDoorprizes.vue'),
      },
      {
        path: '/pages/AddDoorprize',
        name: 'AddDoorprize',
        component: () => import('@/views/pages/AddDoorprize.vue'),
      },
      {
        path: '/pages/UpdateDoorprize/:id',
        name: 'UpdateDoorprize',
        component: () => import('@/views/pages/UpdateDoorprize.vue'),
      },
      {
        path: '/pages/ListKandidatUtama',
        name: 'ListKandidatUtama',
        component: () => import('@/views/pages/ListKandidatUtama.vue'),
      },
      {
        path: '/pages/AddKandidatUtama',
        name: 'AddKandidatUtama',
        component: () => import('@/views/pages/AddKandidatUtama.vue'),
      },
      {
        path: '/pages/UpdateKandidatUtama:id',
        name: 'UpdateKandidatUtama',
        component: () => import('@/views/pages/UpdateKandidatUtama.vue'),
      },
      {
        path: '/pages/ListKandidatUmum',
        name: 'ListKandidatUmum',
        component: () => import('@/views/pages/ListKandidatUmum.vue'),
      },
      {
        path: '/pages/AddKandidatUmum',
        name: 'AddKandidatUmum',
        component: () => import('@/views/pages/AddKandidatUmum.vue'),
      },
      {
        path: '/pages/UpdateKandidatUmum/:id',
        name: 'UpdateKandidatUmum',
        component: () => import('@/views/pages/UpdateKandidatUmum.vue'),
      },
      {
        path: '/pages/ListKandidatLainnya',
        name: 'ListKandidatLainnya',
        component: () => import('@/views/pages/ListKandidatLainnya.vue'),
      },
      {
        path: '/pages/AddKandidatLainnya',
        name: 'AddKandidatLainnya',
        component: () => import('@/views/pages/AddKandidatLainnya.vue'),
      },
      {
        path: '/pages/UpdateKandidatLainnya/:id',
        name: 'UpdateKandidatLainnya',
        component: () => import('@/views/pages/UpdateKandidatLainnya.vue'),
      },
      {
        path: '/pages/ListRiwayatSpin',
        name: 'ListRiwayatSpin',
        component: () => import('@/views/pages/ListRiwayatSpin.vue'),
      },
      {
        path: '/pages/UndianUtama',
        name: 'UndianUtama',
        component: () => import('@/views/pages/UndianUtama.vue'),
      },
      {
        path: '/pages/UndianUmum',
        name: 'UndianUmum',
        component: () => import('@/views/pages/UndianUmum.vue'),
      },
      {
        path: '/pages/UndianLainnya',
        name: 'UndianLainnya',
        component: () => import('@/views/pages/UndianLainnya.vue'),
      },


      // {
      //   path: '/theme',
      //   name: 'Theme',
      //   redirect: '/theme/typography',
      // },
      // {
      //   path: '/theme/colors',
      //   name: 'Colors',
      //   component: () => import('@/views/theme/Colors.vue'),
      // },
      // {
      //   path: '/theme/typography',
      //   name: 'Typography',
      //   component: () => import('@/views/theme/Typography.vue'),
      // },
      // {
      //   path: '/base',
      //   name: 'Base',
      //   component: {
      //     render() {
      //       return h(resolveComponent('router-view'))
      //     },
      //   },
      //   redirect: '/base/breadcrumbs',
      //   children: [
      //     {
      //       path: '/base/accordion',
      //       name: 'Accordion',
      //       component: () => import('@/views/base/Accordion.vue'),
      //     },
      //     {
      //       path: '/base/breadcrumbs',
      //       name: 'Breadcrumbs',
      //       component: () => import('@/views/base/Breadcrumbs.vue'),
      //     },
      //     {
      //       path: '/base/cards',
      //       name: 'Cards',
      //       component: () => import('@/views/base/Cards.vue'),
      //     },
      //     {
      //       path: '/base/carousels',
      //       name: 'Carousels',
      //       component: () => import('@/views/base/Carousels.vue'),
      //     },
      //     {
      //       path: '/base/collapses',
      //       name: 'Collapses',
      //       component: () => import('@/views/base/Collapses.vue'),
      //     },
      //     {
      //       path: '/base/list-groups',
      //       name: 'List Groups',
      //       component: () => import('@/views/base/ListGroups.vue'),
      //     },
      //     {
      //       path: '/base/navs',
      //       name: 'Navs',
      //       component: () => import('@/views/base/Navs.vue'),
      //     },
      //     {
      //       path: '/base/paginations',
      //       name: 'Paginations',
      //       component: () => import('@/views/base/Paginations.vue'),
      //     },
      //     {
      //       path: '/base/placeholders',
      //       name: 'Placeholders',
      //       component: () => import('@/views/base/Placeholders.vue'),
      //     },
      //     {
      //       path: '/base/popovers',
      //       name: 'Popovers',
      //       component: () => import('@/views/base/Popovers.vue'),
      //     },
      //     {
      //       path: '/base/progress',
      //       name: 'Progress',
      //       component: () => import('@/views/base/Progress.vue'),
      //     },
      //     {
      //       path: '/base/spinners',
      //       name: 'Spinners',
      //       component: () => import('@/views/base/Spinners.vue'),
      //     },
      //     {
      //       path: '/base/tables',
      //       name: 'Tables',
      //       component: () => import('@/views/base/Tables.vue'),
      //     },
      //     {
      //       path: '/base/tabs',
      //       name: 'Tabs',
      //       component: () => import('@/views/base/Tabs.vue'),
      //     },
      //     {
      //       path: '/base/tooltips',
      //       name: 'Tooltips',
      //       component: () => import('@/views/base/Tooltips.vue'),
      //     },
      //   ],
      // },
      // {
      //   path: '/buttons',
      //   name: 'Buttons',
      //   component: {
      //     render() {
      //       return h(resolveComponent('router-view'))
      //     },
      //   },
      //   redirect: '/buttons/standard-buttons',
      //   children: [
      //     {
      //       path: '/buttons/standard-buttons',
      //       name: 'Buttons',
      //       component: () => import('@/views/buttons/Buttons.vue'),
      //     },
      //     {
      //       path: '/buttons/dropdowns',
      //       name: 'Dropdowns',
      //       component: () => import('@/views/buttons/Dropdowns.vue'),
      //     },
      //     {
      //       path: '/buttons/button-groups',
      //       name: 'Button Groups',
      //       component: () => import('@/views/buttons/ButtonGroups.vue'),
      //     },
      //   ],
      // },
      // {
      //   path: '/forms',
      //   name: 'Forms',
      //   component: {
      //     render() {
      //       return h(resolveComponent('router-view'))
      //     },
      //   },
      //   redirect: '/forms/form-control',
      //   children: [
      //     {
      //       path: '/forms/form-control',
      //       name: 'Form Control',
      //       component: () => import('@/views/forms/FormControl.vue'),
      //     },
      //     {
      //       path: '/forms/select',
      //       name: 'Select',
      //       component: () => import('@/views/forms/Select.vue'),
      //     },
      //     {
      //       path: '/forms/checks-radios',
      //       name: 'Checks & Radios',
      //       component: () => import('@/views/forms/ChecksRadios.vue'),
      //     },
      //     {
      //       path: '/forms/range',
      //       name: 'Range',
      //       component: () => import('@/views/forms/Range.vue'),
      //     },
      //     {
      //       path: '/forms/input-group',
      //       name: 'Input Group',
      //       component: () => import('@/views/forms/InputGroup.vue'),
      //     },
      //     {
      //       path: '/forms/floating-labels',
      //       name: 'Floating Labels',
      //       component: () => import('@/views/forms/FloatingLabels.vue'),
      //     },
      //     {
      //       path: '/forms/layout',
      //       name: 'Layout',
      //       component: () => import('@/views/forms/Layout.vue'),
      //     },
      //     {
      //       path: '/forms/validation',
      //       name: 'Validation',
      //       component: () => import('@/views/forms/Validation.vue'),
      //     },
      //   ],
      // },
      // {
      //   path: '/charts',
      //   name: 'Charts',
      //   component: () => import('@/views/charts/Charts.vue'),
      // },
      // {
      //   path: '/icons',
      //   name: 'Icons',
      //   component: {
      //     render() {
      //       return h(resolveComponent('router-view'))
      //     },
      //   },
      //   redirect: '/icons/coreui-icons',
      //   children: [
      //     {
      //       path: '/icons/coreui-icons',
      //       name: 'CoreUI Icons',
      //       component: () => import('@/views/icons/CoreUIIcons.vue'),
      //     },
      //     {
      //       path: '/icons/brands',
      //       name: 'Brands',
      //       component: () => import('@/views/icons/Brands.vue'),
      //     },
      //     {
      //       path: '/icons/flags',
      //       name: 'Flags',
      //       component: () => import('@/views/icons/Flags.vue'),
      //     },
      //   ],
      // },
      // {
      //   path: '/notifications',
      //   name: 'Notifications',
      //   component: {
      //     render() {
      //       return h(resolveComponent('router-view'))
      //     },
      //   },
      //   redirect: '/notifications/alerts',
      //   children: [
      //     {
      //       path: '/notifications/alerts',
      //       name: 'Alerts',
      //       component: () => import('@/views/notifications/Alerts.vue'),
      //     },
      //     {
      //       path: '/notifications/badges',
      //       name: 'Badges',
      //       component: () => import('@/views/notifications/Badges.vue'),
      //     },
      //     {
      //       path: '/notifications/modals',
      //       name: 'Modals',
      //       component: () => import('@/views/notifications/Modals.vue'),
      //     },
      //     {
      //       path: '/notifications/toasts',
      //       name: 'Toasts',
      //       component: () => import('@/views/notifications/Toasts.vue'),
      //     },
      //   ],
      // },
      // {
      //   path: '/widgets',
      //   name: 'Widgets',
      //   component: () => import('@/views/widgets/Widgets.vue'),
      // },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      // {
      //   path: '404',
      //   name: 'Page404',
      //   component: () => import('@/views/pages/Page404'),
      // },
      // {
      //   path: '500',
      //   name: 'Page500',
      //   component: () => import('@/views/pages/Page500'),
      // },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      // {
      //   path: 'register',
      //   name: 'Register',
      //   component: () => import('@/views/pages/Register'),
      // },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.name !== 'Login' && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router

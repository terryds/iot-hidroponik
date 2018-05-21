import HomePage from './pages/home.vue';
import AboutPage from './pages/about.vue';
import DevicePage from './pages/device.vue';
import FormPage from './pages/form.vue';
import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';

import PanelLeftPage from './pages/panel-left.vue';
import PanelRightPage from './pages/panel-right.vue';

export default [
  {
    path: '/',
    async(routeTo, routeFrom, resolve, reject) {
      if(this.app.methods.userIsLoggedIn()) {
          resolve({
            component: HomePage,
          });
      }
      else {
        resolve({
          component: NotFoundPage,
        });
      }
    }
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage,
  },
  {
    path: '/panel-right/',
    component: PanelRightPage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/device/:id',
    component: DevicePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/animals',
    name: 'Animals',
    component: () =>
      import(/* webpackChunkName: "animals" */ '../views/Animals/Animals.vue'),
  },
  {
    path: '/services',
    name: 'Services',
    component: () =>
      import(
        /* webpackChunkName: "services" */ '../views/Services/Services.vue'
      ),
  },
  {
    path: '/products',
    name: 'Products',
    component: () =>
      import(
        /* webpackChunkName: "products" */ '../views/Products/Products.vue'
      ),
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: () =>
      import(
        /* webpackChunkName: "transactions" */ '../views/Transactions/Transactions.vue'
      ),
  },
  {
    path: '/medicines',
    name: 'Medicines',
    component: () =>
      import(
        /* webpackChunkName: "medicines" */ '../views/Medicines/Medicines.vue'
      ),
  },
  {
    path: '/partnerClinics',
    name: 'PartnerClinics',
    component: () =>
      import(
        /* webpackChunkName: "partnerClinics" */ '../views/PartnerClinics/PartnerClinics.vue'
      ),
  },
  {
    path: '/adoptions',
    name: 'Adoptions',
    component: () =>
      import(
        /* webpackChunkName: "adoptions" */ '../views/Adoptions/Adoptions.vue'
      ),
  },
  {
    path: '/voluntaries',
    name: 'Volunteers',
    component: () =>
      import(
        /* webpackChunkName: "voluntaries" */ '../views/Voluntaries/Voluntaries.vue'
      ),
  },
  {
    path: '/helpCases',
    name: 'HelpCases',
    component: () =>
      import(
        /* webpackChunkName: "helpCases" */ '../views/HelpCases/HelpCases.vue'
      ),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

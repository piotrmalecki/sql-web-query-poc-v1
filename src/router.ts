import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Products from './views/Products.vue'
import Orders from './views/Orders.vue'
import OrderDetails from './views/OrderDetails.vue'
import NotFound from './views/NotFound.vue'


const routes: RouteRecordRaw[] = [
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/order-details',
    name: 'OrderDetails',
    component: OrderDetails
  },

   {
     path: "/:catchAll(.*)",
     name: 'NotFound',
     component: NotFound
   }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

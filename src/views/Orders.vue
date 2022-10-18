<template>
  <div class="py-4">
    <div class="space-y-12">
      <div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
        <h2 class="text-3xl font-extrabold dark:text-white tracking-tight sm:text-4xl">Orders</h2>
      </div>

      <div class="relative min-h-24">

        <AppQuery :predefinedQueries="predefinedQueries" @mockQueryResult="mockQueryResult" />
          
        <div
          class="absolute w-full text-center top-0 z-20 transform duration-200 pointer-events-none"
          :class="[!loading ? '-translate-y-16 opacity-0' : 'translate-y-2 opacity-100']"
        >
          <div
            class="px-8 py-4 bg-gray-200 dark:bg-white/20 backdrop-filter backdrop-blur-sm inline-flex text-lg dark:text-white font-bold rounded-xl"
          >
            Loading...
          </div>
        </div>
        <ul role="list" class="space-y-4 pt-6">
          <transition-group name="list">
            <li v-for="order in orders" :key="order.orderID" class="relative">
              <a
                href="#"
                @click.prevent="view(order)"
                class="py-5 px-6 rounded-lg relative block sm:grid sm:grid-cols-12 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-800/80 dark:text-white"
              >
                <div class="col-span-1">
                  <UILabel>Id</UILabel>
                  <div class="text-lg font-bold uppercase">{{ order.orderID }}</div>
                </div>
                <div class="col-span-2">
                  <UILabel>customer ID</UILabel>
                  <div class="text-lg font-bold">{{ order.customerID }}</div>
                </div>
                <div class="col-span-2">
                  <UILabel>ship Name</UILabel>
                  <div class="text-lg">{{ order.shipName }}</div>
                </div>
                <div class="col-span-2">
                  <UILabel>order Date</UILabel>
                  <div class="text-lg">{{ order.orderDate.substring(0,10) }}</div>
                </div>
                <div class="col-span-2">
                  <UILabel>required Date</UILabel>
                  <div class="truncate overflow-ellipsis">
                    {{ order.requiredDate.substring(0,10) }}
                  </div>
                </div>
                <div class="col-span-2">
                  <UILabel>shipped Date</UILabel>
                  <div class="text-lg">{{ order.shippedDate.substring(0,10) }}</div>
                </div>
                <div class="col-span-1">
                  <UILabel>ship Via</UILabel>
                  <div class="text-lg">{{ order.shipVia }}</div>
                </div>
               
                <ArrowIcon/>
              </a>
            </li>
          </transition-group>
        </ul>
        <div class="py-4" ref="loadMoreButton" v-if="orders.length < total">
          <UIButton  :loading="loadMoreLoading">Loading...</UIButton>
        </div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <AppModal ref="appModal" :selectedOrder="selectedOrder"/>
  </teleport>
</template>
<script lang="ts" setup>
import { Order } from '../interfaces/Orders'
import { useElementVisibility } from '@vueuse/core'
import { ref, watch } from 'vue'
import useHttpRequest from '../composables/useHttpRequest'
import { useContentService } from '../services/ContentService'

const ContentService = useContentService()

const page = ref(1)
const pageSize = ref(15)
const total = ref(0)

const appModal = ref()
const orders = ref<Order[]>([])
const selectedOrder = ref<Order>()
const loadMoreButton = ref()
const targetIsVisible = useElementVisibility(loadMoreButton)
const loadMoreLoading = ref(false)

watch(targetIsVisible, (isVisible) => {
 if(isVisible) {
  setTimeout(() => {
      loadMore()

  }, 150);
 }
})

const predefinedQueries= ref([
"SELECT FROM Orders WHERE Freight > 10",
"UPDATE Orders SET ShipName='New York' WHERE Id = 10248",
"SELECT FROM Orders WHERE ShipCity LIKE '%York%'",
"DELETE FROM Orders WHERE ShipVia = 15"
]);

const { loading, error, request } = useHttpRequest({
  request: ContentService.getAllOrders(page.value, pageSize.value)
})

request.then((data) => {
  total.value = ContentService.getAllOrdersNumber()
  orders.value = data
})

const loadMore = async () => {
  page.value++
  loadMoreLoading.value = true;
  const { request, loading } = useHttpRequest({
    request: ContentService.getAllOrders(page.value, pageSize.value)
  })

  await request.then((data) => {
    total.value = ContentService.getAllOrdersNumber()
    orders.value = orders.value.concat(data)
  })
  loadMoreLoading.value = false
}

const mockQueryResult = async () =>{
  orders.value = orders.value.sort(() => .5 - Math.random()).slice(0,pageSize.value)
}


const view = (details: Order) => {
  selectedOrder.value = details
  console.log(selectedOrder.value)
  appModal.value.detailsModal.open()
}
</script>

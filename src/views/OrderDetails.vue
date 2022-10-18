<template>
  <div class="py-4">
    <div class="space-y-12">
      <div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
        <h2 class="text-3xl font-extrabold dark:text-white tracking-tight sm:text-4xl">Orders Details</h2>
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
            <li v-for="order in orders" :key="order.orderID + order.productID" class="relative">
              <a
                class="py-5 px-6 rounded-lg relative block sm:grid sm:grid-cols-12 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-800/80 dark:text-white"
              >
                <div class="col-span-3">
                  <UILabel>Id</UILabel>
                  <div class="text-lg font-bold uppercase">{{ order.orderID }}</div>
                </div>
                <div class="col-span-2">
                  <UILabel>discount</UILabel>
                  <div class="text-lg font-bold">{{ order.discount }}</div>
                </div>
                <div class="col-span-2">
                  <UILabel>productID</UILabel>
                  <div class="text-lg">{{ order.productID }}</div>
                </div>
                <div class="col-span-2">
                  <UILabel>quantity</UILabel>
                  <div class="text-lg">{{ order.quantity }}</div>
                </div>
                <div class="col-span-2">
                  <UILabel>unit Price</UILabel>
                  <div class="truncate overflow-ellipsis">
                    {{ order.unitPrice }}
                  </div>
                </div>
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
</template>
<script lang="ts" setup>
import { OrderDetails } from '../interfaces/OrderDetails'
import { useElementVisibility } from '@vueuse/core'
import { ref, watch } from 'vue'
import useHttpRequest from '../composables/useHttpRequest'
import { useContentService } from '../services/ContentService'

const ContentService = useContentService()

const page = ref(1)
const pageSize = ref(15)
const total = ref(0)

const orders = ref<OrderDetails[]>([])
const selectedOrder = ref<OrderDetails>()
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
"SELECT FROM OrderDetails WHERE Discount < 10",
"UPDATE OrderDetails SET Quantinty=10 WHERE Id = 10248",
"SELECT FROM OrderDetails WHERE UnitPrice = 10",
"DELETE FROM OrderDetails WHERE ProductID = 15"
]);

const { loading, error, request } = useHttpRequest({
  request: ContentService.getAllOrderDetails(page.value, pageSize.value)
})

request.then((data) => {
  total.value = ContentService.getAllOrderDetailsNumber()
  orders.value = data
})

const loadMore = async () => {
  page.value++
  loadMoreLoading.value = true;
  const { request, loading } = useHttpRequest({
    request: ContentService.getAllOrderDetails(page.value, pageSize.value)
  })

  await request.then((data) => {
    total.value = ContentService.getAllOrderDetailsNumber()
    orders.value = orders.value.concat(data)
  })
  loadMoreLoading.value = false
}

const mockQueryResult = async () =>{
  orders.value = orders.value.sort(() => .5 - Math.random()).slice(0,pageSize.value)
}

</script>

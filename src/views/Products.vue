<template>
    <div class="py-4">
      <div class="space-y-12">
        <div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
          <h2 class="text-3xl font-extrabold dark:text-white tracking-tight sm:text-4xl">Products</h2>
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
              <li v-for="product in products" :key="product.productID" class="relative">
                <a
                  href="#"
                  @click.prevent="view(product)"
                  class="py-5 px-6 rounded-lg relative block sm:grid sm:grid-cols-12 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-800/80 dark:text-white"
                >
                  <div class="col-span-1">
                    <UILabel>Id</UILabel>
                    <div class="text-lg font-bold uppercase">{{ product.productID }}</div>
                  </div>
                  <div class="col-span-2">
                    <UILabel>Name</UILabel>
                    <div class="text-lg font-bold">{{ product.productName }}</div>
                  </div>
                  <div class="col-span-2">
                    <UILabel>Supplier ID</UILabel>
                    <div class="text-lg">{{ product.supplierID }}</div>
                  </div>
                  <div class="col-span-2">
                    <UILabel>Category ID</UILabel>
                    <div class="text-lg">{{ product.categoryID }}</div>
                  </div>
                  <div class="col-span-2">
                    <UILabel>Quantity</UILabel>
                    <div class="truncate overflow-ellipsis">
                      {{ product.quantityPerUnit }}
                    </div>
                  </div>
                  <div class="col-span-2">
                    <UILabel>Unit Price</UILabel>
                    <div class="text-lg">{{ product.unitPrice }}</div>
                  </div>
                  <div class="col-span-1">
                    <UILabel>InStock</UILabel>
                    <div class="text-lg">{{ product.unitsInStock }}</div>
                  </div>
                 
                  <ArrowIcon/>
                </a>
              </li>
            </transition-group>
          </ul>
          <div class="py-4" ref="loadMoreButton" v-if="products.length < total">
            <UIButton  :loading="loadMoreLoading">Loading...</UIButton>
          </div>
        </div>
      </div>
    </div>
    <teleport to="body">
      <AppModal ref="appModal" :selectedProduct="selectedProduct"/>
    </teleport>
  </template>
  <script lang="ts" setup>
  import { Product } from '../interfaces/Products'
  import { useElementVisibility } from '@vueuse/core'
  import { ref, watch } from 'vue'
  import useHttpRequest from '../composables/useHttpRequest'
  import { useContentService } from '../services/ContentService'
  
  const ContentService = useContentService()

  const page = ref(1)
  const pageSize = ref(15)
  const total = ref(0)
  
  const appModal = ref()
  const products = ref<Product[]>([])
  const selectedProduct = ref<Product>()
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
  "SELECT FROM Products WHERE UnitPrice > 10",
  "UPDATE Products SET Name='Chang' WHERE Id = 53",
  "SELECT FROM Products WHERE Quantity LIKE '%bottles%'",
  "DELETE FROM Products WHERE CategoryId = 15"
]);

  const { loading, error, request } = useHttpRequest({
    request: ContentService.getAllProducts(page.value, pageSize.value)
  })
  
  request.then((data) => {
    total.value = ContentService.getAllProductsNumber()
    products.value = data
  })
  
  const loadMore = async () => {
    page.value++
    loadMoreLoading.value = true;
    const { request, loading } = useHttpRequest({
      request: ContentService.getAllProducts(page.value, pageSize.value)
    })
  
    await request.then((data) => {
      total.value = ContentService.getAllProductsNumber()
      products.value = products.value.concat(data)
    })
    loadMoreLoading.value = false
  }

  const mockQueryResult = async () =>{
    products.value = products.value.sort(() => .5 - Math.random()).slice(0,pageSize.value)
  }
  

  const view = (details: Product) => {
    selectedProduct.value = details
    appModal.value.detailsModal.open()
  }
  </script>
  
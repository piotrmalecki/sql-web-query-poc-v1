<template>
      <UIModal ref="detailsModal">
        <div v-if="product">
        <div class="font-bold text-2xl mb-6 dark:text-white">{{ product?.productName }}</div>
        <div class="grid grid-cols-12 dark:text-white text-sm gap-x-4 gap-y-6 mb-4">
          <div class="col-span-2">
            <UILabel>Id</UILabel>
            <div class="text-base font-bold uppercase">{{ product?.productID }}</div>
          </div>
          <div class="col-span-3">
            <UILabel>SupplierID</UILabel>
            <div class="text-base">{{ product?.supplierID }}</div>
          </div>
          <div class="col-span-3">
            <UILabel>CategoryID</UILabel>
            <div class="text-base">{{ product?.categoryID }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>Quantity Per Unit</UILabel>
            <div class="text-base">{{ product?.quantityPerUnit }}</div>
          </div>
          <div class="col-span-3">
            <UILabel>unit Price</UILabel>
            <div class="text-base">{{ product?.unitPrice }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>Units In Stock</UILabel>
            <div class="text-base">{{ product?.unitsInStock }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>units On Order</UILabel>
            <div class="text-base">{{ product?.unitsOnOrder }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>reorder Level</UILabel>
            <div class="text-base flex items-center">{{ product?.reorderLevel }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>discontinued</UILabel>
            <div class="text-base flex items-center">{{ product?.discontinued }}</div>
          </div>
        </div>
        </div>
        <div v-if="order">
        <div class="font-bold text-2xl mb-6 dark:text-white">{{ order?.customerID }}</div>
        <div class="grid grid-cols-12 dark:text-white text-sm gap-x-4 gap-y-6 mb-4">
          <div class="col-span-2">
            <UILabel>Id</UILabel>
            <div class="text-base font-bold uppercase">{{ order?.orderID }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>employeeID</UILabel>
            <div class="text-base">{{ order?.employeeID }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>required Date</UILabel>
            <div class="text-base">{{ order?.requiredDate.substring(0,10) }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>order Date</UILabel>
            <div class="text-base">{{ order?.orderDate.substring(0,10) }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>shipped Date</UILabel>
            <div class="text-base">{{ order?.shippedDate.substring(0,10) }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>Ship Via</UILabel>
            <div class="text-base">{{ order?.shipVia }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>freight</UILabel>
            <div class="text-base">{{ order?.freight }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>ship Name</UILabel>
            <div class="text-base flex items-center">{{ order?.shipName }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>ship Address</UILabel>
            <div class="text-base flex items-center">{{ order?.shipAddress }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>ship City</UILabel>
            <div class="text-base flex items-center">{{ order?.shipCity }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>ship Region</UILabel>
            <div class="text-base flex items-center">{{ order?.shipRegion }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>ship Postal Code</UILabel>
            <div class="text-base flex items-center">{{ order?.shipPostalCode }}</div>
          </div>
          <div class="col-span-4">
            <UILabel>ship Country</UILabel>
            <div class="text-base flex items-center">{{ order?.shipCountry }}</div>
          </div>
        </div>
        </div>
        <UIButton @click="detailsModal.close()">Close</UIButton>
      </UIModal>
</template>

<script lang="ts" setup>
import { PropType, ref, computed, onMounted } from 'vue';
import { Product } from '../interfaces/Products';
import { Order } from '../interfaces/Orders';

const props = defineProps({
    selectedProduct: Object as PropType<Product>,
    selectedOrder:  Object as PropType<Order>
})

const product = computed(() => {return props.selectedProduct})
const order = computed(() => {return props.selectedOrder})

const detailsModal = ref()

defineExpose({ detailsModal })
</script>
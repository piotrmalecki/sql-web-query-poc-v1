<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, } from 'vue-router'
const router = useRouter()


onMounted(() => {
  router.push({ name: 'Products'})

})

</script>

<template>
    <AppContainer>
    <AppNavbar />
    <div class="py-8">
      <router-view />
    </div>
  </AppContainer>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

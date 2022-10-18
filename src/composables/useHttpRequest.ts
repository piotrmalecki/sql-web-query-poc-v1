import { readonly, ref } from 'vue'

export interface HttpCallOptions<T> {
  request: Promise<T>
}

export default function useHttpRequest<T>(options: HttpCallOptions<T>) {
  const loading = ref(true)
  const error = ref(null)
  // const promise = ref()

  loading.value = true

  
    options.request
      .then(() => {
        setTimeout(() =>
         { loading.value = false }, 
        500);
      })
      .catch((e) => {
        error.value = e
        loading.value = false
      })
   

  return {
    loading,
    error,
    request: options.request
  }
}

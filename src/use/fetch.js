import {ref} from 'vue'

export function useFetch(url, options) {
  const response = ref()

  const request = async () => {
    const res = await fetch(url, options)
    response.value = await res.json()
  }

  return {response, request}
}
import {ref} from 'vue'
import {useFetch} from './fetch'

export async function useUsers() {
  const loaded = ref(false)
  const {response: users, request} = useFetch('https://jsonplaceholder.typicode.com/users')

  if (!loaded.value) {
    await request()
    loaded.value = true
  }

  return {users}
}
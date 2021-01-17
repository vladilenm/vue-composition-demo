import {computed, reactive} from 'vue'
import {useField} from './field'

export function useForm(init = {}) {
  const form = reactive({})
  const validKey = 'valid'

  for (const [key, value] of Object.entries(init)) {
    form[key] = useField(value)
  }

  const withoutValid = k => k !== validKey

  form[validKey] = computed(() => {
    return Object.keys(form).filter(withoutValid).reduce((acc, k) => {
      if (acc === false) {
        return acc
      }

      acc = form[k].valid
      return acc
    }, true)
  })

  return form
}


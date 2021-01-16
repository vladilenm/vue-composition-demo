<template>
  <div class="container">
    <form class="card" @submit.prevent="submit">
      <h1>Auth</h1>

      <h3 v-if="error">{{error}}</h3>

      <div class="form-control" :class="{invalid: !form.email.valid && form.email.touched}">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email.value" @blur="form.email.blur">
        <small v-if="form.email.touched && form.email.errors.required">Email field is required</small>
      </div>

      <div class="form-control" :class="{invalid: !form.password.valid && form.password.touched}">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password.value" @blur="form.password.blur">
        <small v-if="form.password.touched && form.password.errors.required">Password field is required</small>
        <small v-else-if="form.password.touched && form.password.errors.minLength">
          Password length can't be less then 8. Now it is {{form.password.value.length}}.
        </small>
      </div>

      <button class="btn primary" type="submit" :disabled="!form.valid">Submit</button>
    </form>

    <Suspense v-if="submitted">
      <UsersList />
      <template #fallback>
        <div class="loader"></div>
      </template>
    </Suspense>
  </div>

</template>

<script>
import {ref, onErrorCaptured} from 'vue'
import UsersList from './components/UsersList'
import {useForm} from './use/form'

const required = val => !!val
const minLength = num => val => val.length >= num

export default {
  setup() {
    const submitted = ref(false)
    const error = ref()
    const form = useForm({
      email: {
        value: '',
        validators: {required}
      },
      password: {
        value: '',
        validators: {required, minLength: minLength(8)}
      }
    })

    function submit() {
      console.log('Email:', form.email.value)
      console.log('Password:', form.password.value)
      submitted.value = true
    }

    onErrorCaptured(e => {
      error.value = e.message
    })

    return {form, submit, submitted, error}
  },
  components: {UsersList}
}
</script>


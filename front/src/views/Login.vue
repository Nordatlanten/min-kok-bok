<template>
  <div>
    <h1>Vänligen logga in</h1>
    <LoginForm />
    <router-link to="/register">Har du inget konto?</router-link>
  </div>
</template>
<script>
import LoginForm from '../components/LoginForm'
export default {
  components: {
    LoginForm
  }
}
</script>

<style lang="scss" scoped></style>

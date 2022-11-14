<template>
  <div>
    <form method="post" @submit.prevent="login">
    <p v-if="errors.length">
       <b>Var vänlig åtgärda följande:</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
    </p>
      <p>
        <input type="text" v-model="username" placeholder="Användarnamn" />
      </p>
      <p><input type="password" v-model="password" placeholder="Lösenord" /></p>
      <p><button type="submit">Skicka</button></p>
    </form>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      username: null,
      password: null,
      errors: []
    }
  },
  methods: {
    login: function () {
      this.errors = []
      const { username, password } = this
      if (!username) this.errors.push('Användarnamn behövs.')
      if (!password) this.errors.push('Lösenord behövs.')
      if (!this.errors.length) {
        this.$store.dispatch('login', { username, password }).then(() => {
          console.log('hello')
        })
      }
    },
    logout: function () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login')
      })
    },
    checkForm: function (e) {
      {
        try {
          fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password
            })
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
        } catch (error) {
          console.error(error)
        }
      }
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
<template>
  <div>
    <form @submit="checkForm">
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
      <p>
        <input
          type="password"
          v-model="repeatPassword"
          placeholder="Repetera lösenord"
        />
      </p>
      <p><input type="text" v-model="email" placeholder="E-postadress" /></p>
      <p><input type="submit" value="Skicka" /></p>
    </form>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      username: null,
      password: null,
      repeatPassword: null,
      email: null,
      errors: []
    }
  },
  methods: {
    checkForm: function (e) {
      const { username, password, repeatPassword, email } = this
      this.errors = []

      if (!username) this.errors.push('Användarnamn behövs.')
      if (!password) this.errors.push('Lösenord behövs.')
      if (!repeatPassword) this.errors.push('Repetera lösenord tack.')
      if (!email) this.errors.push('E-postadress behövs.')
      if (password != repeatPassword)
        this.errors.push('Inmatade lösenord stämmer ej överens.')

      if (!this.errors.length) {
        try {
          this.$store
            .dispatch('registerUser', { username, password, email })
            .then(() => {
              this.$router.push('/registercomplete')
            })
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
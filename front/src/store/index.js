import { createStore } from 'vuex'

export default createStore({
  state: { token: '' },
  mutations: {},
  actions: {
    registerUser(state, data) {
      console.log('hej' + data)
      fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          email: data.email
        })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Registered username: ' + data.username)
        })
    },

    login(state, data) {
      console.log(data)

      try {
        fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password
          })
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)

            let isAdmin = data.admin
            localStorage.setItem('user', JSON.stringify(data.name))
            localStorage.setItem('admin', JSON.stringify(data.admin))
            localStorage.setItem('jwt', data.accessToken)

            if (localStorage.getItem('jwt') != null) {
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl)
              } else {
                if (isAdmin == 1) {
                  this.$router.push('/admin')
                } else {
                  this.$router.push('/about')
                }
              }
            }
          })
      } catch (error) {
        console.error(error)
      }
    },
    logout(state) {
      try {
        fetch('http://localhost:3000/auth/logout', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: state.token
          })
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {}
})

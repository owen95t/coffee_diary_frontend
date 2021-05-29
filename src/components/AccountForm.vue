<template>
<!--  <div class="login-form">-->
<!--    <form action="/examples/actions/confirmation.php" method="post">-->
<!--      <h2 class="text-center">Log in</h2>-->
<!--      <div class="form-group">-->
<!--        <input type="text" class="form-control" placeholder="Username" required="required">-->
<!--      </div>-->
<!--      <div class="form-group">-->
<!--        <input type="password" class="form-control" placeholder="Password" required="required">-->
<!--      </div>-->
<!--      <div class="form-group">-->
<!--        <button type="submit" class="btn btn-primary btn-block">Log in</button>-->
<!--      </div>-->
<!--      <div class="clearfix">-->
<!--        <label class="float-left form-check-label"><input type="checkbox"> Remember me</label>-->
<!--        <a href="#" class="float-right">Forgot Password?</a>-->
<!--      </div>-->
<!--    </form>-->
<!--    <p class="text-center"><a href="#">Create an Account</a></p>-->
<!--  </div>-->
  <div class="form-wrapper">
    <div class="account-form">
      <b-form>
        <h2 class="text-center">{{title}}</h2>
        <b-form-group>
          <b-form-input type="text" class="form-control" placeholder="Username" required></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="password" class="form-control" placeholder="Password" required></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-button variant="primary" class="btn-block">{{ buttonText }}</b-button>
        </b-form-group>
      </b-form>
  <!--    <p class="text-center"><router-link to="/register"/>Register</p>-->
      <router-link v-show="isLogin" class="text-center" to="/register">Create an account</router-link>
      <router-link v-show="isRegister" class="text-center" to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountForm",
  props: {
    isLogin: Boolean,
    isRegister: Boolean
  },
  data(){
    return{
      header: '',
      buttonText: '',

    }
  },
  methods: {
    check() {
      if (this.isRegister) {
        this.header = 'REGISTER'
        this.buttonText = 'REGISTER'
      }else if (this.isLogin) {
        this.header = 'LOG IN'
        this.buttonText = 'LOG IN'
      }
    },
  },
  mounted() {
    this.check()
  }
}
</script>

<style scoped>
.form-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
.account-form {
  width: 340px;
  margin: auto;
  font-size: 1rem;
}
.account-form form {
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.login-form h2 {
  margin: 0 0 15px;
}
.form-control, .btn {
  min-height: .5rem;
  border-radius: 10px;
}
.btn {
  font-size: 15px;
  font-weight: bold;
}
</style>
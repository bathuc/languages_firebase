<template>
  <div class="login-wrapper bg-img">
      <form id="frmForm" v-on:submit.prevent="doLogin">
          <div class="login-box">
              <div class="login-row form-group row">
                  <label class="col-md-3"></label>
                  <div class="col-md-9">
                      <h4 class="text-success">Languages Login</h4>
                  </div>
              </div>

              <div class="login-row form-group row">
                  <label class="col-md-3">Email</label>
                  <div class="col-md-9">
                      <input v-model="email" type="text" class="form-control" placeholder="">
                  </div>
              </div>

              <div class="login-row form-group row">
                  <label class="col-md-3">Password</label>
                  <div class="col-md-9">
                      <input v-model="password" type="password" class="form-control" placeholder="">
                  </div>
              </div>

              <div class="row">
                  <label class="col-md-3"></label>
                  <div class="col-md-9">
                      <p class="text-danger"> {{ message}}</p>
                  </div>
              </div>
              <Loading :showLoading="this.showLoading" />

              <div class="login-row form-group row">
                  <label class="col-md-3 text-success"></label>
                  <div class="col-md-9">
                      <button type="button" class="btn-submit" @click="doLogin">Login</button>
                  </div>
              </div>
          </div>
      </form>
  </div>
</template>

<script>
    const firebase = require('@/app/config/firebase');
    import admin from '@/app/models/admin';
    import helpers from "@/app/helpers/helpers";

    import Loading from '@/components/Loading';

    export default {
      components: {
          Loading,
      },
      data(){
          return {
              email: '',
              password: '',
              message: '',
              showLoading:false,
          }
      },
      methods:{
          async doLogin(){
              this.message = '';
              this.showLoading = true;
              try{
                  const userCredential = await firebase.auth.signInWithEmailAndPassword(this.email, this.password);
                  const user = await admin.getDataByEmail(userCredential.user.email)
                  console.log('update user', user);
                  const isEmptyAccountInfo = helpers.isEmptyObject(user);
                  if(!isEmptyAccountInfo){
                      var updated ={
                          expire_at: helpers.getExpireTimestamp(),
                      }
                      await admin.updateFieldsByEmail(userCredential.user.email, updated);
                      console.log('update user');
                      this.$store.commit('addUser', {user});
                  }
                  else{
                      // create admin info
                      var adminInfo ={
                          name: 'admin',
                          email: userCredential.user.email,
                          avail_flg: 1,
                          token: helpers.getToken(),
                          expire_at: helpers.getExpireTimestamp(),
                          created_date: Date.now(),
                      }
                      await admin.saveAdmin(adminInfo);
                      this.$store.commit('addUser', {adminInfo});
                  }
                  this.$router.push('/admin/dashboard');
              }catch (e) {
                  this.message = 'email or password is wrong';
                  this.showLoading = false;
              }

          }
      }
    }
</script>
<style lang="scss">

    .login-wrapper{
        width: 100%;
        height: 100vh;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #frmForm{
        width: 500px;
        padding: 20px 40px;
        background: white;
    }

    .login-row{
        margin-bottom: 15px;
        label {
            font-weight: 600;
        }
    }

    .btn-submit{
        background-color: #ed64a6;
        color: white;
        padding: 6px 12px;
        border-radius: 9999px;
        border: 0px;
        width: 80px;
    }

    .bg-img {
        background-image: url('~static/images/bg.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

</style>

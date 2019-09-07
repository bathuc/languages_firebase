<template>
  <div class="wrapper">
      Dashboard
  </div>
</template>

<script>
    import admin from '@/app/models/admin';
    import helpers from "@/app/helpers/helpers";

    export default {
        async created() {
            let user = await this.$store.state.user;
            let isEmptyUser = helpers.isEmptyObject(user);
            console.log('user 1', user);
            if(!isEmptyUser){
                await admin.refreshToken(user.email);
            }
            this.$store.commit('removeUser');
            this.$router.push('/login');
        },
    }
</script>



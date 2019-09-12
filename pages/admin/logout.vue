<template>
    <div class="wrapper">
        Logout
        <Loading :showLoading="this.showLoading"/>
    </div>
</template>

<script>
    import admin from '@/app/models/admin';
    import helpers from "@/app/helpers/helpers";
    import Loading from '@/components/Loading';

    export default {
        layout: 'admin',
        components: {
            Loading,
        },
        data() {
            return {
                showLoading: true,
            }
        },
        async created() {
            let user = await this.$store.state.user;
            let isEmptyUser = helpers.isEmptyObject(user);
            console.log('user 1', user);
            if (!isEmptyUser) {
                await admin.refreshToken(user.email);
            }
            this.$store.commit('removeUser');
            this.$router.push('/admin/login');
        },
    }
</script>



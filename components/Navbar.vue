<template>
    <div class="navbar-wraper">
        <div class="nav-start">
            <i class="material-icons hamburger-menu" @click="hambugerMenuClick">menu</i>
        </div>
        <div class="nav-end">
            <span>Admin</span>
            <a class="btn btn-light btn-logout" @click="doLogout">Logout</a>
        </div>
        <Loading :showLoading="this.showLoading"/>
    </div>
</template>
<script>
    import admin from '@/app/models/admin';
    import helpers from "@/app/helpers/helpers";
    import Loading from '@/components/Loading';

    export default {
        components: {
            Loading,
        },
        data() {
            return {
                showLoading: false,
            }
        },
        created(){
            // reset to false
            this.$store.commit('utility/setHambugerClick', false)
        },
        methods: {
            async doLogout() {
                this.showLoading = true;
                let user = await this.$store.state.user;
                let isEmptyUser = helpers.isEmptyObject(user);
                if (!isEmptyUser) {
                    await admin.refreshToken(user.email);
                }
                this.$store.commit('removeUser');
                this.$router.push('/admin/login');
            },
            hambugerMenuClick(){
                var click = this.$store.state.utility.hambugerClick;
                this.$store.commit('utility/setHambugerClick', !click)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .navbar-wraper {
        width: 100%;
        height: 60px;
        background-color: white;
        border-bottom: 1px solid #dee2e6;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }

    .nav-end {
        display: flex;
        align-items: center;

        * {
            margin-left: 20px;
        }
    }

    .btn-logout{
        cursor: pointer;
    }

    @media (min-width: 768px) {
        .hamburger-menu{
            display: none;
        }
    }
</style>

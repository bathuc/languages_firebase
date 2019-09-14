<template>
    <div class="frontend-wrapper">
        <div class="header-wraper">
            <div class="header container">
                <h1 class="text-success">languages</h1>
                <div class="image-logo" @click="loginClick">
                    <i class="material-icons user-icon"> account_circle </i>
                </div>
            </div>
        </div>

        <Navbar/>

        <nuxt/>

    </div>
</template>

<script>
    import Navbar from '@/components/frontend/Navbar';

    export default {
        head: {
            bodyAttrs: {
                class: 'front-body'
            }
        },
        components: {
            Navbar,
        },
        methods: {
            loginClick(){
                this.$router.push('/admin/login');
            }
        }
    }

</script>

<style lang="scss" scoped>
    .header-wraper{
        background-color: white;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .user-icon{
        font-size: 2.5rem;
    }
</style>

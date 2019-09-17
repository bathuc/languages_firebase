<template>
    <div class="admin-wrapper">
        <Sidebar/>
        <div class="main-wrapper">
            <Navbar/>

            <nuxt/>

        </div>
    </div>
</template>

<script>
    import Sidebar from '@/components/Sidebar';
    import Navbar from '@/components/Navbar';

    export default {
        middleware: ['authenticated', 'currentRoute'],
        components: {
            Sidebar,
            Navbar,
        }
    }

</script>

<style lang="scss" scoped>
    .admin-wrapper {
        display: flex;
        background-color: #343a40;
    }

    .main-wrapper {
        width: 100%;
        background: #f4f6f9;
    }
</style>

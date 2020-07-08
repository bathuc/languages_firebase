<template>
    <div class="content-wrapper">
        <div class="content-header">
            <h3>Dashboard</h3>
        </div>
        <button type="button" class="btn btn-blue ml-2" @click="newWordClick">New word</button>
    </div>
</template>

<script>

    export default {
        layout: 'admin',
        methods: {
            newWordClick() {
                this.$router.push('/admin/word/new');
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>


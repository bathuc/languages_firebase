<template>
    <div class="content-wrapper">
        <div class="content-header">
            <h4>Subject</h4>
        </div>

        <div class="content-meta">
            <button type="button" class="btn btn-blue" @click="newSubjectClick">New Subject</button>
        </div>
    </div>
</template>

<script>

    export default {
        layout: 'admin',
        methods: {
            newSubjectClick() {
                this.$router.push('/admin/subjects/new');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

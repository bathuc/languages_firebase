<template>
    <div v-bind:class="{hidden : !showLoading}" class="loading">
        <div class="wrap-loader">
            <div class="loader"></div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            showLoading: false
        }
    }
</script>
<style lang="scss" scoped>
    .hidden{
        display: none;
    }
    .loading {
        position: fixed;
        top:0;
        bottom: 0;
        left:0;
        right:0;
        background: rgba($color: #000000, $alpha: 0.6);
        .wrap-loader {
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        .loader {
            border: 10px solid #f3f3f3; /* Light grey */
            border-top: 10px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 80px;
            height: 80px;
            animation: spin 2s linear infinite;
        }
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
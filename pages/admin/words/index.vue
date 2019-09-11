<template>
  <div class="content-wrapper">
    <div class="content-header">
      <h4>Words</h4>
      <div class="form-search-wrapper">
        <span>Find Word</span>
        <input type="text" class="form-control">
        <button type="button" class="btn btn-blue">Find</button>
      </div>
    </div>

    <div class="content-meta">
      <button type="button" class="btn btn-blue" @click="newWordClick">New word</button>
      <button type="button" class="btn btn-blue">Update Sound Link</button>
    </div>
  </div>
</template>

<script>

	export default {
		layout: 'admin',
    methods:{
      newWordClick(){
        this.$router.push('/admin/words/new');
      }
    }
	}
</script>


<style lang="scss" scoped>

</style>

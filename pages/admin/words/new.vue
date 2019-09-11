<template>
  <div class="content-wrapper">

    <div class="content-header">
      <h4>Words New</h4>
    </div>

    <div class="content-meta">
      <span>Create new word</span>
      <button type="button" class="btn btn-blue" @click="backClick">Back</button>
    </div>

    <div class="box">
      <div class="box-title">
        <span>Word Infomation</span>
      </div>

      <div class="form-wrapper w-50">
        <div class="form-group row">
          <label class="col-md-3"></label>
          <div class="col-md-9">
            <span class="text-danger">{{ subjectEmptyMessage }}</span>
          </div>
        </div>

        <div class="form-group row">
            <label class="col-md-3">Subject</label>
            <div class="col-md-9">
              <select class="form-control" v-model="subjectId">
                  <option v-for="item in subjectOption" :value="item.id">{{ item.name_vi }}</option>
              </select>
            </div>
        </div>

        <div class="form-group row">
            <label class="col-md-3">Word</label>
            <div class="col-md-9">
              <input v-model="word" type="text" class="form-control">
              <span class="text-danger">{{ message }}</span>
            </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3"></label>
          <div class="col-md-9">
            <button type="button" class="btn btn-blue" @click="createWordClick">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import subject from '@/app/models/subject';
	import word from '@/app/models/word';
	import helpers from "@/app/helpers/helpers";

	export default {
		layout: 'admin',
      data(){
			  return {
			    message:'',
          subjectEmptyMessage:'',
			    subjectMessage:'',
          word: '',
          subjectId: '',
          subjectOption: [],
        }
      },
      async created(){
			  this.subjectOption = await subject.getSubjectOption();
			  if(helpers.isEmptyObject(this.subjectOption)){
          this.subjectEmptyMessage = 'Create Subject First';
        }
      },
      methods:{
		    backClick(){
			    this.$router.push('/admin/words');
        },
        createWordClick(){
          if(!this.word){
          	this.message = 'Word is required';
          }
          else if(this.word && this.subjectId){
			      this.message = '';
			      console.log('word', this.word);
			      console.log('subjectValue', this.subjectId);
          }
        }
      }
	}
</script>

<style lang="scss" scoped>

</style>

<template>
    <div class="content-wrapper">

        <div class="content-header">
            <h4>Words Edit</h4>
        </div>

        <div class="content-meta">
            <span>Edit word</span>
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
                        <span class="text-danger">{{ subjectMessage }}</span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-3">Word</label>
                    <div class="col-md-9">
                        <input v-model="wordValue" type="text" class="form-control">
                        <span class="text-danger">{{ wordMessage }}</span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-3">Meaning</label>
                    <div class="col-md-9">
                        <input v-model="meaning" type="text" class="form-control">
                        <span class="text-danger">{{ meaningMessage }}</span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-3"></label>
                    <div class="col-md-9">
                        <button type="button" class="btn btn-blue" @click="editWordClick">Edit</button>
                    </div>
                </div>

                <Loading :showLoading="this.showLoading"/>
            </div>
        </div>
    </div>
</template>

<script>
    import subject from '@/app/models/subject';
    import word from '@/app/models/word';
    import helpers from "@/app/helpers/helpers";
    import Loading from '@/components/Loading';

    import Vue from 'vue';
    import Toasted from 'vue-toasted';
    Vue.use(Toasted);

    export default {
        layout: 'admin',
        components: {
            Loading,
        },
        data() {
            return {
                wordId: '',
                subjectEmptyMessage: '',
                subjectMessage: '',
                wordMessage: '',
                meaningMessage: '',
                subjectId: '',
                wordValue: '',
                originalWordValue: '',
                meaning: '',
                subjectOption: [],

                showLoading: false,
            }
        },
        async mounted() {
            this.wordId = this.$route.params.id;
            var wordObject = await word.getWordById(this.wordId);
            if(!wordObject){
                this.$router.push('/admin/word');
            }

            this.wordValue = wordObject.word;
            this.originalWordValue = wordObject.word;
            this.meaning = wordObject.meaning;
            this.subjectId = wordObject.subject_id;
            this.subjectOption = await subject.getSubjectOption();
            console.log('wordObject', wordObject);

            if (helpers.isEmptyObject(this.subjectOption)) {
                this.subjectEmptyMessage = 'Create Subject First';
            }
        },
        methods: {
            backClick() {
                this.$router.push('/admin/word');
            },
            async editWordClick(){
                this.showLoading = true;

                this.subjectMessage = '';
                this.wordMessage = '';
                this.meaningMessage = '';

                var isExitWord = false;
                if (!this.wordValue) {
                    this.wordMessage = 'Word is required';
                } else if(this.wordValue != this.originalWordValue) {
                    isExitWord = await word.isExitWord(this.wordValue);
                    if (isExitWord) {
                        this.wordMessage = 'Word is already exist';
                    }
                }

                console.log('this.wordValue', this.wordValue);
                console.log('this.meaning', this.meaning);
                console.log('this.subjectId', this.subjectId);

                if(this.wordValue === this.originalWordValue){
                    // same word
                    var id = this.wordId;
                    var inputs = {
                        meaning: this.meaning,
                        subject_id: this.subjectId,
                        updated_at: Date.now(),
                    }

                    await word.updateFieldsById(id, inputs);
                    this.showLoading = false;
                    let toast = this.$toasted.show('Update Word successfully.', {
                        theme: "toasted-primary",
                        type: "success",
                        icon: "delete",
                        position: "top-center",
                        duration: 4000
                    });
                }
                else if (this.subjectId && this.wordValue && this.meaning && !isExitWord) {

                    var url = 'https://mylanguagesapi.herokuapp.com/word/' + this.wordValue;
                    var wordObject = await this.$axios.$get(url);
                    if (!wordObject.sound) {
                        this.wordMessage = 'Word not found. Please try other word';
                    } else {
                        var id = this.wordId;
                        var inputs = {
                            word: this.wordValue,
                            meaning: this.meaning,
                            ipa: wordObject.ipa,
                            sound: wordObject.sound,
                            example: wordObject.example,
                            example1: wordObject.example1,
                            subject_id: this.subjectId,
                            updated_at: Date.now(),
                        }

                        await word.updateFieldsById(id, inputs);
                        this.showLoading = false;
                        let toast = this.$toasted.show('Update Word successfully.', {
                            theme: "toasted-primary",
                            type: "success",
                            icon: "delete",
                            position: "top-center",
                            duration: 4000
                        });

                    }
                }

                this.showLoading = false;

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

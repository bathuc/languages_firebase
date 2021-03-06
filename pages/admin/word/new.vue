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
                        <button type="button" class="btn btn-blue" @click="createWordClick">Create</button>
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
    const firebase = require('@/app/config/firebase');

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
                subjectEmptyMessage: '',
                subjectMessage: '',
                wordMessage: '',
                meaningMessage: '',
                subjectId: 1,
                wordValue: '',
                meaning: '',
                subjectOption: [],

                showLoading: false,
            }
        },
        async created() {
            this.subjectOption = await subject.getSubjectOption();
            if (helpers.isEmptyObject(this.subjectOption)) {
                this.subjectEmptyMessage = 'Create Subject First';
            }
        },
        methods: {
            backClick() {
                this.$router.push('/admin/word');
            },
            async createWordClick() {
                this.showLoading = true;

                this.subjectMessage = '';
                this.wordMessage = '';
                this.meaningMessage = '';

                if (!this.subjectId) {
                    this.subjectMessage = 'Subject is required';
                }

                if (!this.meaning) {
                    this.meaningMessage = 'Meaning is required';
                }

                var isExitWord = false;
                if (!this.wordValue) {
                    this.wordMessage = 'Word is required';
                } else {
                    isExitWord = await word.isExitWord(this.wordValue);
                    if (isExitWord) {
                        this.wordMessage = 'Word is already exist';
                    }
                }

                if (this.subjectId && this.wordValue && this.meaning && !isExitWord) {

                    var url = 'https://mylanguagesapi.herokuapp.com/word/' + this.wordValue;
                    var wordObject = await this.$axios.$get(url);
                    if (!wordObject.sound) {
                        this.wordMessage = 'Word not found. Please try other word';
                    } else {

                        var id = await word.getIncreamentId();
                        var inputs = {
                            id: id,
                            word: this.wordValue,
                            meaning: this.meaning,
                            ipa: wordObject.ipa,
                            definition: wordObject.definition,
                            sound: wordObject.sound,
                            example: wordObject.example,
                            example1: wordObject.example1,
                            subject_id: this.subjectId,
                            created_at: Date.now(),
                            updated_at: Date.now(),
                        }

                        await word.insert(inputs);

                        var wordName = this.wordValue;

	                    if (wordObject.audio){
                            // upload audio to firestore
		                    var url = url = 'https://mylanguagesapi.herokuapp.com/download/' + wordName;
		                    let blob = await fetch(url).then(r => r.blob());
		                    await firebase.storage.ref().child('audio/' + wordName +'.mp3').put(blob);

		                    // get firebase audio url and update it to db
		                    var url = await firebase.storage.ref().child('audio/'+wordName+'.mp3').getDownloadURL();

		                    var inputs = {
			                    audio: url,
		                    }

		                    await word.updateFieldsById(id, inputs);

		                    // delete file on heroku
		                    var deleteUrl = 'https://mylanguagesapi.herokuapp.com/delete/' + wordName;
		                    await this.$axios.$get(deleteUrl);
                        }

                        this.showLoading = false;
                        let toast = this.$toasted.show('Create word successfully.', {
                            theme: "toasted-primary",
                            type: "success",
                            icon: "delete",
                            position: "top-center",
                            duration: 4000
                        });

                        //reset value
                        this.meaning = '';
                        this.wordValue = '';

                    }
                }

                this.showLoading = false;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

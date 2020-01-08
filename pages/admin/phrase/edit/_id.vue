<template>
    <div class="content-wrapper">

        <div class="content-header">
            <h4>Phrase Edit</h4>
        </div>

        <div class="content-meta">
            <span>Edit phrase</span>
            <button type="button" class="btn btn-blue" @click="backClick">Back</button>
        </div>

        <div class="box">
            <div class="box-title">
                <span>Phrase Infomation</span>
            </div>

            <div class="form-wrapper w-50">

                <div class="form-group row">
                  <label class="col-md-3">Phrase</label>
                  <div class="col-md-9">
                    <input v-model="phraseValue" type="text" class="form-control">
                    <span class="text-danger">{{ phraseMessage }}</span>
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
                  <label class="col-md-3">Example</label>
                  <div class="col-md-9">
                    <input v-model="example" type="text" class="form-control">
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-3">Example 1</label>
                  <div class="col-md-9">
                    <input v-model="example1" type="text" class="form-control">
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-3"></label>
                  <div class="col-md-9">
                    <button type="button" class="btn btn-blue" @click="editPhraseClick">Edit</button>
                  </div>
                </div>

                <Loading :showLoading="this.showLoading"/>
            </div>
        </div>
    </div>
</template>

<script>
    import subject from '@/app/models/subject';
    import phrase from '@/app/models/phrase';
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
                phraseId: '',
                phraseMessage: '',
                meaningMessage: '',

                originalPhraseValue: '',
                phraseValue: '',
                meaning: '',
                example: '',
                example1: '',
                showLoading: false,
            }
        },
        async mounted() {
            this.phraseId = this.$route.params.id;
            var phraseObject = await phrase.getPhraseById(this.phraseId);
            if(!phraseObject){
                this.$router.push('/admin/phrase');
            }

            this.originalPhraseValue = phraseObject.phrase;
            this.phraseValue = phraseObject.phrase;
            this.meaning = phraseObject.meaning;
            this.example = phraseObject.example;
            this.example1 = phraseObject.example1;
        },
        methods: {
            backClick() {
                this.$router.push('/admin/phrase');
            },
            async editPhraseClick(){
                this.showLoading = true;

                this.phraseMessage = '';
                this.meaningMessage = '';

                if (!this.phraseValue) {
                    this.phraseMessage = 'Phrase is required';
                }

                if (!this.meaning) {
                    this.meaningMessage = 'Meaning is required';
                }

                if(this.phraseValue && this.meaning) {

                    if(this.phraseValue === this.originalPhraseValue){
                        // same word
                        var id = this.phraseId;
                        var inputs = {
                            meaning: this.meaning,
                            example: this.example,
                            example1: this.example1,
                            updated_at: Date.now(),
                        }

                        await phrase.updateFieldsById(id, inputs);
                        this.showLoading = false;
                        let toast = this.$toasted.show('Update Phrase successfully.', {
                            theme: "toasted-primary",
                            type: "success",
                            icon: "delete",
                            position: "top-center",
                            duration: 4000
                        });
                    }
                    else {

                        var isExitPhrase = false;
                        if (!this.phraseValue) {
                            this.phraseMessage = 'phrase is required';
                        } else {
                            isExitPhrase = await phrase.isExitPhrase(this.phraseValue);
                            if (isExitPhrase) {
                                this.phraseMessage = 'Phrase is already exist';
                            }
                        }

                        if(!isExitPhrase){
                            var id = this.phraseId;
                            var inputs = {
                                phrase: this.phraseValue,
                                meaning: this.meaning,
                                example: this.example,
                                example1: this.example1,
                                updated_at: Date.now(),
                            }

                            await phrase.updateFieldsById(id, inputs);
                            this.showLoading = false;
                            let toast = this.$toasted.show('Update Phrase successfully.', {
                                theme: "toasted-primary",
                                type: "success",
                                icon: "delete",
                                position: "top-center",
                                duration: 4000
                            });
                        }
                    }
                }

                this.showLoading = false;

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

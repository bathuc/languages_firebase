<template>
    <div class="content-wrapper">

        <div class="content-header">
            <h4>Phrases New</h4>
        </div>

        <div class="content-meta">
            <span>Create new phrase</span>
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
                        <button type="button" class="btn btn-blue" @click="createPhraseClick">Create</button>
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
                phraseMessage: '',
                meaningMessage: '',
                phraseValue: '',
                meaning: '',
                example: '',
                example1: '',
                showLoading: false,
            }
        },
        methods: {
            backClick() {
                this.$router.push('/admin/phrase');
            },
            async createPhraseClick() {
                this.showLoading = true;

                this.phraseMessage = '';
                this.meaningMessage = '';

                if (!this.meaning) {
                    this.meaningMessage = 'Meaning is required';
                }

                var isExitPhrase = false;
                if (!this.phraseValue) {
                    this.phraseMessage = 'phrase is required';
                } else {
                    isExitPhrase = await phrase.isExitPhrase(this.phraseValue);
                    if (isExitPhrase) {
                        this.phraseMessage = 'Phrase is already exist';
                    }
                }

                if (this.phraseValue && this.meaning && !isExitPhrase) {

                    var id = await phrase.getIncreamentId();
                    var inputs = {
                        id: id,
                        phrase: this.phraseValue,
                        meaning: this.meaning,
                        example: this.example,
                        example1: this.example1,
                        created_at: Date.now(),
                        updated_at: Date.now(),
                    }

                    await phrase.insert(inputs);
                    this.showLoading = false;
                    let toast = this.$toasted.show('Create phrase successfully.', {
                        theme: "toasted-primary",
                        type: "success",
                        icon: "delete",
                        position: "top-center",
                        duration: 4000
                    });

                    //reset value
                    this.meaning = '';
                    this.phraseValue = '';
                    this.example = '';
                    this.example1 = '';
                }

                this.showLoading = false;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

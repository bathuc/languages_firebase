<template>
    <div class="content-wrapper">

        <div class="content-header">
            <h4>Subject Edit</h4>
        </div>

        <div class="content-meta">
            <span>Edit Subject</span>
            <button type="button" class="btn btn-blue" @click="backClick">Back</button>
        </div>

        <div class="box">
            <div class="box-title">
                <span>Subject Infomation</span>
            </div>

            <div class="form-wrapper w-50">

                <div class="form-group row">
                    <label class="col-md-3">Name English</label>
                    <div class="col-md-9">
                        <input v-model="nameEnglish" type="text" class="form-control">
                        <span class="text-danger">{{ messageEnglish }}</span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-3">Name Viet</label>
                    <div class="col-md-9">
                        <input v-model="nameViet" type="text" class="form-control">
                        <span class="text-danger">{{ messageViet }}</span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-3"></label>
                    <div class="col-md-9">
                        <button type="button" class="btn btn-blue" @click="editSubjectClick">Edit</button>
                    </div>
                </div>
            </div>

            <Loading :showLoading="this.showLoading"/>
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
                subjectId: '',
                messageEnglish: '',
                messageViet: '',
                nameEnglish: '',
                nameOriginalEnglish: '',
                nameViet: '',
                showLoading: false,
            }
        },
        async mounted() {
            this.subjectId = this.$route.params.id;
            var subjectObject = await subject.getSubjectById(this.subjectId);
            if(!subjectObject){
                this.$router.push('/admin/subject');
            }
            console.log('subjectObject', subjectObject);
            this.nameEnglish = subjectObject.name_en;
            this.nameOriginalEnglish = subjectObject.name_en;
            this.nameViet = subjectObject.name_vi;
        },
        methods: {
            backClick() {
                this.$router.push('/admin/subject');
            },
            async editSubjectClick() {
                this.showLoading = true;

                if (!this.nameEnglish || !this.nameViet) {
                    if (!this.nameEnglish) {
                        this.messageEnglish = 'Name English is required';
                    } else {
                        this.messageEnglish = '';
                    }
                    if (!this.nameViet) {
                        this.messageViet = 'Name Viet is required';
                    } else {
                        this.messageViet = '';
                    }
                } else {
                    this.messageEnglish = '';
                    this.messageViet = '';

                    if (this.nameOriginalEnglish !== this.nameEnglish) {
                        var isExitNameEn = await subject.isExitNameEn(this.nameEnglish);
                        if(isExitNameEn){
                            this.messageEnglish = 'Name English already exit';
                        }
                    } else {
                        var id = this.subjectId;
                        var inputs = {
                            name_en: this.nameEnglish,
                            name_vi: this.nameViet,
                            update_at: Date.now(),
                        }
                        await subject.updateFieldsById(id, inputs);
                        this.showLoading = false;
                        let toast = this.$toasted.show('Update Subject successfully.', {
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

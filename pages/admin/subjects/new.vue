<template>
    <div class="content-wrapper">

        <div class="content-header">
            <h4>Subject New</h4>
        </div>

        <div class="content-meta">
            <span>Create new subject</span>
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
                        <button type="button" class="btn btn-blue" @click="createSubjectClick">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import subject from "../../../app/models/subject";

    export default {
        layout: 'admin',
        data() {
            return {
                messageEnglish: '',
                messageViet: '',
                nameEnglish: '',
                nameViet: '',
            }
        },
        async created() {
            var id = await subject.getIncreamentId();
            var isExitNameVi = await subject.isExitNameVi('Phổ Biến12');

            console.log('id ', id);
            console.log('isExitNameVi 12', isExitNameVi);
        },
        methods: {
            backClick() {
                this.$router.push('/admin/subject');
            },
            async createSubjectClick() {
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

                    var isExitNameEn = await subject.isExitNameEn(this.nameEnglish);
                    var isExitNameVi = await subject.isExitNameVi(this.nameViet);

                    if (isExitNameEn) {
                        this.messageEnglish = 'Name English already exit';
                    } else if (isExitNameVi) {
                        this.messageViet = 'Name Viet already exit';
                    } else {
                        var id = await subject.getIncreamentId();
                        var inputs = {
                            id: id,
                            name_en: this.nameEnglish,
                            name_vi: this.nameViet,
                            created_at: Date.now(),
                        }

                        await subject.insert(inputs);
                        this.$router.push('/admin/subjects');
                    }
                    console.log('word', this.word);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

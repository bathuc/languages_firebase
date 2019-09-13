<template>
    <div class="content-wrapper">
        <div class="content-header">
            <h4>Subject</h4>
        </div>

        <div class="content-meta">
            <button type="button" class="btn btn-blue" @click="newSubjectClick">New Subject</button>
        </div>

        <div class="box">
            <div class="box-title">
                <span>Subject Infomation</span>
                <ul class="pagination" v-if="paginationInfo.is_pagination">
                    <li :class="paginationInfo.back? '': 'disabled' " class="page-item "><span class="page-link" @click="clickBack">Previous</span></li>
                    <li v-for="index in paginationInfo.item_index" :class="index==paginationInfo.current_page? 'active' : ''" class="page-item "><span class="page-link" @click="pageClick(index)">{{ index}}</span></li>
                    <li :class="paginationInfo.next? '': 'disabled' " class="page-item "><span class="page-link" @click="clickNext">Next</span></li>
                </ul>
            </div>

            <div class="box-content"  v-if="paginationInfo.data">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name English</th>
                        <th>Name Viet</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="dataItem in paginationInfo.data" @click="clickEditSubject(dataItem.id)">
                        <td >{{ dataItem.id }}</td>
                        <td >{{ dataItem.name_en }}</td>
                        <td >{{ dataItem.name_vi }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<script>

    import subject from '@/app/models/subject';
    import word from '@/app/models/word';
    import helpers from "@/app/helpers/helpers";
    import Loading from '@/components/Loading';

    export default {
        layout: 'admin',
        data() {
            return {
                page: 1,
                paginationInfo: [],
                subjectList: [],
            }
        },
        async created(){
            this.subjectList = await subject.getSubjectList();
            this.paginationInfo = await helpers.getPaginationInfo(this.subjectList, this.page);
            console.log('this.paginationInfo', this.paginationInfo);
        },
        methods: {
            newSubjectClick() {
                this.$router.push('/admin/subject/new');
            },
            async pageClick(page){
                this.page = page;
                this.paginationInfo = helpers.getPaginationInfo(this.wordList, this.page);
            },

            clickBack(){
                if(!this.paginationInfo.back){
                    return;
                }
                else{
                    this.page -= 1;
                    this.paginationInfo = helpers.getPaginationInfo(this.wordList, this.page);
                }
            },

            clickNext(){
                if(!this.paginationInfo.next){
                    return;
                }
                else{
                    this.page += 1;
                    this.paginationInfo = helpers.getPaginationInfo(this.wordList, this.page);
                }
            },
            clickEditSubject(id){
                console.log('id',id);
                this.$router.push('/admin/subject/edit/'+id);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

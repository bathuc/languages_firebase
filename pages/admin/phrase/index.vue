<template>
    <div class="content-wrapper">
        <div class="content-header">
            <h4>Phrase</h4>
            <form v-on:submit.prevent="findPhrase">
                <div class="form-search-wrapper">
                    <span class="d-none d-lg-block">Find Phrase</span>
                    <input v-model="phraseValue" type="text" class="form-control">
                    <button type="button" class="btn btn-blue" @click="findPhrase">Find</button>
                </div>
            </form>
        </div>

        <div class="content-meta">
            <button type="button" class="btn btn-blue" @click="newPhraseClick">New phrase</button>
        </div>

        <div class="box">
            <div class="box-title">
                <span class="d-none d-lg-block">Phrase Infomation</span>
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
                            <th>id</th>
                            <th>Phrase</th>
                            <th>Meaning</th>
                            <th class="d-none d-lg-block">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="dataItem in paginationInfo.data" @click="clickEditPhrase(dataItem.id)">
                            <td >{{ dataItem.id }}</td>
                            <td >{{ dataItem.phrase }}</td>
                            <td >{{ dataItem.meaning }}</td>
                            <td class="d-none d-lg-block"> <span class="word-example">{{ dataItem.example }}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

    import subject from '@/app/models/subject';
    import phrase from '@/app/models/phrase';
    import helpers from "@/app/helpers/helpers";
    import Loading from '@/components/Loading';

    export default {
        layout: 'admin',
        data() {
            return {
                page: 1,
                paginationInfo: [],
                phraseList: [],
                phraseValue: '',
            }
        },
        async created(){
            this.phraseList = await phrase.getPhraseList();
            this.paginationInfo = await helpers.getPaginationInfo(this.phraseList, this.page);
            console.log('this.paginationInfo', this.paginationInfo);
        },
        methods: {
            newPhraseClick() {
                this.$router.push('/admin/phrase/new');
            },
            async pageClick(page){
                this.page = page;
                this.paginationInfo = helpers.getPaginationInfo(this.phraseList, this.page);
            },

            clickBack(){
                if(!this.paginationInfo.back){
                    return;
                }
                else{
                    this.page -= 1;
                    this.paginationInfo = helpers.getPaginationInfo(this.phraseList, this.page);
                }
            },

            clickNext(){
                if(!this.paginationInfo.next){
                    return;
                }
                else{
                    this.page += 1;
                    this.paginationInfo = helpers.getPaginationInfo(this.phraseList, this.page);
                }
            },
            clickEditPhrase(id){
                console.log('id',id);
                this.$router.push('/admin/phrase/edit/'+id);
            },
            async findPhrase(){
                if(this.phraseValue){
                    var phraseItem = await phrase.findPhrase(this.phraseValue);
                    this.phraseList = [phraseItem];
                    this.paginationInfo = await helpers.getPaginationInfo(this.phraseList, 1);
                }
            }
        }
    }
</script>


<style lang="scss" scoped>

</style>

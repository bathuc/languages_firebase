<template>
    <div class="content-wrapper">
        <div class="content-header">
            <h4>Words</h4>
            <form v-on:submit.prevent="findWord">
                <div class="form-search-wrapper">
                    <span class="d-none d-lg-block">Find Word</span>
                    <input v-model="wordValue" type="text" class="form-control">
                    <button type="button" class="btn btn-blue" @click="findWord">Find</button>
                </div>
            </form>
        </div>

        <div class="content-meta">
            <button type="button" class="btn btn-blue" @click="newWordClick">New word</button>
        </div>

        <div class="box">
            <div class="box-title">
                <span class="d-none d-lg-block">Word Infomation</span>
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
                            <th>Word</th>
                            <th>Meaning</th>
                            <th>Subject</th>
                            <th class="d-none d-lg-block">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="dataItem in paginationInfo.data" @click="clickEditWord(dataItem.id)">
                            <td >{{ dataItem.id }}</td>
                            <td >{{ dataItem.word }}</td>
                            <td >{{ dataItem.meaning }}</td>
                            <td >{{ dataItem.subject_name }}</td>
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
    import word from '@/app/models/word';
    import helpers from "@/app/helpers/helpers";
    import Loading from '@/components/Loading';

    export default {
        layout: 'admin',
        data() {
            return {
                page: 1,
                paginationInfo: [],
                wordList: [],
                wordValue: '',
            }
        },
        async created(){
            this.wordList = await word.getWordList();
            this.paginationInfo = await helpers.getPaginationInfo(this.wordList, this.page);
            console.log('this.paginationInfo', this.paginationInfo);
        },
        methods: {
            newWordClick() {
                this.$router.push('/admin/word/new');
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
            clickEditWord(id){
                console.log('id',id);
                this.$router.push('/admin/word/edit/'+id);
            },
            async findWord(){
                if(!this.wordValue){
                    this.wordList = await word.getWordList();
                    this.paginationInfo = await helpers.getPaginationInfo(this.wordList, this.page);
                }
                else{
                    var wordItem = await word.findWord(this.wordValue);
                    this.wordList = [wordItem];
                    this.paginationInfo = await helpers.getPaginationInfo(this.wordList, 1);
                }
            }
        }
    }
</script>


<style lang="scss" scoped>

</style>

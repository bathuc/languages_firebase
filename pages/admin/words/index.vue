<template>
    <div class="content-wrapper">
        <div class="content-header">
            <h4>Words</h4>
            <div class="form-search-wrapper">
                <span>Find Word</span>
                <input type="text" class="form-control">
                <button type="button" class="btn btn-blue">Find</button>
            </div>
        </div>

        <div class="content-meta">
            <button type="button" class="btn btn-blue" @click="newWordClick">New word</button>
        </div>

        <div class="box">
            <div class="box-title">
                <span>Word Infomation</span>
                <ul class="pagination" v-if="wordList.length">
                    <li :class="paginationInfo.back? '': 'disabled' " class="page-item "><span class="page-link" @click="clickBack">Previous</span></li>
                    <li v-for="index in (paginationInfo.first_index, paginationInfo.last_index)" :class="index==paginationInfo.current_page? 'active' : ''" class="page-item "><span class="page-link" @click="pageClick(index)">{{ index}}</span></li>
                    <li :class="paginationInfo.next? '': 'disabled' " class="page-item "><span class="page-link" @click="clickNext">Next</span></li>
                </ul>
            </div>

            <div class="box-content"  v-if="paginationInfo.data">
                <table class="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Word</th>
                            <th>Meaning</th>
                            <th>Subject</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="dataItem in paginationInfo.data">
                            <td >{{ dataItem.id }}</td>
                            <td >{{ dataItem.word }}</td>
                            <td >{{ dataItem.meaning }}</td>
                            <td >{{ dataItem.subject_name }}</td>
                            <td >{{ dataItem.example }}</td>
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
            }
        },
        async created(){
            this.wordList = await word.getWordList();
            console.log('word list', this.wordList);
            console.log('word list length', this.wordList.length);
            this.paginationInfo = await helpers.getPaginationInfo(this.wordList, this.page, 3, 4);
            console.log('data', this.paginationInfo);
            var name = await subject.getSubjectNameFromId(1);
            console.log('name', name);
        },
        methods: {
            newWordClick() {
                this.$router.push('/admin/words/new');
            },
            async pageClick(page){
                this.page = page;
                this.paginationInfo = helpers.getPaginationInfo(this.wordList, this.page, 3);
            },

            clickBack(){
                if(!this.paginationInfo.back){
                    return;
                }
                else{
                    this.page -= 1;
                    this.paginationInfo = helpers.getPaginationInfo(this.wordList, this.page, 3);
                }
            },

            clickNext(){
                if(!this.paginationInfo.next){
                    return;
                }
                else{
                    this.page += 1;
                    this.paginationInfo = helpers.getPaginationInfo(this.wordList, this.page, 3, 4);
                }
            }
        }
    }
</script>


<style lang="scss" scoped>

</style>

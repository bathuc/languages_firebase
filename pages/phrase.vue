<template>
    <div class="container">
        <div class="menu-control col-8">
            <div class="control-item d-none d-lg-block">
                <input v-model="phraseNumber" type="radio" name="phraseNumber" id="radio_1" value="1"/>
                <label for="radio_1">First 16 phrase</label>
            </div>

            <div class="control-item d-none d-lg-block">
                <input v-model="phraseNumber" type="radio" name="phraseNumber" id="radio_2" value="2"/>
                <label for="radio_2">16 - 32 phrase</label>
            </div>

            <div class="control-item d-none d-lg-block">
                <input v-model="phraseNumber" type="radio" name="phraseNumber" id="radio_4" value="random"/>
                <label for="radio_4">Random</label>
            </div>

            <div class="control-item">
                <select v-model="phraseNumber" class="form-control">
                    <option v-for="item in phraseTable.select_box" :value="item.id">{{ item.value }}</option>
                </select>
            </div>

        </div>

        <div class="content-wrapper row">
            <div class="col-12 col-lg-7" v-if="phraseItemRender">
                <span id="hira_show">{{  phraseItemRender.phrase }}</span>
                <div class="word-content">
                    <p class="meaning text-success"> {{ phraseItemRender.meaning}}</p>
                    <p class="example"> {{ phraseItemRender.example }} </p>
                    <p class=""> {{ phraseItemRender.example1 }} </p>
                </div>
                <button type="button" class="btn btn-lg btn-primary" @click="nextPhrase">Next Phrase</button>
            </div>

            <div class="d-none d-lg-block col-lg-5" v-if="phraseTable.tableRender">
                <table class="table table-bordered info-table" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr v-for="rowItem in phraseTable.tableRender">
                            <td v-for="item in rowItem" @click="clickItem(item.index)" class="table-word-item">{{ item.phrase_item.phrase }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

    import phrase from '@/app/models/phrase';
    import helpers from "@/app/helpers/helpers";
    import Loading from '@/components/Loading';

    export default {
        layout: 'frontend',
        head () {
            return {
                title: 'phrases',
            }
        },
        data() {
            return {
                phraseNumber: 1,
                phraseTable: [],
                phraseList: [],
                phraseItemRender: '',
                paginationInfo: [],

                showLoading: false,
            }
        },
        async created() {
            this.phraseList = await phrase.getPhraseList();
            this.phraseTable = helpers.getPhraseSplitInfo(this.phraseList, this.phraseNumber);
            this.phraseItemRender = this.phraseTable.data[0];
        },
        mounted() {
            var me = this;
            window.addEventListener('keydown', function(event) {
                // right arrow, click next word
                if (event.keyCode === 39) {
                    me.nextPhrase();
                }
            });
        },
        watch:{
            phraseNumber: function(newValue){
                var number = parseInt(newValue);
                var isInt = Number.isInteger(number);
                if(isInt) {
                    this.phraseTable = helpers.getPhraseSplitInfo(this.phraseList, this.phraseNumber);
                    this.phraseItemRender = this.phraseTable.data[this.phraseTable.first_index];
                }
                else{
                    // random case
                    this.phraseTable = helpers.getPhraseSplitInfo(this.phraseList, 1);
                    this.phraseItemRender = this.phraseTable.data[this.phraseTable.first_index];
                }
            },
        },
        methods: {
            async nextPhrase(){
                this.phraseItemRender = helpers.getRandomValues(this.phraseTable.data);
            },
            async clickItem(index){
                this.phraseItemRender = this.phraseTable.data[index];
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>


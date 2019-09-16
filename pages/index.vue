<template>
    <div class="container">
        <div class="menu-control">
            <div class="control-item d-none d-lg-block">
                <input v-model="wordNumber" type="radio" name="wordNumber" id="radio_1" value="1"/>
                <label for="radio_1">First 40 words</label>
            </div>

            <div class="control-item d-none d-lg-block">
                <input v-model="wordNumber" type="radio" name="wordNumber" id="radio_2" value="2"/>
                <label for="radio_2">40 - 80 words</label>
            </div>

            <div class="control-item d-none d-lg-block">
                <input v-model="wordNumber" type="radio" name="wordNumber" id="radio_3" value="3"/>
                <label for="radio_3">80 - 120 words</label>
            </div>

            <div class="control-item d-none d-lg-block">
                <input v-model="wordNumber" type="radio" name="wordNumber" id="radio_4" value="random"/>
                <label for="radio_4">Random</label>
            </div>

            <div class="control-item  d-none d-lg-block">
                <div class="time-control">
                    <label for="time">Time</label>
                    <input v-model="time" type="text" name="time" id="time" class="form-control"/>
                </div>
            </div>

            <div class="control-item">
                <select v-model="wordNumber" class="form-control">
                    <option v-for="item in wordTable.select_box" :value="item.id">{{ item.value }}</option>
                </select>
            </div>

            <div class="control-item">
                <select v-model="subjectId" class="form-control">
                    <option v-for="item in subjectOption" :value="item.id">{{ item.name_vi }}</option>
                </select>
            </div>

            <div class="control-item">
                <button type="button" class="btn btn-success" @click="playClick">Play</button>
            </div>
        </div>

        <div class="content-wrapper row">
            <div class="col-12 col-lg-6" v-if="wordItemRender">
                <span id="hira_show" @click="soundClick">{{  wordItemRender.word }}</span>
                <div class="word-content">
                    <p class="ipa"> {{ wordItemRender.ipa}}</p>
                    <p class="meaning text-success"> {{ wordItemRender.meaning}}</p>
                    <p class="example"> {{ wordItemRender.example }} </p>
                    <p> {{ wordItemRender.example1 }} </p>
                </div>
                <button type="button" class="btn btn-lg btn-primary" @click="nextWord">Next Word</button>
            </div>

            <div class="d-none d-lg-block col-lg-6" v-if="wordTable.tableRender">
                <table class="table table-bordered info-table" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr v-for="rowItem in wordTable.tableRender">
                            <td v-for="item in rowItem" @click="clickItem(item.index)" class="table-word-item">{{ item.word_item.word }}</td>
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
        layout: 'frontend',
        data() {
            return {
                wordNumber: 1,
                wordTable: [],
                wordList: [],
                wordItemRender: '',
                time: 4,
                paginationInfo: [],
                subjectId: 1,
                subjectOption: [],

                showLoading: false,
            }
        },
        async created() {
            this.subjectOption = await subject.getSubjectOption();

            this.wordList = await word.getWordListBySubjectId(this.subjectId);
            this.wordTable = helpers.getWordSplitInfo(this.wordList, this.wordNumber);
            this.wordItemRender = this.wordTable.data[0];
        },
        mounted() {
            var me = this;
            window.addEventListener('keydown', function(event) {
                // right arrow, click next word
                if (event.keyCode === 39) {
                    me.nextWord();
                }
            });

            window.addEventListener('keydown', function(event) {
                // right down, click next word
                if (event.keyCode === 40) {
                    me.soundClick();
                }
            });
        },
        watch:{
             wordNumber: function(newValue){
                var number = parseInt(newValue);
                var isInt = Number.isInteger(number);
                if(isInt) {
                    this.wordTable = helpers.getWordSplitInfo(this.wordList, this.wordNumber);
                    this.wordItemRender = this.wordTable.data[this.wordTable.first_index];
                    this.soundClick();
                }
                else{
                    // random case
                    this.wordTable = helpers.getWordSplitInfo(this.wordList, 1);
                    this.wordItemRender = this.wordTable.data[this.wordTable.first_index];
                    this.soundClick();
                }
            },
            subjectId: async function(newValue){
                this.wordNumber = 1;
                this.wordList = await word.getWordListBySubjectId(this.subjectId);
                this.wordTable = helpers.getWordSplitInfo(this.wordList, this.wordNumber);
                this.wordItemRender = this.wordTable.data[this.wordTable.first_index];
                this.soundClick();
            }
        },
        methods: {
            async nextWord(){
                this.wordItemRender = helpers.getRandomValues(this.wordTable.data);
                // console.log('this.wordTable.data', this.wordTable.data);
                // console.log('wordItemRender', this.wordItemRender);
                await this.soundClick();
            },
            async clickItem(index){
                this.wordItemRender = this.wordTable.data[index];
                await this.soundClick();
            },
            async soundClick(){
                var soundPath = this.wordItemRender.sound;
                var sound = new Audio(soundPath);
                await sound.play();
            },
            playClick(){
                var number = parseInt(this.wordNumber);
                var isInt = Number.isInteger(number);
                if(isInt){
                    var randomArray = helpers.getRandomArray(this.wordTable.data);
                    this.playArrayAudio(randomArray);
                }
                else{
                    // random case
                    var randomArray = helpers.getRandomArray(this.wordList);
                    this.playArrayAudio(randomArray);
                }
            },
            playArrayAudio(arrayWord) {
                var me = this;
                var time = this.time;
                var soundTime = 0;
                arrayWord.forEach(function(word){
                    setTimeout(function (word){
                        me.wordItemRender = word;
                        var audio = new Audio(word.sound);
                        audio.play();
                    }, soundTime, word);
                    soundTime += time * 1000;
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>


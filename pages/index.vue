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
                <input v-model="wordNumber" type="radio" name="wordNumber" id="radio_4" value="random"/>
                <label for="radio_4">Random</label>
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

            <div class="control-item  d-none d-lg-block">
                <div class="time-control">
                    <label for="time">Time</label>
                    <input v-model="time" type="text" name="time" id="time" class="form-control"/>
                </div>
            </div>

            <div class="control-item">
                <div class="time-control">
                    <span>Sound</span>
                    <label class="switch">
                        <input v-model="soundFlag" type="checkbox">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>

            <div class="control-item">
                <button type="button" class="btn btn-success" @click="playClick">Play</button>
            </div>
        </div>

        <div class="content-wrapper row">
            <div class="col-12 col-lg-7" v-if="wordItemRender">
                <div class="d-flex justify-content-between">
                    <span id="hira_show" @click="soundPlay">{{  wordItemRender.word }}</span>
                    <div>
                        <p class="btn btn-primary ml-2 px-2 py-1 h5 font-weight-bold">{{ wordIndex }} / {{ wordTotal }}</p>
                        <p class="btn btn-success ml-2 px-2 py-1 h5 font-weight-bold">{{ repeatTime }}</p>
                    </div>
                </div>
                <div class="word-content">
                    <div class="d-flex align-items-center">
                        <p class="ipa pr-4"> {{ wordItemRender.ipa}}</p>
                        <span class="audio-play" @click="audioPlay"> audio
                            <svg class="bi bi-volume-up-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.536 14.01A8.473 8.473 0 0014.026 8a8.473 8.473 0 00-2.49-6.01l-.708.707A7.476 7.476 0 0113.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
                              <path d="M10.121 12.596A6.48 6.48 0 0012.025 8a6.48 6.48 0 00-1.904-4.596l-.707.707A5.483 5.483 0 0111.025 8a5.483 5.483 0 01-1.61 3.89l.706.706z"/>
                              <path d="M8.707 11.182A4.486 4.486 0 0010.025 8a4.486 4.486 0 00-1.318-3.182L8 5.525A3.489 3.489 0 019.025 8 3.49 3.49 0 018 10.475l.707.707z"/>
                              <path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06z" clip-rule="evenodd"/>
                            </svg>
                        </span>
                    </div>
                    <p class="meaning text-success"> {{ wordItemRender.meaning}}</p>
                    <p class="definition"> {{ wordItemRender.definition }} </p>
                    <p class="example"> {{ wordItemRender.example }} </p>
                    <p class=""> {{ wordItemRender.example1 }} </p>
                </div>
                <button type="button" class="btn btn-lg btn-primary" @click="nextWord">Next Word</button>
            </div>

            <div class="table-render d-none d-lg-block col-lg-5" v-if="wordTable.tableRender">
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
        head () {
            return {
                title: 'words',
            }
        },
        data() {
            return {
                wordNumber: 1,
                wordTable: [],
                wordList: [],
                wordCurrentList: [],
                wordItemRender: '',

                wordIndex: 1,
                wordTotal: 40,
                repeatTime: 0,

                time: 4,
                soundFlag: false,
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
            this.wordCurrentList = this.wordTable.data;

            this.wordTotal = this.wordTable.data.length;
            this.wordItemRender = this.wordTable.data[0];
        },
        mounted() {
            var me = this;
            window.addEventListener('keydown', function(event) {
                if (event.keyCode === 39) {
                    me.nextWord();
                }
            });

            window.addEventListener('keydown', function(event) {
                //  down arrow, play sound
                if (event.keyCode === 40) {
                    me.audioPlay();
                }
            });

	        window.addEventListener('keydown', function(event) {
		        // up arrow, play sound
		        if (event.keyCode === 38) {
			        console.log('sound  play');
			        me.soundPlay();
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

                this.repeatTime = 0;
                this.wordIndex = 1;
                this.wordTotal = this.wordTable.data.length;
            }
        },
        methods: {
            async nextWord(){
                this.wordItemRender = helpers.getRandomValues(this.wordCurrentList);
                // remove current word from list
                this.wordCurrentList = this.wordCurrentList.filter(item => !(item.id === this.wordItemRender.id));

                if(helpers.isEmptyObject(this.wordCurrentList)){
                    this.wordCurrentList = this.wordTable.data;
                    this.repeatTime++;
                    this.wordIndex = 1;
                } else {
                    this.wordIndex++;
                }

                await this.soundClick();
            },
            async clickItem(index){
                this.wordItemRender = this.wordTable.data[index];
                await this.soundClick();
            },
            async soundClick(){
                if(this.soundFlag) {
                    var soundPath = this.wordItemRender.sound;
                    var sound = new Audio(soundPath);
                    await sound.play();
                }
            },
            async soundPlay(){
                var soundPath = this.wordItemRender.sound;
                var sound = new Audio(soundPath);
                await sound.play();
            },
	        async audioPlay(){
		        var audioPath = this.wordItemRender.audio;
		        var sound = new Audio(audioPath);
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
                        if(me.soundFlag) {
                            var audio = new Audio(word.sound);
                            audio.play();
                        }
                    }, soundTime, word);
                    soundTime += time * 1000;
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .audio-play{
        font-size: 18px;
        cursor: pointer;
    }
</style>


<template>
    <div class="container">
        <div class="menu-control">
            <div class="control-item">
                <input v-model="wordNumber" type="radio" name="wordNumber" id="radio_1" value="1"/>
                <label for="radio_1">First 40 words</label>
            </div>

            <div class="control-item">
                <input v-model="wordNumber" type="radio" name="wordNumber" id="radio_2" value="2"/>
                <label for="radio_2">40 - 80 words</label>
            </div>

            <div class="control-item">
                <input v-model="wordNumber" type="radio" name="wordNumber" id="radio_3" value="3"/>
                <label for="radio_3">80 - 120 words</label>
            </div>

            <div class="control-item">
                <input v-model="wordNumber" type="radio" name="wordNumber" id="radio_4" value="random"/>
                <label for="radio_4">Random</label>
            </div>

            <div class="control-item time-control">
                <label for="time">Time</label>
                <input v-model="time" type="text" name="time" id="time" class="form-control"/>
            </div>

            <div class="control-item">
                <select v-model="wordNumber" class="form-control">
                    <option v-for="item in wordResult.select_box" :value="item.id">{{ item.value }}</option>
                </select>
            </div>

            <div class="control-item">
                <select v-model="subjectId" class="form-control">
                    <option v-for="item in subjectOption" :value="item.id">{{ item.name_vi }}</option>
                </select>
            </div>

            <div class="control-item">
                <button type="button" class="btn btn-success">Play</button>
            </div>
        </div>

        <div class="content-wrapper row">
            <div class="col-12 col-lg-6">
                <span id="hira_show" @click="soundClick">{{  wordItemRender.word }}</span>
                <div class="word-content">
                    <span class="ipa"> {{ wordItemRender.ipa}}</span><br>
                    <span class="meaning"> {{ wordItemRender.meaning}}</span><br>
                    <span class="example"> {{ wordItemRender.example }} </span><br>
                    <span> {{ wordItemRender.example1 }} </span><br>
                </div>
                <button type="button" class="btn btn-lg btn-primary" @click="nextWord">Next Word</button>
            </div>

            <div class="d-none d-lg-block col-lg-6">
                <table class="table table-bordered info-table" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>

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
                wordResult: [],
                wordList: [],
                wordItemRender: '',
                time: 2,
                paginationInfo: [],
                subjectId: 1,
                subjectOption: [],

                showLoading: false,
            }
        },
        async created() {
            this.subjectOption = await subject.getSubjectOption();

            this.wordList = await word.getWordListBySubjectId(this.subjectId);
            this.wordResult = helpers.getWordSplitInfo(this.wordList, this.wordNumber);
            this.wordItemRender = this.wordResult.data[0];
            console.log('wordResult', this.wordResult);
        },

        methods: {
            soundClick(){
                var soundPath = this.wordItemRender.sound;
                var sound = new Audio(soundPath);
                sound.play();
            },
            nextWord(){
                this.wordItemRender = helpers.getRandomValues(this.wordResult.data);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menu-control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px 0px;
    }
    .control-item {

    }

    .time-control{
        display: flex;
        align-items: center;
        * {
            margin-left: 10px;
        }
    }

    #time {
        width: 50px;
    }

    #hira_show {
        cursor: pointer;
        background-color: rgb(255, 255, 255);
        color: rgb(102, 102, 102);
        font-size: 350%;
    }

    .word-content{
        font-size: 21px;

        .meaning{
            font-size: 25px;
        }
    }


</style>


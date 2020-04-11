<template>
    <div class="container">
        Home page
    </div>
</template>

<script>
    import Logo from '~/components/Logo.vue'
    import subject from '@/app/models/subject';
    import word from '@/app/models/word';
    import helpers from "@/app/helpers/helpers";
    import Loading from '@/components/Loading';
    const firebase = require('@/app/config/firebase');
    // const firebase = require('../app/config/firebase');
    // import firebase from "../app/config/firebase";

    export default {
        components: {
            Logo
        },
        async created() {
	       /* var wordName = 'urge';
	        var url = await firebase.storage.ref().child('audio/'+wordName+'.mp3').getDownloadURL();
	        console.log('url', url);*/
           // delete word
	       // await word.deleteWord('decrease');
	        var worlList = await word.getWordList();

	        await Promise.all(worlList.map(async (item) => {

	            var wordName = item.word;
		        /*
		        --- update audio url ---
		        var url = await firebase.storage.ref().child('audio/'+wordName+'.mp3').getDownloadURL();

		        var inputs = {
			        audio: url,
		        }

		        console.log(item);
		        await word.updateFieldsById(item.id, inputs);*/

	            // var url = 'http://mylanguagesapi.test/word/' + item_word;
		        // var wordObject = await this.$axios.$get(url);
		        // console.log('wordObject', wordObject);

                /* -- upload file
                var url = url = 'http://mylanguagesapi.test/download/' + item_word;
                let blob = await fetch(url).then(r => r.blob());
                console.log('fetch', url);
                firebase.storage.ref().child('audio/' + item_word +'.mp3').put(blob)
                    .then(snapshot => {
                        console.log('Uploaded.');
                    });*/

	        }));



	        // var url = 'https://mylanguagesapi.herokuapp.com/word/' + this.wordValue;
	        // var wordObject = await this.$axios.$get(url);
	        console.log('done');
        },
    }
</script>


ref()
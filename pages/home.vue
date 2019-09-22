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

    export default {
        components: {
            Logo
        },
        async created() {
            /*var wordList = await word.getWordList();
            var wordDefinition = [];
            wordList.map(async item =>{
                if(!item.definition){
                    wordDefinition.push(item);
                }
            });
            console.log('wordDefinition', wordDefinition);

            var me = this;
            const promises = wordDefinition.map(async item => {
                var url = 'http://mylanguagesapi.test/word/' + item.word;
                var wordObject = await me.$axios.$get(url);
                console.log('wordObject', wordObject);
                var id = item.id;
                var inputs = {
                    definition: wordObject.definition,
                };

                await word.updateFieldsById(id, inputs);
                console.log('update id', id);
                return id;
            })

            const ids = await Promise.all(promises)
            console.log('ids', ids);*/

            console.log('done');
        },
    }
</script>



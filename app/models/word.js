'use strict'
import helpers from "@/app/helpers/helpers";
const firebase = require('@/app/config/firebase');

export default {
    collection: "word",

    async getDataById(id){
        var doc = await firebase.fs.collection(this.collection).doc(id).get();
        // not empty
        if (!helpers.isEmptyObject(doc)) {
            return doc.data();
        }

        return {};
    },

    async getIncreamentId(){
      var query = await firebase.fs.collection(this.collection)
                        .orderBy('id', 'desc')
                        .limit(1)
                        .get();
      var docs = query.docs;
      if(!helpers.isEmptyObject(docs)){
        return docs[0].data().id + 1;
      }
      else{
        return 1;
      }
    },

    async isExitWord(wordItem){
      var query = await firebase.fs.collection(this.collection)
                  .where('word','==', wordItem)
                  .get();
      var docs = query.docs;

      if(!helpers.isEmptyObject(docs)){
        return true;
      }
      else{
        return false;
      }
    },

    async insert(inputs){
      await firebase.fs.collection(this.collection).add(inputs);
    },

}

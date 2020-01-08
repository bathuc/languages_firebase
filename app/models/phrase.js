'use strict'
import helpers from "@/app/helpers/helpers";

const firebase = require('@/app/config/firebase');

export default {
    collection: "phrase",

    async getDataByDocId(docId) {
        var doc = await firebase.fs.collection(this.collection).doc(docId).get();
        // not empty
        if (!helpers.isEmptyObject(doc)) {
            return doc.data();
        }

        return {};
    },

    async getDocumentById(id){
        var idInt = parseInt(id);
        var query = await firebase.fs.collection(this.collection)
                            .where('id', '==', idInt)
                            .get();

        var docs = query.docs;
        if (!helpers.isEmptyObject(docs)) {
            return docs[0].id;
        } else {
            return false;
        }
    },

    async getPhraseById(id) {
        var idInt = parseInt(id);
        var query = await firebase.fs.collection(this.collection)
                            .where('id', '==', idInt)
                            .get();
        var docs = query.docs;

        if (!helpers.isEmptyObject(docs)) {
            return docs[0].data();
        } else {
            return false;
        }
    },

    async getIncreamentId() {
        var query = await firebase.fs.collection(this.collection)
                            .orderBy('id', 'desc')
                            .limit(1)
                            .get();
        var docs = query.docs;
        if (!helpers.isEmptyObject(docs)) {
            return docs[0].data().id + 1;
        } else {
            return 1;
        }
    },

    async isExitPhrase(phraseItem) {
        var query = await firebase.fs.collection(this.collection)
                            .where('phrase', '==', phraseItem)
                            .get();
        var docs = query.docs;

        if (!helpers.isEmptyObject(docs)) {
            return true;
        } else {
            return false;
        }
    },

    async updateFieldsById(id,fields){
        var document = await this.getDocumentById(id);
        await firebase.fs.collection(this.collection).doc(document).update(fields)
    },

    async insert(inputs) {
        await firebase.fs.collection(this.collection).add(inputs);
    },

    async findPhrase(phrase) {
        var query = await firebase.fs.collection(this.collection)
                            .where('phrase','==', phrase)
                            .get();
        var docs = query.docs;
        if (!helpers.isEmptyObject(docs)) {
            return docs[0].data();
        } else {
            return '';
        }
    },

    async getPhraseList(){
        var query = await firebase.fs.collection(this.collection)
                            .orderBy('updated_at', 'desc')
                            .orderBy('id', 'desc')
                            .get();

        var list = [];
        var docs = query.docs;
        await docs.forEach(doc =>  {
            var docItem = doc.data();
            list.push(docItem);
        });

        const promises = list.map(async listItem => {
            var item = listItem;
            item.updated_at = helpers.formatDate(item.updated_at);
            return item;
        });

        var finalList = await Promise.all(promises)
        return  [...finalList];
    },
}

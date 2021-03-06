'use strict'
import helpers from "@/app/helpers/helpers";
import subject from "@/app/models/subject";

const firebase = require('@/app/config/firebase');

export default {
    collection: "word",

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

    async getWordById(id) {
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

    async isExitWord(wordItem) {
        var query = await firebase.fs.collection(this.collection)
                            .where('word', '==', wordItem)
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
    
    async deleteWord(word) {
        var query = await firebase.fs.collection(this.collection)
                            .where('word','==', word)
                            .get();
        query.docs.forEach(function(doc) {
            doc.ref.delete();
        });
    },
    async findWord(word) {
        var query = await firebase.fs.collection(this.collection)
                            .where('word','==', word)
                            .get();
        var docs = query.docs;
        if (!helpers.isEmptyObject(docs)) {
            return docs[0].data();
        } else {
            return '';
        }
    },

    async getWordList(){
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
            item.subject_name = await subject.getSubjectNameFromId(listItem.subject_id);
            item.updated_at = helpers.formatDate(item.updated_at);
            return item;
        });

        var finalList = await Promise.all(promises)
        return  [...finalList];
    },

    async getWordListBySubjectId(subjectId){
        var idInt = parseInt(subjectId);
        var query = await firebase.fs.collection(this.collection)
                        .where('subject_id',"==", idInt)
                        .orderBy('updated_at', 'desc')
                        .orderBy('id', 'desc')
                        .get();

        var list = [];
        var docs = query.docs;
        await docs.forEach(doc =>  {
            var docItem = doc.data();
            list.push(docItem);
        });

        return  [...list];
    },
}

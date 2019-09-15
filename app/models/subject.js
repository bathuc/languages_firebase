'use strict'
import helpers from "@/app/helpers/helpers";

const firebase = require('@/app/config/firebase');

export default {
    collection: "subject",

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

    async getSubjectOption() {
        var query = await firebase.fs.collection(this.collection)
                            .orderBy('id')
                            .get();

        var options = [];
        var docs = query.docs;
        await docs.forEach(doc => {
            var docItem = doc.data();
            // docItem.id = doc.id;
            options.push(docItem);
        });

        return options;
    },

    async isExitNameVi(name) {
        var query = await firebase.fs.collection(this.collection)
                            .where('name_vi', '==', name)
                            .get();
        var docs = query.docs;

        if (!helpers.isEmptyObject(docs)) {
            return true;
        } else {
            return false;
        }
    },

    async isExitNameEn(name) {
        var query = await firebase.fs.collection(this.collection)
                            .where('name_en', '==', name)
                            .get();
        var docs = query.docs;

        if (!helpers.isEmptyObject(docs)) {
            return true;
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

    async getSubjectNameFromId(id){
        var idInt = parseInt(id);
        var query = await firebase.fs.collection(this.collection)
                        .where('id', '==', idInt)
                        .get();

        var docs = query.docs;

        if (!helpers.isEmptyObject(docs)) {
            return docs[0].data().name_vi;
        } else {
            return '';
        }
    },

    async getSubjectById(id){
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

    async insert(inputs) {
        await firebase.fs.collection(this.collection).add(inputs);
    },

    async getSubjectList(){
        var query = await firebase.fs.collection(this.collection)
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

    async updateFieldsById(id,fields){
        var document = await this.getDocumentById(id);
        await firebase.fs.collection(this.collection).doc(document).update(fields)
    },

}

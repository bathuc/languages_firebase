'use strict'
import helpers from "@/app/helpers/helpers";

const firebase = require('@/app/config/firebase');

export default {
    collection: "subject",

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
        var query = await firebase.fs.collection(this.collection)
                        .where('id', '==', id)
                        .get();

        var docs = query.docs;

        if (!helpers.isEmptyObject(docs)) {
            return docs[0].data().name_vi;
        } else {
            return '';
        }
    },

    async insert(inputs) {
        await firebase.fs.collection(this.collection).add(inputs);
    },


}

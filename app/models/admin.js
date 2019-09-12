'use strict'
import helpers from "@/app/helpers/helpers";

const firebase = require('@/app/config/firebase');

export default {
    collection: "admin",

    async getDocumentByEmail(email) {
        var query = await firebase.fs.collection(this.collection)
        .where('email', '==', email)
        .get();
        var docId = '';
        try {
            docId = await query.docs[0].id;
        } catch (e) {
        }

        return docId;
    },

    async getDataByEmail(email) {
        var query = await firebase.fs.collection(this.collection)
        .where('email', '==', email)
        .get();
        let docs = await query.docs;
        // not empty
        if (!helpers.isEmptyObject(docs)) {
            const doc = docs[0];
            const data = doc.data();

            return {
                ...data,
                doc_id: doc.id
            };
        }

        return {};
    },

    async getDataById(id) {
        var doc = await firebase.fs.collection(this.collection).doc(id).get();
        // not empty
        if (!helpers.isEmptyObject(doc)) {
            return doc.data();
        }

        return {};
    },

    async updateFieldsByEmail(email, fields) {
        var document = await this.getDocumentByEmail(email);
        if (document) {
            await firebase.fs.collection(this.collection).doc(document).update(fields)
        }
    },

    async saveAdmin(inputs) {
        console.log('inputs', inputs);
        await firebase.fs.collection(this.collection).add(inputs);
    },

    async refreshToken(email) {
        try {
            var fields = {
                token: helpers.getToken()
            }
            await this.updateFieldsByEmail(email, fields);
        } catch (e) {

        }

    }
}

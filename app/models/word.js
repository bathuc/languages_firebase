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

}

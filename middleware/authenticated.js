import admin from '@/app/models/admin';
import helpers from "@/app/helpers/helpers";

export default async function ({ store, redirect, route, res}) {

    let user = await store.state.user;
    let isEmptyUser = helpers.isEmptyObject(user);
    var validTokenFlg = true;

    console.log('user authen', user);

    // user has data
    if(!isEmptyUser){
        let adminAccount = await admin.getDataByEmail(user.email);
        console.log('admin', adminAccount);
        let emptyAdmin = helpers.isEmptyObject(admin);
        if (!emptyAdmin) {
            // adminLog has data
            if(user.token != adminAccount.token) {
                // invalid
                validTokenFlg = false;
            }

            if(adminAccount.expire_at <= Date.now()){
                // expire
                await admin.refreshToken(user.email);
                validTokenFlg = false;
            }
        }else{
            // empty data
            validTokenFlg = false;
        }
    }
    else{
        // user don't have data
        validTokenFlg = false;
    }

    if(!validTokenFlg){
        await store.commit('removeUser');
        return redirect('/login')
    }
}

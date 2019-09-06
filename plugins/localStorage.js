import createPersistedState from 'vuex-persistedstate'
// import Cookies from 'js-cookie'

export default ({store}) => {
    createPersistedState()(store)
    /*createPersistedState({
        storage: {
            getItem: key => Cookies.get(key),
            setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: false }),
            removeItem: key => Cookies.remove(key)
        }
    })(store)*/
}

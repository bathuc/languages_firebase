import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            user: {}
        }),
        mutations: {
            addUser (state, {user}) {
                state.user = user;
            },
            updateUser (state, {fields}) {
                state.user = {
                    ... state.user,
                    ... fields
                };
            },
            removeUser(state) {
                state.user = {};
            }
        },
        actions: {
            addUser (context, {user}) {
                context.commit('addUser', user)
            }
        },
        plugins: [
            createPersistedState(),
        ]
    })
}

export default createStore

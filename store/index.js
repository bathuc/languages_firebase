import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import currentRoute from './currentRoute';
import utility from './utility';

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
            /*createPersistedState({
                  storage: {
                      getItem: key => Cookies.get(key),
                      setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: false }),
                      removeItem: key => Cookies.remove(key)
                  }
              })*/
        ],
        modules: {
          currentRoute: currentRoute,
            utility: utility,
        }
    })
}

export default createStore

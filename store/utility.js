var utility = {
    namespaced: true,
    state: () => ({
        hambugerClick: false,
    }),
    mutations: {
        setHambugerClick (state, hambugerClick) {
            state.hambugerClick = hambugerClick;
        },
    }
}

export default utility;

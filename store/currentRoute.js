var currentRoute = {
    namespaced: true,
    state: () => ({
        route: '',
    }),
    mutations: {
        setRoute (state, route) {
            state.route = route;
        },
    }
}

export default currentRoute;

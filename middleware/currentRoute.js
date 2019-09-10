
export default function ({ store, redirect, route, res}) {
    store.commit('currentRoute/setRoute', route.fullPath);
};

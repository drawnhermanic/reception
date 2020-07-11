import Vue from 'vue';
import Vuex from 'vuex';
import { checkAuth, signout, getNav, createVisit, getVisitors, endVisit, getUser } from '~/shared/gateway';
import { UserAttributes } from '@servicestack/client';

export const state = {
    loading: false,
    visit: {},
    nav: null,
    userSession: null,
    userAttributes: [],
    roles: [],
    permissions: [],
    visitors: [],
    user: {}
  };

const mutations = {
    loading(state, loading) {
        state.loading = loading;
    },
    visit(state, visit) {
        state.visit = visit;
    },
    nav(state, nav) {
        state.nav = nav;
    },
    userSession(state, userSession) {
        state.userSession = userSession;
        state.userAttributes = userSession ? UserAttributes.fromSession(userSession) : null;
    },
    visitors(state, visitors) {
        state.visitors = visitors;
    },
    user(state, user) {
        state.user = user;
    }
}

const getters = {
    loading: state => state.loading,
    nav: (state) => state.nav || {},
    userSession: (state) => state.userSession,
    userAttributes: (state) => state.userAttributes || [],
    visitors: (state) => state.visitors,
    visit: (state) => state.visit,
    user: (state) => state.user
};

const actions = {
    async nuxtClientInit({ commit }, { req }) {
        var navItems = getNav();
        var authResponse = checkAuth();

        commit('nav', await navItems);
        commit('userSession', await authResponse);
    },

    async getNav({ commit }) {
        commit('loading', true);
        commit('nav', await getNav());
        commit('loading', false);
    },

    async getUser({ commit }) {
        commit('loading', true);
        commit('user', await getUser());
        commit('loading', false);
    },

    async createVisit({ commit }, request) {
        commit('loading', true);
        commit('visit', await createVisit(request));
        commit('loading', false);
    },

    async endVisit({ commit }, request) {
        commit('loading', true);
        await endVisit(request);
        commit('visit', null);
        commit('loading', false);
    },

    async getVisitors({ commit }) {
        commit('loading', true);
        commit('visitors', await getVisitors());
        commit('loading', false);
    },

    signin({ commit }, userSession) {
        commit('userSession', userSession);
    },

    async signout({ commit }) {
        await signout();
        commit('userSession', null);
    },
};

const createStore = () => 
    new Vuex.Store({
        state,
        mutations,
        getters,
        actions
    });

export default createStore;

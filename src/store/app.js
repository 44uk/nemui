import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const DEFAULT_TESTNET_NODES = [
  'bigalice2.nem.ninja',
  '192.3.61.243',
  '23.228.67.85',
  '50.3.87.123',
  'nis-testnet.44uk.net'
]

const DEFAULT_MAINNET_NODES = [
  '62.75.171.41',
  'san.nem.ninja',
  'go.nem.ninja',
  'hachi.nem.ninja',
  'jusan.nem.ninja',
  'nijuichi.nem.ninja',
  'alice2.nem.ninja',
  'alice3.nem.ninja',
  'alice4.nem.ninja',
  'alice5.nem.ninja',
  'alice6.nem.ninja',
  'alice7.nem.ninja',
  'shibuya.supernode.me'
]

const DEFAULT_MIJIN_NODES = [
]

export default new Vuex.Store({
  debug: true,
  plugins: [
    createPersistedState({
      key: 'nemui-state'
    })
  ],
  state: {
    view: {
      network: 'testnet'
    },
    current: {},
    testnet: {
      maxHeight: 0,
      nodes: DEFAULT_TESTNET_NODES,
      accounts: [],
      mosaicDefinitions: {}
    },
    mainnet: {
      maxHeight: 0,
      nodes: DEFAULT_MAINNET_NODES,
      accounts: [],
      mosaicDefinitions: {}
    },
    mijin: {
      maxHeight: 0,
      nodes: DEFAULT_MIJIN_NODES,
      accounts: [],
      mosaicDefinitions: {}
    }
  },
  getters: {
    nodeModal: state => state.view.nodeModal,
    accountModal: state => state.view.accountModal,

    nodes: state => state.current.nodes,
    accounts: state => state.current.accounts,

    mosaicDefinitions: state => state.current.mosaicDefinitions,
    network: state => state.view.network
  },
  mutations: {
    setNetwork (state, network) {
      state.view.network = network
      state.current = state[state.view.network]
    },
    addNode (state, node) {
      state.current.nodes.unshift(`${node.host}`)
    },
    removeNode (state, node) {
      state.current.nodes = _.filter(
        state.current.nodes,
        (el) => el !== node
      )
    },
    addAccount (state, account) {
      state.current.accounts.unshift(account)
    },
    removeAccount (state, account) {
      state.current.accounts = _.filter(
        state.current.accounts,
        (el) => !_.isEqual(el, account)
      )
    },
    cacheMosaicDefinition (state, def) {
      state.current.mosaicDefinitions[def.fqn] = def
    }
  },
  actions: {
    resetState: ({commit}, payload) => commit('setNetwork', payload),
    setNetwork: ({commit}, payload) => commit('setNetwork', payload),

    addNode: ({commit}, payload) => commit('addNode', payload),
    removeNode: ({commit}, payload) => commit('removeNode', payload),

    addAccount: ({commit}, payload) => commit('addAccount', payload),
    removeAccount: ({commit}, payload) => commit('removeAccount', payload),

    cacheMosaicDefinition: ({commit}, payload) => commit('cacheMosaicDefinition', payload)
  }
})

<template lang="pug">
  #app
    el-container
      el-header
        div(style="float: left")
          img(src="./assets/logo.svg" height="18")
          span nemui
        div(style="text-align: right; font-size: 12px")
          el-select(size="mini" v-model="selectedNetwork" @change="changeNetwork")
            el-option(label="testnet" value="testnet")
            el-option(label="mainnet" value="mainnet")
            el-option(label="mijin" value="mijin")
          el-button(type="primary" icon="el-icon-edit" size="mini"
            @click="accountModal = true"
          ) Account
          el-button(type="primary" icon="el-icon-share" size="mini"
            @click="nodeModal = true"
          ) Node
      el-main
        account-collection(:accounts="accounts")

    el-dialog(title="Add Account" :visible.sync="accountModal")
      account-form(:network="network" :nodes="nodes")

    el-dialog(title="Add Node" :visible.sync="nodeModal")
      node-form(:network="network" :nodes="nodes")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import NodeForm from '@/components/NodeForm'
import AccountForm from '@/components/AccountForm'
import AccountCollection from '@/components/AccountCollection'

export default {
  name: 'app',
  components: {
    NodeForm,
    AccountForm,
    AccountCollection
  },
  data: function () {
    return {
      selectedNetwork: null,
      nodeModal: false,
      accountModal: false
    }
  },
  computed: {
    ...mapGetters([
      'accounts',
      'nodes',
      'network'
    ])
  },
  methods: {
    ...mapActions([
      'openNodeModal',
      'closeNodeModal',
      'openAccountModal',
      'closeAccountModal',
      'setNetwork'
    ]),
    changeNetwork () {
      this.setNetwork(this.selectedNetwork)
    }
  },
  created: function () {
    this.selectedNetwork = this.network
    this.setNetwork(this.selectedNetwork)
  }
}
</script>

<style scoped>
.el-header {
  padding: 10px 20px;
}
.el-main {
  padding: 10px 20px;
}
</style>

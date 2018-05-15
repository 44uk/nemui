<template lang="pug">
  el-card(:body-style="{padding: '10px 20px'}")
    div(slot="header")
      span {{ address | splitAddressByHyphen }}
      | &nbsp;
      el-tag(type="success" size="mini" v-if="isCosignatory") Cosignatory
      | &nbsp;
      el-tag(type="warning" size="mini" v-if="isMultisig") Multisig
      | &nbsp;
      el-tag(size="mini" v-if="isMultisig")
        | {{msigInfo.minCosignatories }}of{{ msigInfo.cosignatoriesCount}}
      | &nbsp;
      el-tag(type="danger" size="mini" v-if="is2of2Multisig")
        i.el-icon-warning

      el-button(icon="el-icon-delete" size="mini"
        type="danger"
        style="float: right"
        @click="remove()"
      )
      el-button(icon="el-icon-refresh" size="mini"
        type="success"
        style="float: right; margin-right: 0.5em"
        @click="refresh()"
      )

    el-tabs(v-model="activeTab")
      el-tab-pane(label="Unconfirmed" name="unconfirmed")
        span(slot="label")
          el-badge(:is-dot="true" :hidden="unconfirmed.length === 0") Unconfirmed
        transaction-collection(:items="unconfirmed" :address="address")

      el-tab-pane(label="Transactions" name="transactions")
        transaction-collection(:items="transactions" :address="address")

      el-tab-pane(label="Mosaics" name="mosaics")
        mosaic-collection(:items="mosaics")

      el-tab-pane(label="Account" name="account")
        account-info(:info="info"
         :node="node"
         :height="height"
        )

      el-tab-pane(label="Cosignatories" name="cosignatories" v-if="isMultisig")
        cosignatoryCollection(:items="info.cosignatories")

      el-tab-pane(label="CosignatoryOf" name="cosignatoryOf" v-if="isCosignatory")
        signatoryCollection(:items="info.cosignatoryOf")

      el-tab-pane(v-if="false" label="Config" name="config")
        config
</template>

<script>
import _ from 'lodash'
import nem from 'nem-sdk'
import { mapGetters, mapActions } from 'vuex'

import AccountInfo from '@/components/AccountInfo'
import TransactionCollection from '@/components/TransactionCollection'
import MosaicCollection from '@/components/MosaicCollection'
import CosignatoryCollection from '@/components/CosignatoryCollection'
import SignatoryCollection from '@/components/SignatoryCollection'
import Config from '@/components/Config'

import {
  rebuildMosaicProps,
  splitAddressByHyphen
} from '@/helpers/format.js'

const NOTIFICATION_DURATION = 1800
const NEM_WS = nem.com.websockets

export default {
  components: {
    AccountInfo,
    TransactionCollection,
    MosaicCollection,
    CosignatoryCollection,
    SignatoryCollection,
    Config
  },
  filters: {
    splitAddressByHyphen
  },
  props: {
    address: String,
    node: String
  },
  data: function () {
    return {
      unconfirmed: [],
      transactions: [],
      mosaics: [],
      info: {
        status: 'unknown...',
        remoteStatus: 'unknown...',
        balance: 0,
        vestedBalance: 0,
        publicKey: 'unknown...',
        importance: 0,
        cosignatories: [],
        cosignatoryOf: [],
        multisigInfo: {}
      },
      height: 0,
      activeTab: 'transactions'
    }
  },
  beforeMount: function () {
    const wsEndpoint = nem.model.objects.create('endpoint')(
      `http://${this.node}`,
      nem.model.nodes.websocketPort
    )
    // const httpEndpoint = nem.model.objects.create('endpoint')(
    //   `http://${this.node}`,
    //   nem.model.nodes.defaultPort
    // )
    this.connector = NEM_WS.connector.create(
      wsEndpoint,
      this.address
    )
    this.connect()
  },
  mounted: function () {
  },
  beforeUpdate: function () {
  },
  updated: function () {
  },
  beforeDestroy: function () {
    this.disconnect()
  },
  computed: {
    ...mapGetters([
      'mosaicDefinitions'
    ]),
    msigInfo: function () {
      return this.info.multisigInfo
    },
    isMultisig: function () {
      return this.info.cosignatories.length > 0
    },
    isCosignatory: function () {
      return this.info.cosignatoryOf.length > 0
    },
    is2of2Multisig: function () {
      return this.isMultisig &&
        this.msigInfo.cosignatoriesCount === 2 &&
        this.msigInfo.minCosignatories === 2
    }
  },
  methods: {
    ...mapActions([
      'removeAccount',
      'cacheMosaicDefinition'
    ]),
    connect () {
      this.connector.connect().then(() => {
        // console.log('--- connected')
        this.enableSound && this.playSound('connected.ogg')

        this.$notify({
          type: 'success',
          title: this.node,
          message: splitAddressByHyphen(this.address),
          position: 'bottom-left',
          duration: NOTIFICATION_DURATION
        })

        NEM_WS.subscribe.errors(this.connector, this.onError)
        NEM_WS.subscribe.account.data(this.connector, this.onReceivedAccountData)
        NEM_WS.subscribe.account.mosaics.owned(this.connector, this.onReceivedOwnedMosaics)
        NEM_WS.subscribe.account.transactions.recent(this.connector, this.onReceivedRecent)
        NEM_WS.subscribe.account.transactions.unconfirmed(this.connector, this.onReceivedUnconfirmed)
        NEM_WS.subscribe.account.transactions.confirmed(this.connector, this.onReceivedConfirmed)
        // NEM_WS.subscribe.account.namespaces.owned(this.connector, res => {
        //   console.log('namespace -----')
        //   console.log(res)
        //   console.log('/namespace -----')
        // })
        NEM_WS.subscribe.account.mosaics.definitions(this.connector, this.onReceivedMosaicDefinition)
        NEM_WS.subscribe.chain.height(this.connector, this.onReceivedChainHeight)

        NEM_WS.requests.account.data(this.connector)
        NEM_WS.requests.account.transactions.recent(this.connector)
        NEM_WS.requests.account.mosaics.definitions(this.connector)
        // NEM_WS.requests.account.namespaces.owned(this.connector)
      })
    },
    disconnect () {
      this.connector.close()
      this.enableSound && this.playSound('disconnected.ogg')
      this.$notify({
        type: 'info',
        title: this.node,
        message: splitAddressByHyphen(this.address),
        position: 'bottom-left',
        duration: NOTIFICATION_DURATION
      })
      console.log(`${this.address} is disconnected.`)
    },
    refresh () {
      this.disconnect()
      this.unconfirmed = []
      this.transactions = []
      this.mosaics = []
      this.connect()
    },
    remove () {
      this.removeAccount({
        address: this.address,
        node: this.node
      })
    },
    onReceivedRecent (res) {
      // console.log('recent -----')
      // console.log(res)
      this.transactions = this.transactions.concat(res.data)
      this.enableSound && this.playSound('confirmed.ogg')
    },
    onReceivedUnconfirmed (res) {
      // console.log('unconfirmed -----')
      // console.log(res)
      this.unconfirmed.unshift(res)
      this.unconfirmed = _.uniqBy(this.unconfirmed, trans => {
        return trans.meta.hash.data
      })

      this.enableSound && this.playSound('unconfirmed.ogg')
    },
    onReceivedConfirmed (res) {
      // console.log('confirmed -----')
      // console.log(res)
      this.unconfirmed = this.unconfirmed.filter(trans => {
        return trans.meta.hash.data !== res.meta.hash.data
      })
      this.transactions.unshift(res)
      this.transactions = _.uniqBy(this.transactions, trans => {
        return trans.meta.hash.data
      })

      if (!this.hasMosaicDefinitionCache(res)) {
        NEM_WS.requests.account.mosaics.definitions(this.connector)
      }
      NEM_WS.requests.account.mosaics.owned(this.connector)

      this.enableSound && this.playSound('confirmed.ogg')
    },
    onReceivedMosaicDefinition (res) {
      const supply = res.supply
      const def = res.mosaicDefinition
      const fqn = nem.utils.format.mosaicIdToName(def.id)
      const redef = {
        fqn,
        ...def,
        ...rebuildMosaicProps(def.properties),
        supply
      }
      this.cacheMosaicDefinition(redef)
      NEM_WS.requests.account.mosaics.owned(this.connector)
    },
    onReceivedOwnedMosaics (res) {
      // console.log('-- onReceivedOwnedMosaics')
      res['fqn'] = nem.utils.format.mosaicIdToName(res.mosaicId)
      this.mosaics = _.sortBy(_.unionBy([res], this.mosaics, 'fqn'), 'fqn')
    },
    onReceivedAccountData (res) {
      // console.log('-- onReceivedAccountData')
      // console.log(res)
      this.info = {
        ...res.meta,
        ...res.account
      }
    },
    onReceivedChainHeight (res) {
      // console.log('-- onReceivedChainHeight')
      this.height = res.height
    },
    onError (res) {
      console.error(res)
    },
    hasMosaicDefinitionCache (fqn) {
      return !!this.mosaicDefinitions[fqn]
    },
    playSound (name) {
      new Audio(require(`@/assets/sound/${name}`)).play()
    }
  }
}
</script>

<style>
.el-badge__content.is-fixed.is-dot {
  right: 0;
  top: 5px;
}
.el-card__header {
  padding: 15px 20px;
}
</style>

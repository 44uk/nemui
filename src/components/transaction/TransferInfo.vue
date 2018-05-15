<template lang="pug">
  div
    el-row
      el-col(:span="4") Recipient
      el-col(:span="20") {{ recipient | splitAddressByHyphen }}
    el-row(v-if="!isMosaicTransfer")
      el-col(:span="4") Amount
      el-col(:span="20") {{ amount | nemValue }} xem
    el-row(v-if="message.payload")
      el-col(:span="4") Message
      el-col(:span="20") {{ messageDecoded }}
    el-row(v-if="message.payload")
      el-col(:span="4") MessageType
      el-col(:span="20") {{ messageTypeName }}
    el-row(v-if="isMosaicTransfer")
      el-col(:span="4") Mosaics
      el-col(:span="20")
        ul
          li(v-for="moa in prettifiedMosaics" :key="moa.fqn")
            span {{ moa.fqn }}
            span {{ moa.quantity }}
</template>

<script>
import nem from 'nem-sdk'
import { mapGetters } from 'vuex'
import {
  splitAddressByHyphen,
  nemtime2iso8601,
  nemValue
} from '@/helpers/format.js'

export default {
  name: 'transfer-info',
  filters: {
    splitAddressByHyphen,
    nemtime2iso8601,
    nemValue
  },
  props: {
    recipient: String,
    amount: Number,
    message: Object,
    mosaics: Array
  },
  data: function () {
    return {
    }
  },
  computed: {
    isMosaicTransfer: function () {
      return !!this.mosaics && this.mosaics.length > 0
    },
    messageTypeName: function () {
      return this.message.type === 2 ? 'Encrypted'
        : /^fe[0-9a-f]*?$/.test(this.message.payload) ? 'Hexdecimal'
          : 'Plain'
    },
    messageDecoded: function () {
      const payload = this.message.payload
      return this.messageTypeName === 'Encrypted' ? payload
        : this.messageTypeName === 'Hexdecimal'
          ? payload
          : nem.utils.format.hexToUtf8(payload)
    },
    prettifiedMosaics: function () {
      return this.mosaics.map(el => {
        const fqn = nem.utils.format.mosaicIdToName(el.mosaicId)
        const def = this.mosaicDefinitions[fqn]
        const quantity = el.quantity / 10 ** def.divisibility
        return {
          fqn,
          quantity,
          ...el.mosaicId
        }
      })
    },
    ...mapGetters([
      'mosaicDefinitions'
    ])
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

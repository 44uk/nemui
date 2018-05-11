<template lang="pug">
  div
    el-row
      el-col(:span="4" ) Fee
      el-col(:span="20") {{ fee | nemValue }} xem
    el-row
      el-col(:span="4" ) Timestamp
      el-col(:span="20") {{ timeStamp | nemtime2iso8601 }}
    el-row
      el-col(:span="4" ) Deadline
      el-col(:span="20") {{ deadline | nemtime2iso8601 }}
    el-row
      el-col(:span="4" ) Block
      el-col(:span="20") <a :href="blockUrl" target="_blank">{{ block }}</a>
    el-row
      el-col(:span="4" ) Hash
      el-col(:span="20") {{ hash }}
    el-row
      el-col(:span="4" ) Signer
      el-col(:span="20")
        | {{ signer }}
        br
        | {{ signer | publicKeyToAddress(network) | splitAddressByHyphen }}
</template>

<script>
import {
  publicKeyToAddress,
  splitAddressByHyphen,
  nemtime2iso8601,
  nemValue,
  explorerBlockUrl
} from '@/helpers/format.js'
import { mapGetters } from 'vuex'

export default {
  name: 'transaction-info',
  filters: {
    splitAddressByHyphen,
    publicKeyToAddress,
    nemtime2iso8601,
    nemValue
  },
  props: {
    block: Number,
    hash: String,
    timeStamp: Number,
    deadline: Number,
    signer: String,
    fee: Number
  },
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'network'
    ]),
    blockUrl: function () {
      return explorerBlockUrl(this.block, this.network)
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

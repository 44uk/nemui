<template lang="pug">
  div
    el-row
      el-col(:span="4") Signer
      el-col(:span="20")
        | {{ signer }}
        br
        | {{ signer | publicKeyToAddress(network) | splitAddressByHyphen }}
    el-row
      el-col(:span="4") Timestamp
      el-col(:span="20") {{ timeStamp | nemtime2iso8601 }}
    el-row
      el-col(:span="4") Deadline
      el-col(:span="20") {{ deadline | nemtime2iso8601 }}
    el-row
      el-col(:span="4") Other Account
      el-col(:span="20") {{ otherAccount | splitAddressByHyphen }}
</template>

<script>
import {
  publicKeyToAddress,
  splitAddressByHyphen,
  nemtime2iso8601
} from '@/helpers/format.js'
import { mapGetters } from 'vuex'

export default {
  name: 'signature-info',
  filters: {
    splitAddressByHyphen,
    publicKeyToAddress,
    nemtime2iso8601
  },
  props: {
    timeStamp: Number,
    signer: String,
    deadline: Number,
    otherAccount: String
  },
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'network'
    ])
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

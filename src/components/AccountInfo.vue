<template lang="pug">
  div(style="height: 320px")
    el-row
      el-col(:span="4") Balance
      el-col(:span="8") {{ info.balance | nemValue }}&nbsp;xem
      el-col(:span="4") Status
      el-col(:span="8") {{ info.status }}

    el-row
      el-col(:span="4") Vested Balance
      el-col(:span="8") {{ info.vestedBalance | nemValue }}&nbsp;xem
      el-col(:span="4") Remote Status
      el-col(:span="8") {{ info.remoteStatus }}

    el-row
      el-col(:span="4") Importance
      el-col(:span="8") {{ info.importance | importanceScore }}&nbsp;&permil;

    el-row
      el-col(:span="4") Public Key
      el-col(:span="8") {{ info.publicKey }}

    el-row
      el-col(:span="4") Connected Node
      el-col(:span="8") {{ node }}

    el-row
      el-col(:span="4") Current Height
      el-col(:span="8") {{ height }}
</template>

<script>
import nem from 'nem-sdk'
import { nemValue } from '@/helpers/format.js'

export default {
  name: 'account-info',
  filters: {
    nemValue,
    importanceScore: function (value) {
      return nem.utils.format.nemImportanceScore(value).join('.')
    }
  },
  props: {
    info: Object,
    node: String,
    height: Number
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

<template lang="pug">
  div
    el-row
      el-col(:span="4") Remote Account
      el-col(:span="20")
        | {{ remoteAccount }}
        br
        | {{ remoteAccount | publicKeyToAddress | splitAddressByHyphen }}
    el-row
      el-col(:span="4") Mode
      el-col(:span="20") {{ mode | modeToName }}
</template>

<script>
import {
  splitAddressByHyphen,
  publicKeyToAddress,
  nemtime2iso8601,
  modeToName,
  nemValue
} from '@/helpers/format.js'

export default {
  name: 'importance-transfer-info',
  filters: {
    splitAddressByHyphen,
    publicKeyToAddress,
    nemtime2iso8601,
    modeToName,
    nemValue
  },
  components: {
  },
  props: {
    remoteAccount: String,
    mode: Number
  },
  data: function () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

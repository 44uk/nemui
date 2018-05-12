<template lang="pug">
  div
    el-row
      el-col(:span="4") Relative Change
      el-col(:span="20") {{ relativeChange }}

    el-row
      el-col(:span="4">Modifications)
      el-col(:span="20")
        el-row(v-for="mod in modifications" :key="mod.cosignatoryAccount")
          el-col(:span="2") Type
          el-col(:span="2") {{ mod.modificationType | modificationTypeToName }}
          el-col(:span="4") Account
          el-col(:span="16") {{ mod.cosignatoryAccount | publicKeyToAddress(network) }}
</template>

<script>
import {
  modificationTypeToName,
  publicKeyToAddress,
  nemtime2iso8601,
  nemValue
} from '@/helpers/format.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'multisig-aggregate-modification-info',
  filters: {
    modificationTypeToName,
    publicKeyToAddress,
    nemtime2iso8601,
    nemValue
  },
  components: {
    ...mapGetters([
      'network'
    ])
  },
  props: {
    relativeChange: Number,
    modifications: Array,
    data: Object
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

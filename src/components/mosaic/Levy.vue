<template lang="pug">
  div
    el-row
      el-col(:span="4" ) Mosaic
      el-col(:span="20") {{ mosaicId | mosaicIdToFqn }}
    el-row
      el-col(:span="4" ) Recipient
      el-col(:span="20") {{ recipient | splitAddressByHyphen }}
    el-row
      el-col(:span="4" ) Fee
      el-col(:span="20") {{ levyFee }}
    el-row
      el-col(:span="4" ) Type
      el-col(:span="20") {{ type | levyTypeToName }}
</template>

<script>
import {
  splitAddressByHyphen,
  levyTypeToName,
  mosaicIdToFqn
} from '@/helpers/format.js'
import { mapGetters } from 'vuex'

export default {
  name: 'levy',
  filters: {
    splitAddressByHyphen,
    levyTypeToName,
    mosaicIdToFqn
  },
  props: {
    mosaicId: Object,
    recipient: String,
    fee: Number,
    type: Number
  },
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'mosaicDefinitions'
    ]),
    levyFee: function () {
      const fqn = mosaicIdToFqn(this.mosaicId)
      const def = this.mosaicDefinitions[fqn]
      return this.fee / 10 ** def.divisibility
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

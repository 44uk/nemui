<template lang="pug">
  div
    el-row
      el-col(:span="4") Mosaic
      el-col(:span="20") {{ mosaicDefinition.id | mosaicIdToFqn }}
    el-row
      el-col(:span="4") Creation Fee Sink
      el-col(:span="20") {{ creationFeeSink | splitAddressByHyphen }}
    el-row
      el-col(:span="4") Creation Fee
      el-col(:span="20") {{ creationFee | nemValue }} xem

    el-row
      el-col(:span="4") Description
      el-col(:span="20") {{ mosaicDefinition.description }}

    el-row
      el-col(:span="4") Properties
      el-col(:span="20")
        el-row(v-for="prop in mosaicDefinition.properties" :key="prop.name")
          el-col(:span="4") {{ prop.name }}
          el-col(:span="20") {{ prop.value }}

    el-row(v-if="mosaicDefinition.levy.recipient")
      el-col(:span="4") Levy
      el-col(:span="20")
        levy(
          :fee="mosaicDefinition.levy.fee"
          :recipient="mosaicDefinition.levy.recipient"
          :type="mosaicDefinition.levy.type"
          :mosaicId="mosaicDefinition.levy.mosaicId"
        )
</template>

<script>
import {
  splitAddressByHyphen,
  nemtime2iso8601,
  mosaicIdToFqn,
  nemValue
} from '@/helpers/format.js'
import Levy from '@/components/mosaic/Levy'

export default {
  name: 'mosaic-definition-creation-info',
  filters: {
    splitAddressByHyphen,
    nemtime2iso8601,
    mosaicIdToFqn,
    nemValue
  },
  components: {
    Levy
  },
  props: {
    creationFee: Number,
    creationFeeSink: String,
    mosaicDefinition: Object,
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

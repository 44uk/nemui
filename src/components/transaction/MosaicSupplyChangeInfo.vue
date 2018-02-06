<template>
  <div>
    <el-row>
      <el-col :span="4">Mosaic</el-col>
      <el-col :span="20">{{ mosaicId | mosaicIdToFqn }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Supply Type</el-col>
      <el-col :span="20">{{ supplyType | supplyTypeToName }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Delta</el-col>
      <el-col :span="20">{{ delta }}</el-col>
    </el-row>
  </div>
</template>

<script>
import {
  supplyTypeToName,
  nemtime2iso8601,
  mosaicIdToFqn,
  nemValue
} from '@/helpers/format.js'

export default {
  name: 'mosaic-supply-change-info',
  filters: {
    supplyTypeToName,
    nemtime2iso8601,
    mosaicIdToFqn,
    nemValue
  },
  components: {
  },
  props: {
    data: Object,
    mosaicId: Object,
    supplyType: Number,
    delta: Number
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

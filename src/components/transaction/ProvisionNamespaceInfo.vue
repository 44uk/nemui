<template>
  <div>
    <el-row>
      <el-col :span="4">Parent</el-col>
      <el-col :span="20">{{ parent }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">NewPart</el-col>
      <el-col :span="20">{{ newPart }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Rental Fee Sink</el-col>
      <el-col :span="20">{{ rentalFeeSink | splitAddressByHyphen }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Rental Fee</el-col>
      <el-col :span="20">{{ rentalFee | nemValue }} xem</el-col>
    </el-row>
  </div>
</template>

<script>
import {
  splitAddressByHyphen,
  nemtime2iso8601,
  nemValue
} from '@/helpers/format.js'

export default {
  name: 'provision-namespace-info',
  filters: {
    splitAddressByHyphen,
    nemtime2iso8601,
    nemValue
  },
  components: {
  },
  props: {
    parent: String,
    newPart: String,
    rentalFee: Number,
    rentalFeeSink: String,
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

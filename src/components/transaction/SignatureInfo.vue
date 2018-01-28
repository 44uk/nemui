<template>
  <div>
    <el-row>
      <el-col :span="4">Signer</el-col>
      <el-col :span="20">{{ signer }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Timestamp</el-col>
      <el-col :span="20">{{ timeStamp | nemtime2iso8601 }}</el-col>
    </el-row>
  </div>
</template>

<script>
import {
  nemtime2iso8601
} from '@/helpers/format.js'

export default {
  name: 'signature-info',
  filters: {
    nemtime2iso8601: nemtime2iso8601
  },
  props: {
    signer: String,
    timeStamp: Number,

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

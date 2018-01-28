<template>
  <div>
    <el-row>
      <el-col :span="6">Timestamp</el-col>
      <el-col :span="18">{{ timeStamp | nemtime2iso8601 }} </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">Deadline</el-col>
      <el-col :span="18">{{ deadline | nemtime2iso8601 }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="6">Block</el-col>
      <el-col :span="18"><a :href="blockUrl" target="_blank">{{ block }}</a></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">Hash</el-col>
      <el-col :span="18">{{ hash }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="6">Signer</el-col>
      <el-col :span="18">{{ signer }}</el-col>
    </el-row>
  </div>
</template>

<script>
import {
  nemtime2iso8601,
  explorerBlockUrl
} from '@/helpers/format.js'
import { mapGetters } from 'vuex'

export default {
  name: 'transaction-info',
  filters: {
    nemtime2iso8601: nemtime2iso8601
  },
  props: {
    block: Number,
    hash: String,
    timeStamp: Number,
    deadline: Number,
    signer: String
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

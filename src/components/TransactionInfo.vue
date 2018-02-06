<template>
  <div>
    <el-row>
      <el-col :span="4">Fee</el-col>
      <el-col :span="20">{{ fee | nemValue }} xem</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Timestamp</el-col>
      <el-col :span="20">{{ timeStamp | nemtime2iso8601 }} </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Deadline</el-col>
      <el-col :span="20">{{ deadline | nemtime2iso8601 }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Block</el-col>
      <el-col :span="20"><a :href="blockUrl" target="_blank">{{ block }}</a></el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Hash</el-col>
      <el-col :span="20">{{ hash }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Signer</el-col>
      <el-col :span="20">
        {{ signer }}<br>
        {{ signer | publicKeyToAddress(network) | splitAddressByHyphen }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  publicKeyToAddress,
  splitAddressByHyphen,
  nemtime2iso8601,
  nemValue,
  explorerBlockUrl
} from '@/helpers/format.js'
import { mapGetters } from 'vuex'

export default {
  name: 'transaction-info',
  filters: {
    splitAddressByHyphen,
    publicKeyToAddress,
    nemtime2iso8601,
    nemValue
  },
  props: {
    block: Number,
    hash: String,
    timeStamp: Number,
    deadline: Number,
    signer: String,
    fee: Number
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

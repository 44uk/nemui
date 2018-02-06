<template>
  <div>
    <el-row>
      <el-col :span="4">Signer</el-col>
      <el-col :span="20">
        {{ signer }}<br>
        {{ signer | publicKeyToAddress(network) | splitAddressByHyphen }}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Timestamp</el-col>
      <el-col :span="20">{{ timeStamp | nemtime2iso8601 }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Deadline</el-col>
      <el-col :span="20">{{ deadline | nemtime2iso8601 }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Other Account</el-col>
      <el-col :span="20">{{ otherAccount | splitAddressByHyphen }}</el-col>
    </el-row>
  </div>
</template>

<script>
import {
  publicKeyToAddress,
  splitAddressByHyphen,
  nemtime2iso8601
} from '@/helpers/format.js'
import { mapGetters } from 'vuex'

export default {
  name: 'signature-info',
  filters: {
    splitAddressByHyphen,
    publicKeyToAddress,
    nemtime2iso8601
  },
  props: {
    timeStamp: Number,
    signer: String,
    deadline: Number,
    otherAccount: String
  },
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'network'
    ])
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

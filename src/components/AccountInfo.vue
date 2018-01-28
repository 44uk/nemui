<template>
  <div style="height: 320px">
    <el-row>
      <el-col :span="4">Balance</el-col>
      <el-col :span="8">{{ formattedBalance }}&nbsp;xem</el-col>
      <el-col :span="4">Status</el-col>
      <el-col :span="8">{{ info.status }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Vested Balance</el-col>
      <el-col :span="8">{{ formattedVestedBalance }}&nbsp;xem</el-col>
      <el-col :span="4">Remote Status</el-col>
      <el-col :span="8">{{ info.remoteStatus }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Importance</el-col>
      <el-col :span="8">{{ formattedImportance }}&nbsp;&permil;</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Public Key</el-col>
      <el-col :span="8">{{ info.publicKey }}</el-col>
    </el-row>

    <el-row>
      <el-col :span="4">Connected Node</el-col>
      <el-col :span="8">{{ node }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Current Height</el-col>
      <el-col :span="8">{{ height }}</el-col>
    </el-row>
  </div>
</template>

<script>
// import {  } from '@/helpers/format.js'

export default {
  name: 'account-info',
  props: {
    info: Object,
    node: String,
    height: Number
  },
  computed: {
    formattedBalance: function () {
      return this.info.balance / 1000000
    },
    formattedVestedBalance: function () {
      return this.info.vestedBalance / 1000000
    },
    formattedImportance: function () {
      return Math.round(this.info.importance * 100000000) / 10000
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

<template>
  <div style="height: 320px">
    <el-row>
      <el-col :span="4">Balance</el-col>
      <el-col :span="8">{{ info.balance | nemValue }}&nbsp;xem</el-col>
      <el-col :span="4">Status</el-col>
      <el-col :span="8">{{ info.status }}</el-col>
    </el-row>

    <el-row>
      <el-col :span="4">Vested Balance</el-col>
      <el-col :span="8">{{ info.vestedBalance | nemValue }}&nbsp;xem</el-col>
      <el-col :span="4">Remote Status</el-col>
      <el-col :span="8">{{ info.remoteStatus }}</el-col>
    </el-row>

    <el-row>
      <el-col :span="4">Importance</el-col>
      <el-col :span="8">{{ info.importance | importanceScore }}&nbsp;&permil;</el-col>
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
import nem from 'nem-sdk'
import { nemValue } from '@/helpers/format.js'

export default {
  name: 'account-info',
  filters: {
    nemValue,
    importanceScore: function (value) {
      return nem.utils.format.nemImportanceScore(value).join('.')
    }
  },
  props: {
    info: Object,
    node: String,
    height: Number
  },
  computed: {
  },
  methods: {
  }
}
</script>

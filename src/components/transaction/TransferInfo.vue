<template>
  <div>
    <el-row>
      <el-col :span="6">Recipient</el-col>
      <el-col :span="18">{{ recipient | splitAddressByHyphen }}</el-col>
    </el-row>
    <el-row v-if="!isMosaicTransfer">
      <el-col :span="6">Amount</el-col>
      <el-col :span="18">{{ amount }} xem</el-col>
    </el-row>
    <el-row v-if="message.payload">
      <el-col :span="6">Message</el-col>
      <el-col :span="18">{{ messageDecoded }}</el-col>
    </el-row>
    <el-row v-if="message.payload">
      <el-col :span="6">MessageType</el-col>
      <el-col :span="18">{{ messageTypeName }}</el-col>
    </el-row>
    <el-row v-if="mosaics.length > 0">
      <el-col :span="6">Mosaics</el-col>
      <el-col :span="18">
        <ul>
          <li v-for="moa in prettifiedMosaics" :key="moa.fqn">
            <span>{{ moa.fqn }}</span>
            <span>{{ moa.quantity }}</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  splitAddressByHyphen,
  nemtime2iso8601
} from '@/helpers/format.js'
import nem from 'nem-sdk'

export default {
  name: 'transfer-info',
  filters: {
    nemtime2iso8601: nemtime2iso8601,
    splitAddressByHyphen: splitAddressByHyphen
  },
  props: {
    recipient: String,
    amount: Number,
    message: Object,
    mosaics: Array
  },
  data: function () {
    return {
    }
  },
  computed: {
    isMosaicTransfer: function () {
      return this.mosaics.length > 0
    },
    messageTypeName: function () {
      return this.message.type === 2 ? 'Encrypted' :
        /^fe[0-9a-f]*?$/.test(this.message.payload) ? 'Hexdecimal' :
        'Plain'
    },
    messageDecoded: function () {
      const payload = this.message.payload
      return this.messageTypeName === 'Encrypted' ? payload :
        this.messageTypeName === 'Hexdecimal' ?
          payload : // TODO: improving
          nem.utils.format.hexToUtf8(payload)
    },
    prettifiedMosaics: function () {
      return this.mosaics.map(el => {
        return {
          ...el.mosaicId,
          fqn: nem.utils.format.mosaicIdToName(el.mosaicId),
          quantity: el.quantity
        }
      })
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

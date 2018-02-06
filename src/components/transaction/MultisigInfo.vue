<template>
  <div>
    <el-row>
      <el-col :span="4">Signer</el-col>
      <el-col :span="20">{{ signer }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Signatures</el-col>
      <el-col :span="20">
        <signature-info v-for="sign in signatures" :key="sign.signature"
          :timeStamp="sign.timeStamp"
          :deadline="sign.deadline"
          :otherAccount="sign.otherAccount"
          :signer="sign.signer"

          :data="sign"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">Multisig Fee</el-col>
      <el-col :span="20">{{ signFee | nemValue }} xem</el-col>
    </el-row>
  </div>
</template>

<script>
//   "deadline": 86792281,
//   "signatures": [
//     {
//       "timeStamp": 86789836,
//       "otherHash": {
//         "data": "9c2006af4ee03a47adf47e807f55986fe9301032da6b99d49878b3afdd346d55"
//       },
//       "otherAccount": "TDJNDAQ7F7AQRXKP2YVTH67QYCWWKE6QLSJFWN64",
//       "signature": "cf716a12c9225a1ea7aefd9a91e48587817c9df640885b47e975740f24e6d8d09aace73bfc498452779c7403fbb5a5786ab4addfd4f4ac195a1f273686c4f00b",
//       "fee": 150000,
//       "type": 4098,
//       "deadline": 86793436,
//       "version": -1744830463,
//       "signer": "9e7ab2924cd1a3482df784db190614cfc8a33671f5d80a5b15a9c9e8b4d13933"
//     }
//   ],
// }

import {
  nemtime2iso8601,
  nemValue
} from '@/helpers/format.js'

import SignatureInfo from '@/components/transaction/SignatureInfo'

export default {
  name: 'multisig-info',
  filters: {
    nemtime2iso8601,
    nemValue
  },
  components: {
    SignatureInfo
  },
  props: {
    timeStamp: Number,
    deadline: Number,
    signer: String,
    signatures: Array,
    fee: Number,

    data: Object
  },
  data: function () {
    return {
    }
  },
  computed: {
    signFee: function () {
      return (this.fee + this.signatures.reduce((memo, el) => {
        return memo + el.fee
      }, 0))
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

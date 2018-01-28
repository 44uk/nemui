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
      <el-col :span="6">Signer</el-col>
      <el-col :span="18">{{ signer }}</el-col>
    </el-row>

    <el-row>
      <el-col :span="6">Signatures</el-col>
      <el-col :span="18">
        <signature-info v-for="sign in signatures" :key="sign.signature"
          :signer="sign.signer"
          :timeStamp="sign.timeStamp"

          :data="sign"
        />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="18">{{  }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="18">{{  }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="18">{{  }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="18">{{  }}</el-col>
    </el-row>
  </div>
</template>

<script>
// {
  //   "timeStamp": 86788681,
//   "signature": "dce2b2094d441146d94f1967d8610541c970f36be7364ee49730a123092dc7c6404b1de904288f641ac2b56fa52890445238ce0eba2c824a2ba6800d90a0e10f",
//   "fee": 150000,
//   "type": 4100,
  //   "deadline": 86792281,
//   "version": -1744830463,
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
  //   "signer": "be2ba9cb15a547110d511a4d43c0482fbb584d78781abac01fb053d18f4a0033"
// }

import {
  nemtime2iso8601
} from '@/helpers/format.js'

import SignatureInfo from '@/components/transaction/SignatureInfo'

export default {
  name: 'multisig-info',
  filters: {
    nemtime2iso8601: nemtime2iso8601
  },
  components: {
    SignatureInfo
  },
  props: {
    timeStamp: Number,
    deadline: Number,
    signer: String,
    signatures: Array,
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

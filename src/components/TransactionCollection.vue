<template>
  <el-table :data="data" size="mini" height="320" style="width:100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <transfer-info v-if="props.row.type === 257"
          :recipient="props.row.recipient"
          :amount="props.row.amount"
          :message="props.row.message"
          :mosaics="props.row.mosaics"
        />
        <transaction-info
          :block="props.row.height"
          :hash="props.row.hash"
          :timeStamp="props.row.timeStamp"
          :deadline="props.row.deadline"
          :signer="props.row.signer"
        />
        <multisig-info v-if="props.row.msig"
          :timeStamp="props.row.msig.timeStamp"
          :deadline="props.row.msig.deadline"
          :signer="props.row.msig.signer"
          :signatures="props.row.msig.signatures"
          :data="props.row.msig"
        />
      </template>
    </el-table-column>
    <el-table-column
      width="450"
      label="Recipient"
      class-name="recipient-col"
    >
      <template slot-scope="scope">
        <el-tag v-if="scope.row.isIncoming" type="success" size="mini">
          <i v-if="scope.row.isMultisig" class="el-icon-edit-outline" />
          <i v-if="!scope.row.isMultisig" class="el-icon-caret-right" />
        </el-tag>
        <el-tag v-if="!scope.row.isIncoming" type="danger" size="mini">
          <i v-if="scope.row.isMultisig" class="el-icon-edit-outline" />
          <i v-if="!scope.row.isMultisig" class="el-icon-caret-left" />
        </el-tag>
        <span v-if="scope.row.recipient">
          {{ scope.row.recipient | splitAddressByHyphen }}
        </span>
      </template>
    </el-table-column>
    <el-table-column
      align="right"
      label="Amount"
      prop="amount">
    </el-table-column>
    <el-table-column
      width="100"
      align="right"
      label="Fee"
      prop="fee">
    </el-table-column>
    <el-table-column
      filter-placement="right-end"
      :filters="filterTypes"
      :filter-method="filterType"
      width="100"
      align="right"
      label="Type"
      prop="typeName">
    </el-table-column>
    <el-table-column
      width="250"
      label="Time"
      align="right">
      <template slot-scope="scope">
        <i class="el-icon-time" style="margin-right: 10px"></i>
        <span>{{ scope.row.timeStamp | nemtime2iso8601 }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import _ from 'lodash'
import nem from 'nem-sdk'
import {
  splitAddressByHyphen,
  nemtime2iso8601
} from '@/helpers/format.js'
import TransactionInfo from '@/components/TransactionInfo'
import TransferInfo from '@/components/transaction/TransferInfo'
import MultisigInfo from '@/components/transaction/MultisigInfo'

export default {
  name: 'transaction-collection',
  filters: {
    nemtime2iso8601: nemtime2iso8601,
    splitAddressByHyphen: splitAddressByHyphen
  },
  components: {
    TransactionInfo,
    TransferInfo,
    MultisigInfo
  },
  props: ['items', 'address'],
  computed: {
    data: function () {
      return this.items.map(el => {
        const meta = el.meta
        const tx = el.transaction.otherTrans ?
          el.transaction.otherTrans :
          el.transaction
        const mtx = el.transaction.otherTrans ?
          el.transaction :
          null

        const common = {
          isIncoming: this.address === tx.recipient,
          isMultisig: !!mtx,
          type: tx.type,
          typeName: nem.utils.format.txTypeToName(tx.type),
          height: meta.height,
          hash: meta.hash.data,
          timeStamp: tx.timeStamp,
          deadline: tx.deadline,
          signer: tx.signer,
          fee: tx.fee / 1000000
        }

        const specify = {
          recipient: splitAddressByHyphen(tx.recipient),
          amount: tx.amount && tx.amount / 1000000,
          message: tx.message,
          mosaics: tx.mosaics || []
        }

        return {
          ...common,
          ...specify,
          msig: mtx
        }
      })
    },
    filterTypes: function () {
      return _.uniq(this.data.map(el => {
        return el.typeName
      }), false).map(el => {
        return { text: el, value: el }
      })
    }
  },
  methods: {
    filterType (value, row) {
      return row.typeName === value
    }
  }
}
</script>

<style scoped>
</style>

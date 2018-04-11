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
        <importance-transfer-info v-if="props.row.type === 2049"
          :remoteAccount="props.row.remoteAccount"
          :mode="props.row.mode"
          :data="props.row"
        />
        <multisig-aggregate-modification-info v-if="props.row.type === 4097"
          :relativeChange="props.row.minCosignatories.relativeChange"
          :modifications="props.row.modifications"
        />
        <provision-namespace-info v-if="props.row.type === 8193"
          :parent="props.row.parent"
          :newPart="props.row.newPart"
          :rentalFee="props.row.rentalFee"
          :rentalFeeSink="props.row.rentalFeeSink"
        />
        <mosaic-definition-creation-info v-if="props.row.type === 16385"
          :id="props.row.id"
          :creationFee="props.row.creationFee"
          :creationFeeSink="props.row.creationFeeSink"
          :mosaicDefinition="props.row.mosaicDefinition"
        />
        <mosaic-supply-change-info v-if="props.row.type === 16386"
          :mosaicId="props.row.mosaicId"
          :supplyType="props.row.supplyType"
          :delta="props.row.delta"
        />
        <multisig-info v-if="props.row.multisig"
          :timeStamp="props.row.multisig.timeStamp"
          :deadline="props.row.multisig.deadline"
          :signer="props.row.multisig.signer"
          :signatures="props.row.multisig.signatures"
          :fee="props.row.multisig.fee"
        />
        <transaction-info
          :block="props.row.meta.height"
          :hash="props.row.meta.hash.data"
          :timeStamp="props.row.timeStamp"
          :deadline="props.row.deadline"
          :signer="props.row.signer"
          :fee="props.row.fee"
        />
      </template>
    </el-table-column>

    <el-table-column
      width="450"
      label="Recipient"
      class-name="recipient-col">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.isIncoming" type="success" size="mini">
          <i v-if="scope.row.isMultisig" class="el-icon-edit-outline" />
          <i v-if="!scope.row.isMultisig" class="el-icon-caret-right" />
        </el-tag>
        <el-tag v-if="!scope.row.isIncoming" type="danger" size="mini">
          <i v-if="scope.row.isMultisig" class="el-icon-edit-outline" />
          <i v-if="!scope.row.isMultisig" class="el-icon-caret-left" />
        </el-tag>

        <span v-if="scope.row.isIncoming && scope.row.type === 257">
          {{ scope.row.signer | publicKeyToAddress | splitAddressByHyphen }}
        </span>
        <span v-if="!scope.row.isIncoming && scope.row.type === 257">
          {{ scope.row.recipient | splitAddressByHyphen }}
        </span>

        <span v-if="scope.row.type === 2049">
          Delegated harvesting:
          <el-tag :type="scope.row.mode === 1 ? 'success' : 'danger'" size="mini">
            {{ scope.row.mode | modeToName }}
          </el-tag>
        </span>
        <span v-if="scope.row.type === 4097">
          Multisig Aggregate Modification
        </span>
        <span v-if="scope.row.type === 4098">
          Multisig Signature
        </span>
        <span v-if="scope.row.type === 4100">
          Multisig
        </span>
        <span v-if="scope.row.type === 8193">
          Created Namespace: {{ scope.row.parent }} {{ scope.row.newPart }}
          <el-tag type="info" size="mini">
            {{ scope.row.parent }} {{ scope.row.newPart }}
          </el-tag>
        </span>
        <span v-if="scope.row.type === 16385">
          Mosaic Definition Creation:
          <el-tag type="info" size="mini">
            {{ scope.row.mosaicDefinition.id | mosaicIdToFqn }}
          </el-tag>
        </span>
        <span v-if="scope.row.type === 16386">
          Mosaic Supply Change:
          <el-tag type="info" size="mini">
            {{ scope.row.mosaicId | mosaicIdToFqn }}
          </el-tag>
        </span>
      </template>
    </el-table-column>

    <el-table-column
      align="right"
      label="Amount">
      <template slot-scope="scope">
        <div v-if="scope.row.type === 257 && scope.row.isMosaicTransfer">
          <span>x {{ scope.row.amount / 1000000 }}</span>
        </div>
        <div v-if="scope.row.type === 257 && !scope.row.isMosaicTransfer">
          <span v-if="scope.row.isIncoming">
            {{ scope.row.amount | nemValue }} xem
          </span>
          <span v-if="!scope.row.isIncoming">
            {{ scope.row.amount + scope.row.fee + scope.row.multisigFee | nemValue }} xem
          </span>
        </div>

        <div v-if="scope.row.type === 2049">
          {{ scope.row.fee | nemValue }} xem
        </div>

        <div v-if="scope.row.type === 4097">
          {{ scope.row.fee + scope.row.multisigFee | nemValue }} xem
        </div>

        <div v-if="scope.row.type === 4098">
        </div>

        <div v-if="scope.row.type === 8193">
          {{ scope.row.rentalFee + scope.row.fee | nemValue }} xem
        </div>

        <div v-if="scope.row.type === 16385">
          {{ scope.row.creationFee + scope.row.fee | nemValue }} xem
        </div>

        <div v-if="scope.row.type === 16386">
          {{ scope.row.fee | nemValue }} xem
        </div>
      </template>
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
      width="190"
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
import {
  splitAddressByHyphen,
  publicKeyToAddress,
  nemtime2iso8601,
  mosaicIdToFqn,
  txTypeToName,
  modeToName,
  nemValue
} from '@/helpers/format.js'
import TransactionInfo from '@/components/TransactionInfo'
import MultisigInfo from '@/components/transaction/MultisigInfo'
import TransferInfo from '@/components/transaction/TransferInfo'
import ImportanceTransferInfo from '@/components/transaction/ImportanceTransferInfo'
import MultisigAggregateModificationInfo from '@/components/transaction/MultisigAggregateModificationInfo'
import ProvisionNamespaceInfo from '@/components/transaction/ProvisionNamespaceInfo'
import MosaicDefinitionCreationInfo from '@/components/transaction/MosaicDefinitionCreationInfo'
import MosaicSupplyChangeInfo from '@/components/transaction/MosaicSupplyChangeInfo'

export default {
  name: 'transaction-collection',
  filters: {
    splitAddressByHyphen,
    publicKeyToAddress,
    nemtime2iso8601,
    mosaicIdToFqn,
    txTypeToName,
    modeToName,
    nemValue
  },
  components: {
    TransactionInfo,
    MultisigInfo,
    TransferInfo,
    ImportanceTransferInfo,
    MultisigAggregateModificationInfo,
    ProvisionNamespaceInfo,
    MosaicDefinitionCreationInfo,
    MosaicSupplyChangeInfo
  },
  props: {
    'items': Array,
    'address': String
  },
  computed: {
    data: function () {
      return this.items.map(el => {
        // Unconfirmedのときにnull
        const txInfo = el.transactionInfo

        const dto = el.toDTO()
        const tx = dto.otherTrans
          ? dto.otherTrans
          : dto
        const multisig = dto.otherTrans
          ? dto
          : null

        const multisigFee = multisig ? multisig.signatures.reduce((memo, el) => {
          return memo + el.fee
        }, 0) + multisig.fee
          : 0

        return {
          isIncoming: this.address === tx.recipient,
          isMultisig: !!multisig,
          isMosaicTransfer: !!tx.mosaics && tx.mosaics.length > 0,
          typeName: this.$options.filters.txTypeToName(tx.type),
          meta: txInfo,
          ...tx,
          multisigFee,
          multisig
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

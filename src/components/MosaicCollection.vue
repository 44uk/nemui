<template>
  <el-table :data="mosaics"
    size="mini"
    height="320"
    style="width: 100%"
  >
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-row>
          <el-col :span="4">Creator</el-col>
          <el-col :span="20">
            {{ scope.row.creator | publicKeyToAddress | splitAddressByHyphen }}<br>
            {{ scope.row.creator }}
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4">Description</el-col>
          <el-col :span="20">{{ scope.row.description }}</el-col>
        </el-row>

        <el-row>
          <el-col :span="4">Divisibility</el-col>
          <el-col :span="8">{{ scope.row.divisibility }}</el-col>
          <el-col :span="4">supplyMutable</el-col>
          <el-col :span="8">{{ scope.row.supplyMutable }}</el-col>
        </el-row>

        <el-row>
          <el-col :span="4">InitialSupply</el-col>
          <el-col :span="8">{{ scope.row.initialSupply }}</el-col>
          <el-col :span="4">Transferable</el-col>
          <el-col :span="8">{{ scope.row.transferable }}</el-col>
        </el-row>

        <el-row>
          <el-col :span="4">CurrentSupply</el-col>
          <el-col :span="8">{{ scope.row.supply }}</el-col>
        </el-row>

        <el-row v-if="scope.row.levy.recipient">
          <el-col :span="4">Levy</el-col>
          <el-col :span="20">
            <levy
              :fee="scope.row.levy.fee"
              :recipient="scope.row.levy.recipient"
              :type="scope.row.levy.type"
              :mosaicId="scope.row.levy.mosaicId"
            />
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column
      prop="namespaceId"
      label="NS"
      filter-placement="bottom-end"
      :filters="filterNamespaces"
      :filter-method="filterNamespace"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      filter-placement="bottom-end"
      :filters="filterNames"
      :filter-method="filterName"
    >
    </el-table-column>
    <el-table-column
      prop="qty"
      label="QTY"
      align="right"
    >
    </el-table-column>
    <el-table-column
      width="400"
      prop="description"
      label="Description"
    >
    </el-table-column>

    <el-table-column
      width="60"
      label="Levy"
    >
      <template slot-scope="scope">
        <el-tag :type="scope.row.hasLevy ? 'danger' : 'info'" size="mini">
          Levy
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      width="120"
      label="SupplyMutable"
    >
      <template slot-scope="scope">
        <el-tag :type="scope.row.supplyMutable ? 'warning' : 'info'" size="mini">
          supplyMutable
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      width="120"
      label="Transferable"
    >
      <template slot-scope="scope">
        <el-tag :type="scope.row.transferable ? 'success' : 'info'" size="mini">
          Transferable
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
  publicKeyToAddress,
  splitAddressByHyphen
} from '@/helpers/format.js'
import { mapActions, mapGetters } from 'vuex'
import Levy from '@/components/mosaic/Levy'
import _ from 'lodash'

export default {
  name: 'mosaic-collection',
  filters: {
    publicKeyToAddress,
    splitAddressByHyphen
  },
  components: {
    Levy
  },
  props: {
    items: Array
  },
  computed: {
    ...mapGetters([
      'mosaicDefinitions'
    ]),
    mosaics () {
      return this.items.map(el => {
        const def = this.mosaicDefinitions[el.fqn] || {
          divisibility: 0,
          initialSupply: 8999999999,
          supplyMutable: false,
          transferable: false,
          description: '*No cache found. This info is not correctly*'
        }
        const hasLevy = !!def.levy.recipient
        const qty = el.quantity / 10 ** def.divisibility
        return {
          ...el.mosaicId,
          ...def,
          qty,
          hasLevy
        }
      })
    },
    filterNamespaces: function () {
      return _.uniq(this.items.map(el => {
        return el.mosaicId.namespaceId
      })).map(el => {
        return { text: el, value: el }
      })
    },
    filterNames: function () {
      return this.items.map(el => {
        const id = el.mosaicId
        return { text: id.name, value: id.name }
      })
    }
  },
  methods: {
    ...mapActions([
    ]),
    filterNamespace (value, row) {
      return row.namespaceId === value
    },
    filterName (value, row) {
      return row.name === value
    }
  }
}
</script>

<style scoped>
</style>

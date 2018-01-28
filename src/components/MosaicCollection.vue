<template>
  <el-table :data="mosaics"
    size="mini"
    height="320"
    style="width: 100%"
  >
    <el-table-column type="expand">
      <template slot-scope="scope">
        <dl>
          <dt>Creator</dt>
          <dd>{{ scope.row.creator }}</dd>
          <dt>Description</dt>
          <dd>{{ scope.row.description }}</dd>
          <dt>Divisibility</dt>
          <dd>{{ scope.row.divisibility }}</dd>
          <dt>InitialSupply</dt>
          <dd>{{ scope.row.initialSupply }}</dd>
          <dt>SupplyMutable</dt>
          <dd>{{ scope.row.supplyMutable }}</dd>
          <dt>Transferable</dt>
          <dd>{{ scope.row.transferable }}</dd>
          <dt>Levy</dt>
          <dd>{{ scope.row.levy }}</dd>
        </dl>
      </template>
    </el-table-column>
    <el-table-column
      prop="namespace"
      label="NS"
      filter-placement="bottom-end"
      :filters="filterNamespaces"
      :filter-method="filterNamespace"
    >
      <template slot-scope="scope">
        {{ scope.row.namespace }}
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      filter-placement="bottom-end"
      :filters="filterNames"
      :filter-method="filterName"
    >
      <template slot-scope="scope">
        {{ scope.row.name }}
      </template>
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
  </el-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'mosaic-collection',
  components: {
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
        const id = el.mosaicId
        const def = this.mosaicDefinitions[el.fqn] || {
          divisibility: 0,
          initialSupply: 8999999999,
          supplyMutable: false,
          transferable: false,
          description: 'no cache found'
        }
        return {
          namespace: id.namespaceId,
          name: id.name,
          qty: el.quantity / 10 ** def.divisibility,
          ...def
        }
      })
    },
    filterNamespaces: function () {
      return this.items.map(el => {
        const id = el.mosaicId
        return { text: id.namespaceId, value: id.namespaceId }
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
      return row.namespace === value
    },
    filterName (value, row) {
      return row.name === value
    }
  }
}
</script>

<style scoped>
</style>

<template>
  <el-table :data="items"
    style="width: 100%"
    size="mini"
    height="320"
  >
    <el-table-column
      prop="address"
      label="Address"
    >
    </el-table-column>
    <el-table-column
      prop="publicKey"
      label="PublicKey"
    >
    </el-table-column>
  </el-table>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'cosignatory-collection',
  props: {
    items: Array
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

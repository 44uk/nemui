<template lang="pug">
  el-table(:data="items"
    style="width: 100%"
    size="mini"
    height="320"
  )
    el-table-column(prop="address" label="Address")
      template(slot-scope="scope")
        | {{ scope.row.address | splitAddressByHyphen }}
    el-table-column(prop="publicKey" label="PublicKey")
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import {
  splitAddressByHyphen
} from '@/helpers/format.js'

export default {
  name: 'signatory-collection',
  filters: {
    splitAddressByHyphen
  },
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

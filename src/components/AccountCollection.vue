<template>
  <div class="account-collection">
    <account v-for="item in accounts" :key="identify(item)"
      :address="item.address"
      :node="item.node"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Account from '@/components/Account'

export default {
  name: 'account-collection',
  components: {
    Account
  },
  props: {
    accounts: Array
  },
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    identify (account) {
      return `${account.address}@${account.node}`
    }
  }
}
</script>

<style scoped>
.account-collection > .el-card {
  margin-bottom: 20px;
}
.account-collection > .el-card:last-child {
  margin-bottom: 0;
}
</style>

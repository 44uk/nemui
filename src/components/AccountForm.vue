<template lang="pug">
  el-form(:model="account" :rules="rules" ref="form")
    el-form-item(label="Address" prop="address")
      el-input(v-model="account.address" placeholder="Address")
    el-form-item(label="Node" prop="node")
      el-select(v-model="account.node" placeholder="Node")
        el-option(v-for="(item, idx) in nodes" :key="idx"
          :label="item"
          :value="item"
        )
    el-form-item
      el-button(type="primary" @click="submitForm('form')") Add
</template>

<script>
import nem from 'nem-sdk'
import { mapGetters, mapActions } from 'vuex'
import { sanitizeAddress } from '@/helpers/format.js'

export default {
  name: 'account-form',
  props: {
    network: String,
    nodes: Array
  },
  data: function () {
    const validateNetwork = (rule, value, callback) => {
      let firstChar = null
      switch (this.network) {
        case 'testnet':
          firstChar = '^T'
          break
        case 'mainnet':
          firstChar = '^N'
          break
        case 'mijin':
          firstChar = '^M'
          break
      }
      const firstCharPattern = new RegExp(firstChar)
      if (firstCharPattern.test(value)) {
        callback()
      } else {
        callback(new Error(`Please input the address for ${this.network}`))
      }
    }

    const validateFormat = (rule, value, callback) => {
      if (nem.model.address.isValid(value)) {
        callback()
      } else {
        callback(new Error('Please input valid address'))
      }
    }

    return {
      account: {
        address: null,
        node: null
      },
      rules: {
        address: [
          { required: true, message: 'Please input Address', trigger: 'blur' },
          { validator: validateNetwork, trigger: 'blur' },
          { validator: validateFormat, trigger: 'blur' }
        ],
        node: [
          { required: true, message: 'Please select Node', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    ...mapActions([
      'addAccount'
    ]),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.account.address = sanitizeAddress(this.account.address)
          this.addAccount(Object.assign({}, this.account))
          this.account.address = null
        } else {
          return false
        }
      })
    }
  },
  watch: {
    nodes: function (val) {
      this.account.node = this.nodes[0]
    }
  },
  created: function () {
    this.account.node = this.nodes[0]
  }
}
</script>

<style>
.el-select .el-input {
  width: 160px;
}
</style>

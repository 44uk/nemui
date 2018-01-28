<template>
  <div>
    <el-form :model="node" :rules="rules" ref="form">
      <el-form-item label="Node" prop="host">
        <el-input v-model="node.host" placeholder="Node ip or domain" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">Add</el-button>
      </el-form-item>
    </el-form>

    <ul>
      <li v-for="item in nodes" :key="item">
        <el-button icon="el-icon-delete"
          size="mini"
          style="margin-right: 0.5em"
          @click="remove(item)"
        />
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'node-form',
  props: {
    network: String,
    nodes: Array
  },
  data: function () {
    return {
      node: {
        host: null
      },
      rules: {
        host: [
          { required: true, message: 'Please input Node', trigger: 'blur' }
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
      'addNode',
      'removeNode'
    ]),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addNode(this.node)
        } else {
          console.error(valid)
          return false
        }
      })
    },
    remove (node) {
      this.removeNode(node)
    }
  }
}
</script>

<style scoped>
</style>

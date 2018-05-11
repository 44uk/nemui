<template lang="pug">
  div
    el-switch(v-model="config.sound"
      v-on:change="setSound(config.sound)"
      active-text="Play Sound"
      inactive-text="Mute Sound"
    )
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'config',
  data: function () {
    return {
      config: {
        sound: false
      }
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

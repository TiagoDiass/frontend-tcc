<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <button type="button" class="btn btn-primary">MY BUTTON</button>

    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'Home',
  components: {
    HelloWorld,
  },
});
</script>

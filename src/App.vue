<template>
  <div id="app">
    <Sidebar />

    <div id="content-container">
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Sidebar } from '@/components';

export default Vue.extend({
  components: {
    Sidebar,
  },
});
</script>

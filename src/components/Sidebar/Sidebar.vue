<template>
  <div
    id="sidebar"
    data-testid="sidebar"
    aria-label="Barra de navegação lateral"
  >
    <h2 class="logo"><span class="light">Kapa</span>Kamael</h2>

    <button>Shit</button>

    <div id="nav">
      <a
        v-for="option in sidebarOptions"
        :key="option.routeName"
        @click="navigateTo(option.routeName)"
      >
        <i :class="`fas ${option.iconClass}`" /> {{ option.label }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import sidebarOptions from './sidebarOptions';

export default Vue.extend({
  name: 'sidebar',

  computed: {
    sidebarOptions: () => sidebarOptions,
  },

  methods: {
    navigateTo(name: string): void {
      this.$router.push({ name });
    },
  },
});
</script>

<style lang="scss" src="./Sidebar.scss" />

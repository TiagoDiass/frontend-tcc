<template>
  <div id="sidebar">
    <h2 class="logo"><span class="light">Front</span>TCC</h2>

    <div id="nav">
      <a @click="navigateTo('Home')"><i class="fas fa-home" /> Home</a>
      <a @click="navigateTo('Pacientes')">
        <i class="fas fa-users" /> Pacientes
      </a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'sidebar',

  methods: {
    navigateTo(name: string): void {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" src="./Sidebar.scss" />

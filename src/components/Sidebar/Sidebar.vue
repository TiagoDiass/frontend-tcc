<template>
  <div id="sidebar">
    <h2 class="logo"><span class="light">Kapa</span>Kamael</h2>

    <div id="nav">
      <a @click="navigateTo('Home')"><i class="fas fa-home" /> Home</a>

      <a> <i class="fas fa-dog" /> Animais</a>
      <a> <i class="fas fa-paw" /> Adoções</a>
      <a> <i class="fas fa-people-carry" /> Voluntários</a>
      <a> <i class="fas fa-capsules" /> Medicamentos</a>
      <a> <i class="fas fa-life-ring" /> Casos de ajuda</a>
      <a> <i class="fas fa-hand-holding-heart" /> Serviços</a>
      <a> <i class="fas fa-clinic-medical" /> Clínicas parceiras</a>
      <a> <i class="fas fa-money-check-alt" /> Transações</a>
      <a> <i class="fas fa-box-open" /> Produtos</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'sidebar',

  methods: {
    navigateTo(name: string): void {
      this.$router.push({ name });
    },
  },
});
</script>

<style lang="scss" src="./Sidebar.scss" />

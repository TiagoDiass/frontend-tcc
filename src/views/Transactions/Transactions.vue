<template>
  <main class="transactions view">
    <div class="view-header">
      <h1>Transações</h1>

      <p>
        Este é o módulo de
        <span class="text-primary text-bold">Transações</span>, onde você poderá
        gerenciar todas as transações realizadas pela ONG
      </p>
    </div>

    <div>
      <header class="totalizers-wrapper">
        <div class="totalizer normal">
          <p class="label">Entradas 🟢</p>

          <span class="value">+ R$ 30,00</span>
        </div>

        <div class="totalizer normal">
          <p class="label">Saídas 🔴</p>

          <span class="value">- R$ 15,00</span>
        </div>

        <div class="totalizer current-balance positive-score">
          <p class="label">Total 💸</p>

          <span class="value">+ R$ 15,00</span>
        </div>
      </header>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" src="./Transactions.styles.scss"></style>

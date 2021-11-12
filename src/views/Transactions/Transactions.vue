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

          <span class="value">+ R$ {{ formattedBalance.entries }}</span>
        </div>

        <div class="totalizer normal">
          <p class="label">Saídas 🔴</p>

          <span class="value">- R$ {{ formattedBalance.withdraws }}</span>
        </div>

        <div
          class="totalizer current-balance"
          :class="[
            { 'positive-score': balance.total > 0 },
            { 'negative-score': balance.total < 0 },
          ]"
        >
          <p class="label">Total 💸</p>

          <span class="value">
            {{ balance.total > 0 ? '+' : '-' }} R$
            {{ formattedBalance.total }}
          </span>
        </div>
      </header>
    </div>
  </main>
</template>

<script lang="ts">
import { Balance } from '@/@types/Transactions';
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  mounted() {
    this.fetchBalance();
  },

  computed: {
    ...mapGetters({
      balance: 'transactions/getBalance',
    }),

    formattedBalance(): { total: string; entries: string; withdraws: string } {
      const balance: Balance = this.balance;

      return {
        total: balance.total.toLocaleString(),
        entries: balance.entries.toLocaleString(),
        withdraws: balance.withdraws.toLocaleString(),
      };
    },
  },

  methods: {
    ...mapActions({
      fetchBalance: 'transactions/fetchBalance',
    }),
  },
});
</script>

<style lang="scss" src="./Transactions.styles.scss"></style>

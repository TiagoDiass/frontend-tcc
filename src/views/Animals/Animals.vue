<template>
  <div class="animals view">
    <div class="view-header">
      <h1>Animais</h1>

      <p>
        Este é o módulo de
        <span class="text-primary text-bold">Pacientes</span>, onde você poderá
        fazer a gestão de todos os pacientes
      </p>
    </div>

    <div class="view-content d-flex flex-column" style="row-gap: 12px">
      <h1>shit shit</h1>
      <Button type="info" @click="launchAlert1"> lançar alerta questão</Button>
      <button class="btn btn-info" @click="launchAlert2">
        lançar alerta sucesso
      </button>
      <button class="btn btn-info" @click="launchAlert3">
        lançar alerta erro
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import alert from '@/services/alert';
import { Button } from '@/components';

export default Vue.extend({
  components: {
    Button,
  },

  methods: {
    async launchAlert1() {
      const { answer } = await alert.question({
        text: 'Após deletar um paciente, os dados dele não poderão ser recuperados',
        focusCancelButton: false,
      });

      if (answer === 'yes') {
        alert.success('Deletado');
      } else {
        alert.info({ title: 'Tudo bem', text: 'Não foi deletado' });
      }
    },

    launchAlert2() {
      alert.success('SUCESSO MEU QUERIDOOOO');
    },

    launchAlert3() {
      alert.error('Deu ruim meu compatriota');
    },
  },
});
</script>

<style></style>

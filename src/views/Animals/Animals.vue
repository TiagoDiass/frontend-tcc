<template>
  <div class="animals view">
    <div class="view-header">
      <h1>Animais</h1>

      <p>
        Este é o módulo de
        <span class="text-primary text-bold">Animais</span>, onde você poderá
        fazer a gestão de todos os animais
      </p>
    </div>

    <div class="view-content d-flex flex-column" style="row-gap: 12px">
      <h1>shit shit</h1>
      <Button type="info" @click="launchAlert1"> lançar alerta questão</Button>
      <Button type="info" @click="open">Abrir modal</Button>
      <button class="btn btn-info" @click="launchAlert3">
        lançar alerta erro
      </button>
    </div>

    <Modal size="lg" :isVisible="isModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          Cadastrar SHIT
          <i class="fas fa-users"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <div>
          <h1>AQUI O BODY MEU FI</h1>
        </div>
      </template>

      <template slot="modal-footer">
        <Button @click="launchAlert2" type="primary" class="col-12 icon-rotate">
          Salvar
          <i class="fas fa-save ml-1"></i>
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import alert from '@/services/alert';
import { Button, Modal } from '@/components';

export default Vue.extend({
  components: {
    Button,
    Modal,
  },

  data: () => ({
    isModalVisible: false,
  }),

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

    open() {
      this.isModalVisible = true;
    },

    launchAlert2() {
      alert
        .success('SUCESSO MEU QUERIDOOOO')
        .then(() => (this.isModalVisible = false));
    },

    launchAlert3() {
      alert.error('Deu ruim meu compatriota');
    },
  },
});
</script>

<style></style>

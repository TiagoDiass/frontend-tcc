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

    <div class="view-content">
      <Button type="primary" class="w-100">Cadastrar Animal</Button>

      <VueGoodTable
        class="mt-3 w-100"
        :rows="animals"
        :columns="[
          {
            label: 'Nome',
            field: 'name',
          },
          {
            label: 'Tipo',
            field: 'type',
          },
          {
            label: 'Sexo',
            field: 'gender',
          },
          {
            label: 'Porte',
            field: 'size',
          },
          {
            label: 'Ações',
            field: 'after',
          },
        ]"
        :pagination-options="paginationOptions"
      >
        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field === 'after'">
            <span>ACTIONS</span>
          </div>
        </template>
      </VueGoodTable>
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
        <Button type="primary" class="col-12 icon-rotate">
          Salvar
          <i class="fas fa-save ml-1"></i>
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-var-requires */
import 'vue-good-table/dist/vue-good-table.css';
import Vue from 'vue';
import { Button, Modal } from '@/components';
import { APIAnimal } from '@/@types/Animals';
import { VueGoodTablePaginationOptions } from '@/utils/constants/VueGoodTablePaginationOptions';

export default Vue.extend({
  components: {
    Button,
    Modal,
    VueGoodTable: require('vue-good-table').VueGoodTable,
  },

  data: () => ({
    paginationOptions: VueGoodTablePaginationOptions,
    isModalVisible: false,
    animals: [
      {
        id: '8880a8d5-c158-47e6-a3a8-2f0f6ed827f3',
        name: 'twister',
        type: 'cat',
        size: 'P',
        gender: 'M',
        pictureUrl:
          'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2F0fHx8fHx8MTYzMjkxNjQ3Nw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
      },
      {
        id: '1cafbb52-c964-4e24-af09-46cc988a93b8',
        name: 'dudu',
        type: 'dog',
        size: 'P',
        gender: 'M',
        pictureUrl:
          'https://images.unsplash.com/photo-1583511666372-62fc211f8377?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=450&ixid=MnwxfDB8MXxyYW5kb218MHx8ZG9nfHx8fHx8MTYzMjkxNjIwMw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=450',
      },
    ] as APIAnimal[],
  }),

  methods: {},
});
</script>

<style></style>

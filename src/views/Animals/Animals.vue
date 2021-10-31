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

    <div
      v-if="isLoading"
      class="view-content d-flex justify-content-center align-items-center"
    >
      <LoadingSpinner />
    </div>
    <div v-else class="view-content">
      <Button type="primary" class="w-100" @click="openModal"
        >Cadastrar Animal</Button
      >

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
        <p slot="emptystate" class="text-center m-0">
          Nenhum animal encontrado
        </p>

        <template slot="table-row" slot-scope="props">
          <div
            v-if="props.column.field === 'after'"
            class="media-body text-rigth d-flex justify-content-around"
          >
            <Button type="blue" class="mr-1">
              <i class="fas fa-eye"></i>
            </Button>

            <Button type="warning" class="mr-1">
              <i class="fas fa-edit"></i>
            </Button>

            <Button type="danger">
              <i class="fas fa-trash-alt ml-1"></i>
            </Button>
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
        <Button
          type="primary"
          class="col-12 icon-rotate"
          @click="isModalVisible = false"
        >
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
import { Button, Modal, LoadingSpinner } from '@/components';
import { VueGoodTablePaginationOptions } from '@/utils/constants/VueGoodTablePaginationOptions';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  components: {
    Button,
    Modal,
    VueGoodTable: require('vue-good-table').VueGoodTable,
    LoadingSpinner,
  },

  mounted() {
    this.fetchAnimals();
  },

  data: () => ({
    paginationOptions: VueGoodTablePaginationOptions,
    isModalVisible: false,
  }),

  computed: {
    ...mapGetters({
      animals: 'animals/getAnimals',
      isLoading: 'animals/getIsLoading',
    }),
  },

  methods: {
    ...mapActions({
      fetchAnimals: 'animals/fetchAnimals',
    }),

    openModal() {
      this.isModalVisible = true;
    },
  },
});
</script>

<style></style>

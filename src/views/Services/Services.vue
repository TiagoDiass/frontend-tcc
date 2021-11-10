<template>
  <div class="services view">
    <div class="view-header">
      <h1>Serviços</h1>

      <p>
        Este é o módulo de
        <span class="text-primary text-bold">Serviços</span>, onde você poderá
        fazer a gestão de todos os serviços realizados pelos voluntários
      </p>
    </div>

    <div
      v-if="isLoading"
      class="view-content d-flex justify-content-center align-items-center"
    >
      <LoadingSpinner />
    </div>
    <div v-else>
      <Button category="primary" class="w-100"> Cadastrar Serviço </Button>

      <VueGoodTable
        class="mt-3 w-100"
        :rows="services"
        :columns="[
          {
            label: 'Título',
            field: 'title',
          },
          {
            label: 'Descrição',
            field: 'description',
          },
          {
            label: 'Ações',
            field: 'actions',
          },
        ]"
        :pagination-options="paginationOptions"
      >
        <p slot="emptystate" class="text-center m-0">
          Nenhum serviço encontrado
        </p>

        <template slot="table-row" slot-scope="props">
          <div
            v-if="props.column.field === 'actions'"
            class="media-body text-rigth d-flex justify-content-center"
          >
            <Button category="blue" class="mr-1">
              <i class="fas fa-eye"></i>
            </Button>

            <Button category="warning" class="mr-1">
              <i class="fas fa-edit"></i>
            </Button>

            <Button category="danger">
              <i class="fas fa-trash-alt ml-1"></i>
            </Button>
          </div>
        </template>
      </VueGoodTable>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-var-requires */
import 'vue-good-table/dist/vue-good-table.css';
import Vue from 'vue';
import { Button } from '@/components';
import { mapActions, mapGetters } from 'vuex';
import { VueGoodTablePaginationOptions } from '@/utils/constants/VueGoodTablePaginationOptions';

export default Vue.extend({
  components: {
    Button,
    VueGoodTable: require('vue-good-table').VueGoodTable,
  },

  mounted() {
    this.fetchServices();
  },

  data: () => ({
    paginationOptions: VueGoodTablePaginationOptions,
  }),

  computed: {
    ...mapGetters({
      services: 'services/getServices',
      isLoading: 'services/getIsLoading',
    }),
  },

  methods: {
    ...mapActions({
      fetchServices: 'services/fetchServices',
    }),
  },
});
</script>

<style></style>

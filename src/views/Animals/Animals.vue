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
      <Button category="primary" class="w-100" @click="openModal"
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
            field: 'actions',
          },
        ]"
        :pagination-options="paginationOptions"
      >
        <p slot="emptystate" class="text-center m-0">
          Nenhum animal encontrado
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

    <Modal size="lg" :isVisible="isModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          Cadastrar SHIT
          <i class="fas fa-users"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <form class="row" @submit="doSomeShit">
          <Input
            id="teste"
            label="Meu lindo teste"
            v-model="name"
            required
            placeholder="Shit here we go"
            mask="###.###.###-##"
            :masked="true"
          >
            <template slot="errorBlock">
              <span>RG é requerido</span>
            </template>
          </Input>
        </form>
      </template>

      <template slot="modal-footer">
        <Button
          category="primary"
          class="col-12 icon-rotate"
          @click="doSomeShit"
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
import { Button, Modal, LoadingSpinner, Input } from '@/components';
import { VueGoodTablePaginationOptions } from '@/utils/constants/VueGoodTablePaginationOptions';
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';

export default Vue.extend({
  components: {
    Button,
    Modal,
    Input,
    VueGoodTable: require('vue-good-table').VueGoodTable,
    LoadingSpinner,
  },

  mounted() {
    this.fetchAnimals();
  },

  data: () => ({
    paginationOptions: VueGoodTablePaginationOptions,
    isModalVisible: true,
    name: '',
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

    doSomeShit(event: Event) {
      event.preventDefault();

      console.log(this.name);

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully',
      });
    },
  },
});
</script>

<style></style>

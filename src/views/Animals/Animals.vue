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
      <Button
        category="primary"
        class="w-100"
        @click="modals.isCreateAnimalModalVisible = true"
      >
        Cadastrar Animal
      </Button>

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
            <Button
              category="blue"
              class="mr-1"
              @click="openDetailsModal(props.row.id)"
            >
              <i class="fas fa-eye"></i>
            </Button>

            <Button
              category="warning"
              class="mr-1"
              @click="openEditModal(props.row.id)"
            >
              <i class="fas fa-edit"></i>
            </Button>

            <Button
              category="danger"
              @click="confirmAnimalDelete(props.row.id)"
            >
              <i class="fas fa-trash-alt ml-1"></i>
            </Button>
          </div>
        </template>
      </VueGoodTable>
    </div>

    <!-- Modal de cadastro e edição -->
    <Modal size="lg" :isVisible="modals.isCreateAnimalModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          {{ currentModalLabel }} animal
          <i class="fas fa-dog"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <form class="row" @submit="submitForm">
          <div class="form-group col-6">
            <label for="name">Nome *</label>
            <input
              id="name"
              type="text"
              v-model="form.name"
              class="form-control"
              placeholder="Digite o nome do animal"
            />
          </div>

          <Select
            id="type"
            label="Tipo"
            class="col-6"
            v-model="form.type"
            :options="[
              { label: 'Selecione o tipo do animal', value: '' },
              { label: 'Cão', value: 'dog' },
              { label: 'Gato', value: 'cat' },
            ]"
            required
          />

          <Select
            id="size"
            label="Porte"
            class="col-6"
            v-model="form.size"
            :options="[
              { label: 'Selecione o porte do animal', value: '' },
              { label: 'Pequeno', value: 'P' },
              { label: 'Médio', value: 'M' },
              { label: 'Grande', value: 'G' },
            ]"
            required
          />

          <Select
            id="gender"
            label="Sexo"
            class="col-6"
            v-model="form.gender"
            :options="[
              { label: 'Selecione o sexo do animal', value: '' },
              { label: 'Femêa', value: 'F' },
              { label: 'Macho', value: 'M' },
            ]"
            required
          />

          <div class="form-group col-12">
            <label for="pictureUrl">Endereço da foto do animal</label>
            <input
              type="text"
              class="form-control"
              placeholder="Digite o endereço para a foto do animal"
              v-model="form.pictureUrl"
            />
          </div>

          <div
            v-if="form.pictureUrl"
            class="col-12 d-flex justify-content-around align-items-center"
          >
            <span class="text-bold">Preview da foto</span>
            <img :src="form.pictureUrl" style="max-width: 250px" />
          </div>
        </form>
      </template>

      <template slot="modal-footer">
        <Button category="danger" class="col-6" @click="closeCreateAnimalModal"
          >Cancelar <i class="fas fa-times-circle" />
        </Button>

        <Button
          category="primary"
          class="col-6 icon-rotate"
          @click="submitForm"
        >
          Salvar
          <i class="fas fa-save ml-1"></i>
        </Button>
      </template>
    </Modal>

    <Modal size="lg" :isVisible="modals.isAnimalDetailsModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          Visualizar animal
          <i class="fas fa-dog"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <form class="row">
          <div class="form-group col-6">
            <label for="name">Nome *</label>
            <input
              id="name"
              type="text"
              v-model="form.name"
              class="form-control"
              placeholder="Digite o nome do animal"
              disabled
            />
          </div>

          <Select
            id="type"
            label="Tipo"
            class="col-6"
            v-model="form.type"
            :options="[
              { label: 'Selecione o tipo do animal', value: '' },
              { label: 'Cão', value: 'dog' },
              { label: 'Gato', value: 'cat' },
            ]"
            required
            disabled
          />

          <Select
            id="size"
            label="Porte"
            class="col-6"
            v-model="form.size"
            :options="[
              { label: 'Selecione o porte do animal', value: '' },
              { label: 'Pequeno', value: 'P' },
              { label: 'Médio', value: 'M' },
              { label: 'Grande', value: 'G' },
            ]"
            required
            disabled
          />

          <Select
            id="gender"
            label="Sexo"
            class="col-6"
            v-model="form.gender"
            :options="[
              { label: 'Selecione o sexo do animal', value: '' },
              { label: 'Femêa', value: 'F' },
              { label: 'Macho', value: 'M' },
            ]"
            required
            disabled
          />

          <div class="form-group col-12">
            <label for="pictureUrl">Endereço da foto do animal</label>
            <input
              type="text"
              class="form-control"
              placeholder="Digite o endereço para a foto do animal"
              v-model="form.pictureUrl"
              disabled
            />
          </div>

          <div
            v-if="form.pictureUrl"
            class="col-12 d-flex justify-content-around align-items-center"
          >
            <span class="text-bold">Preview da foto</span>
            <img :src="form.pictureUrl" style="max-width: 250px" />
          </div>
        </form>
      </template>

      <template slot="modal-footer">
        <Button
          category="danger"
          class="col-12"
          @click="modals.isAnimalDetailsModalVisible = false"
          >Fechar <i class="fas fa-times-circle" />
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-var-requires */
import 'vue-good-table/dist/vue-good-table.css';
import Vue from 'vue';
import { Button, Modal, LoadingSpinner, Input, Select } from '@/components';
import { VueGoodTablePaginationOptions } from '@/utils/constants/VueGoodTablePaginationOptions';
import { mapActions, mapGetters } from 'vuex';
import { ActionResponse } from '@/store';
import alert from '@/services/alert';
import showToast from '@/services/toast';
import { animalsRequests } from '@/services/api/requests';

export default Vue.extend({
  components: {
    Button,
    Modal,
    // eslint-disable-next-line vue/no-unused-components
    Input,
    VueGoodTable: require('vue-good-table').VueGoodTable,
    LoadingSpinner,
    // eslint-disable-next-line vue/no-unused-components
    Select,
  },

  mounted() {
    this.fetchAnimals();
  },

  data: () => ({
    paginationOptions: VueGoodTablePaginationOptions,
    modals: {
      isAnimalDetailsModalVisible: false,
      isCreateAnimalModalVisible: false,
      currentModal: '' as 'create' | 'edit',
    },
    form: {
      id: '',
      name: '',
      type: '',
      size: '',
      gender: '',
      pictureUrl: '',
    },
  }),

  computed: {
    ...mapGetters({
      animals: 'animals/getAnimals',
      isLoading: 'animals/getIsLoading',
    }),

    currentModalLabel(): 'Criar' | 'Editar' {
      const modalLabels = {
        create: 'Criar',
        edit: 'Editar',
      } as const;

      return modalLabels[this.modals.currentModal];
    },
  },

  methods: {
    ...mapActions({
      fetchAnimals: 'animals/fetchAnimals',
      addAnimal: 'animals/addAnimal',
      deleteAnimal: 'animals/deleteAnimal',
      updateAnimal: 'animals/updateAnimal',
    }),

    closeCreateAnimalModal() {
      this.modals.isCreateAnimalModalVisible = false;
    },

    async openEditModal(animalId: string) {
      const animal = await this.getAnimal(animalId);

      if (!animal) {
        alert.error('Esse animal não existe mais').then(this.fetchAnimals);
        return;
      }

      this.form = {
        id: animal.id,
        name: animal.name,
        type: animal.type,
        gender: animal.gender,
        size: animal.size,
        pictureUrl: animal.pictureUrl || '',
      };

      this.modals.currentModal = 'edit';
      this.modals.isCreateAnimalModalVisible = true;
    },

    async openDetailsModal(animalId: string) {
      const animal = await this.getAnimal(animalId);

      if (!animal) {
        alert.error('Esse animal não existe mais').then(this.fetchAnimals);
        return;
      }

      this.form = {
        id: animal.id,
        name: animal.name,
        type: animal.type,
        gender: animal.gender,
        size: animal.size,
        pictureUrl: animal.pictureUrl || '',
      };

      this.modals.isAnimalDetailsModalVisible = true;
    },

    async getAnimal(animalId: string) {
      const { data } = await animalsRequests.getById(animalId);

      return data.data;
    },

    async submitForm(event: Event) {
      event.preventDefault();

      const submits = {
        create: this.submitCreateForm,
        edit: this.submitEditForm,
      } as const;

      submits[this.modals.currentModal]();

      return;
    },

    async submitEditForm() {
      const response: ActionResponse = await this.updateAnimal(this.form);

      if (response.status === 200) {
        this.fetchAnimals();
        this.modals.isCreateAnimalModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async submitCreateForm() {
      const response: ActionResponse = await this.addAnimal(this.form);

      if (response.status === 201) {
        this.fetchAnimals();
        this.modals.isCreateAnimalModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async confirmAnimalDelete(animalId: string) {
      const { answer } = await alert.question({
        text: 'Essa operação não poderá ser desfeita',
      });

      if (answer === 'yes') {
        const deleteResponse: ActionResponse = await this.deleteAnimal(
          animalId
        );

        const isSuccessResponse = deleteResponse.status === 200;

        if (isSuccessResponse) {
          this.fetchAnimals();
        }

        showToast({
          icon: isSuccessResponse ? 'success' : 'error',
          text: isSuccessResponse
            ? 'Animal excluído com sucesso'
            : deleteResponse.message,
        });
      } else {
        showToast({ icon: 'info', text: 'O animal não foi excluído' });
      }
    },
  },
});
</script>

<style>
label {
  font-weight: 600;
}
</style>

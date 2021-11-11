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
      <Button category="primary" class="w-100" @click="openCreateServiceModal"
        >Cadastrar Serviço</Button
      >

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
              @click="confirmServiceDelete(props.row.id)"
            >
              <i class="fas fa-trash-alt ml-1"></i>
            </Button>
          </div>
        </template>
      </VueGoodTable>
    </div>

    <!-- Modal de cadastro e edição -->
    <Modal size="lg" :isVisible="modals.isCreateServiceModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          {{ currentModalLabel }} serviço
          <i class="fas fa-hand-holding-heart"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <form class="row" @submit="submitForm">
          <div class="form-group col-12">
            <label for="title">Título *</label>
            <input
              id="title"
              type="text"
              v-model="form.title"
              class="form-control"
              placeholder="Digite o título do serviço"
              @focus="$v.form.title.$touch"
            />

            <div
              v-if="$v.form.title.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.title.required"
                >Título do serviço é obrigatório</span
              >
              <span v-if="!$v.form.title.minLength"
                >Título do serviço deve ter pelo menos 5 caracteres</span
              >
            </div>
          </div>

          <div class="form-group col-12">
            <label for="description">Descrição</label>
            <textarea
              style="min-height: 100px; max-height: 150px"
              id="description"
              type="text"
              v-model="form.description"
              class="form-control"
              placeholder="Digite a descrição do serviço"
              @focus="$v.form.description.$touch"
            />

            <div
              v-if="$v.form.description.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.description.maxLength"
                >Descrição do serviço não pode ter mais de 150 caracteres</span
              >
            </div>
          </div>
        </form>
      </template>

      <template slot="modal-footer">
        <Button category="danger" class="col-6" @click="closeCreateServiceModal"
          >Cancelar <i class="fas fa-times-circle" />
        </Button>

        <Button
          category="primary"
          class="col-6 icon-rotate"
          @click="submitForm"
          :disabled="$v.form.$invalid"
        >
          Salvar
          <i class="fas fa-save ml-1"></i>
        </Button>
      </template>
    </Modal>

    <!-- Modal de detalhes -->
    <Modal size="lg" :isVisible="modals.isServiceDetailsModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          Visualizar serviço
          <i class="fas fa-hand-holding-heart"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <form class="row">
          <div class="form-group col-12">
            <label for="title">Título *</label>
            <input
              id="title"
              type="text"
              v-model="form.title"
              class="form-control"
              placeholder="Digite o título do serviço"
              disabled
            />
          </div>

          <div class="form-group col-12">
            <label for="description">Descrição</label>
            <textarea
              style="min-height: 100px; max-height: 150px"
              id="description"
              type="text"
              v-model="form.description"
              class="form-control"
              placeholder="Digite a descrição do serviço"
              disabled
            />
          </div>
        </form>
      </template>

      <template slot="modal-footer">
        <Button
          category="primary"
          class="col-12"
          @click="modals.isServiceDetailsModalVisible = false"
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
import { Button, Modal, LoadingSpinner } from '@/components';
import { mapActions, mapGetters } from 'vuex';
import { VueGoodTablePaginationOptions } from '@/utils/constants/VueGoodTablePaginationOptions';
import { maxLength, minLength, required } from 'vuelidate/lib/validators';
import { ActionResponse } from '@/store';
import showToast from '@/services/toast';
import alert from '@/services/alert';
import { servicesRequests } from '@/services/api/requests';

export default Vue.extend({
  components: {
    Button,
    Modal,
    LoadingSpinner,
    VueGoodTable: require('vue-good-table').VueGoodTable,
  },

  mounted() {
    this.fetchServices();
  },

  data: () => ({
    paginationOptions: VueGoodTablePaginationOptions,
    modals: {
      isServiceDetailsModalVisible: false,
      isCreateServiceModalVisible: false,
      currentModal: '' as 'create' | 'edit',
    },
    form: {
      id: '',
      title: '',
      description: '',
    },
  }),

  computed: {
    ...mapGetters({
      services: 'services/getServices',
      isLoading: 'services/getIsLoading',
    }),

    currentModalLabel(): 'Cadastrar' | 'Editar' {
      const modalLabels = {
        create: 'Cadastrar',
        edit: 'Editar',
      } as const;

      return modalLabels[this.modals.currentModal];
    },
  },

  methods: {
    ...mapActions({
      fetchServices: 'services/fetchServices',
      addService: 'services/addService',
      deleteService: 'services/deleteService',
      updateService: 'services/updateService',
    }),

    openCreateServiceModal() {
      this.$v.$reset();
      this.form = {
        id: '',
        title: '',
        description: '',
      };

      this.modals.currentModal = 'create';
      this.modals.isCreateServiceModalVisible = true;
    },

    closeCreateServiceModal() {
      this.modals.isCreateServiceModalVisible = false;
    },

    async openEditModal(serviceId: string) {
      const service = await this.getService(serviceId);

      if (!service) {
        alert.error('Esse serviço não existe mais').then(this.fetchServices);
        return;
      }

      this.form = {
        id: service.id,
        title: service.title,
        description: service.description,
      };

      this.modals.currentModal = 'edit';
      this.modals.isCreateServiceModalVisible = true;
    },

    async openDetailsModal(serviceId: string) {
      const service = await this.getService(serviceId);

      if (!service) {
        alert.error('Esse serviço não existe mais').then(this.fetchServices);
        return;
      }

      this.form = {
        id: service.id,
        title: service.title,
        description: service.description,
      };

      this.modals.isServiceDetailsModalVisible = true;
    },

    async getService(serviceId: string) {
      const { data } = await servicesRequests.getById(serviceId);

      return data.data;
    },

    submitForm(event: Event) {
      event.preventDefault();

      const submits = {
        create: this.submitCreateForm,
        edit: this.submitEditForm,
      } as const;

      submits[this.modals.currentModal]();

      return;
    },

    async submitCreateForm() {
      const response: ActionResponse = await this.addService(this.form);

      if (response.status === 201) {
        this.fetchServices();
        this.modals.isCreateServiceModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async submitEditForm() {
      const response: ActionResponse = await this.updateService(this.form);

      if (response.status === 200) {
        this.fetchServices();
        this.modals.isCreateServiceModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async confirmServiceDelete(serviceId: string) {
      const { answer } = await alert.question({
        text: 'Essa operação não poderá ser desfeita',
      });

      if (answer === 'yes') {
        const deleteResponse: ActionResponse = await this.deleteService(
          serviceId
        );

        const isSuccessResponse = deleteResponse.status === 200;

        if (isSuccessResponse) {
          this.fetchServices();
        }

        showToast({
          icon: isSuccessResponse ? 'success' : 'error',
          text: isSuccessResponse
            ? 'Serviço excluído com sucesso'
            : deleteResponse.message,
        });
      } else {
        showToast({ icon: 'info', text: 'O serviço não foi excluído' });
      }
    },
  },

  validations: {
    form: {
      title: { required, minLength: minLength(5) },
      description: { maxLength: maxLength(150) },
    },
  },
});
</script>

<style>
label {
  font-weight: 600;
}
</style>

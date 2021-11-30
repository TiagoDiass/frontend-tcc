<template>
  <main class="help-cases view">
    <div class="view-header">
      <h1>Casos de ajuda</h1>

      <p>
        Este é o módulo de
        <span class="text-primary text-bold">Casos de ajuda</span>, onde você
        pode gerenciar todos os casos de ajuda da ONG;
      </p>
    </div>

    <div
      v-if="isLoading"
      class="view-content d-flex justify-content-center align-items-center"
    >
      <LoadingSpinner />
    </div>
    <div v-else>
      <Button category="primary" class="w-100" @click="openCreateModal">
        Cadastrar caso de ajuda
      </Button>

      <VueGoodTable
        class="mt-3 w-100"
        :rows="helpCases"
        :columns="[
          {
            label: 'Título',
            field: 'title',
            width: '20%',
          },
          {
            label: 'Descrição',
            field: 'description',
            width: '65%',
          },
          {
            label: 'Ações',
            field: 'actions',
          },
        ]"
        :pagination-options="paginationOptions"
      >
        <p slot="emptystate" class="text-center m-0">
          Nenhum caso de ajuda encontrado
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
              @click="confirmHelpCaseDelete(props.row.id)"
            >
              <i class="fas fa-trash-alt ml-1"></i>
            </Button>
          </div>
        </template>
      </VueGoodTable>
    </div>

    <!-- Modal de cadastro e edição -->
    <Modal size="lg" :isVisible="modals.isCreateHelpCaseModalVisible">
      <template slot="modal-header">
        <div class="w-100 d-flex align-items-center justify-content-between">
          <h4 class="modal-title text-uppercase text-bold">
            {{ currentModalLabel }} caso de ajuda
            <i class="fas fa-life-ring"></i>
          </h4>

          <span @click="closeCreateModal"
            ><i class="fas fa-times-circle"
          /></span>
        </div>
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
              placeholder="Digite o título do caso"
              @focus="$v.form.title.$touch"
            />

            <div
              v-if="$v.form.title.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.title.required"
                >Título do caso é obrigatório</span
              >
              <span v-if="!$v.form.title.minLength"
                >Título do caso deve ter pelo menos 5 caracteres</span
              >
            </div>
          </div>

          <div class="form-group col-12">
            <label for="description">Descrição</label>
            <textarea
              style="min-height: 150px; max-height: 250px"
              id="description"
              type="text"
              v-model="form.description"
              class="form-control"
              placeholder="Digite a descrição do caso"
              @focus="$v.form.description.$touch"
            />

            <div
              v-if="$v.form.description.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.description.maxLength"
                >Descrição do caso não pode ter mais de 320 caracteres</span
              >
            </div>
          </div>

          <div class="form-group col-12">
            <label for="poolMoneyUrl">Link para vaquinha</label>
            <input
              id="poolMoneyUrl"
              type="text"
              v-model="form.poolMoneyUrl"
              class="form-control"
              placeholder="Digite o link da vaquinha, se este caso possuir uma"
              @focus="$v.form.poolMoneyUrl.$touch"
            />

            <div
              v-if="$v.form.poolMoneyUrl.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.poolMoneyUrl.isValidUrl"
                >Link para vaquinha do caso deve ser uma URL válida</span
              >
            </div>
          </div>

          <div class="col-12">
            <Button
              type="button"
              category="primary w-100"
              @click="form.pictures.push('')"
              >Clique aqui para adiconar uma foto ao caso</Button
            >
          </div>

          <template v-for="(picture, index) in form.pictures">
            <div class="col-12 d-flex align-items-end mt-3" :key="index">
              <div class="w-50">
                <label :for="`title-${index}`">URL de foto</label>
                <input
                  :id="`title-${index}`"
                  type="text"
                  v-model="form.pictures[index]"
                  class="form-control"
                  placeholder="Digite a URL"
                  @focus="$v.form.pictures.$each[index].$touch"
                />

                <div
                  v-if="$v.form.pictures.$each[index].$error"
                  class="text-danger invalid-feedback"
                  style="display: block"
                >
                  <span v-if="!$v.form.pictures.$each[index].minLength"
                    >Uma URL de foto do caso deve ser uma URL válida</span
                  >
                </div>
              </div>

              <div class="w-25 d-flex justify-content-center">
                <img
                  v-if="picture"
                  :src="picture"
                  alt="Foto do caso"
                  style="width: 80%; border-radius: 16px"
                />
              </div>

              <Button
                class="w-25"
                style="height: min-content"
                category="danger"
                @click="removePicture(index)"
                type="button"
                >Remover foto</Button
              >
            </div>
          </template>
        </form>
      </template>

      <template slot="modal-footer">
        <Button category="danger" class="col-6" @click="closeCreateModal"
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
    <Modal size="lg" :isVisible="modals.isHelpCaseDetailsModalVisible">
      <template slot="modal-header">
        <div class="w-100 d-flex align-items-center justify-content-between">
          <h4 class="modal-title text-uppercase text-bold">
            Visualizar caso de ajuda
            <i class="fas fa-life-ring"></i>
          </h4>

          <span @click="modals.isHelpCaseDetailsModalVisible = false"
            ><i class="fas fa-times-circle"
          /></span>
        </div>
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
              disabled
            />
          </div>

          <div class="form-group col-12">
            <label for="description">Descrição</label>
            <textarea
              style="min-height: 150px; max-height: 250px"
              id="description"
              type="text"
              v-model="form.description"
              class="form-control"
              disabled
            />
          </div>

          <div class="form-group col-12">
            <label for="poolMoneyUrl">Link para vaquinha</label>
            <input
              id="poolMoneyUrl"
              type="text"
              v-model="form.poolMoneyUrl"
              class="form-control"
              disabled
            />
          </div>

          <template v-for="(picture, index) in form.pictures">
            <div class="col-12 d-flex align-items-end mt-3" :key="index">
              <div class="w-50">
                <label :for="`title-${index}`">URL de foto</label>
                <input
                  :id="`title-${index}`"
                  type="text"
                  v-model="form.pictures[index]"
                  class="form-control"
                  disabled
                />
              </div>

              <div class="w-50 d-flex justify-content-center">
                <img
                  v-if="picture"
                  :src="picture"
                  alt="Foto do caso"
                  style="width: 55%; border-radius: 16px"
                />
              </div>
            </div>
          </template>
        </form>
      </template>

      <template slot="modal-footer">
        <Button
          category="primary"
          class="col-12 icon-rotate"
          @click="modals.isHelpCaseDetailsModalVisible = false"
        >
          Fechar
          <i class="fas fa-times-circle" />
        </Button>
      </template>
    </Modal>
  </main>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-var-requires */
import 'vue-good-table/dist/vue-good-table.css';
import Vue from 'vue';
import { Button, Modal, LoadingSpinner } from '@/components';
import { mapActions, mapGetters } from 'vuex';
import { VueGoodTablePaginationOptions } from '@/utils/constants/VueGoodTablePaginationOptions';
import { maxLength, minLength, required, url } from 'vuelidate/lib/validators';
import { ActionResponse } from '@/store';
import showToast from '@/services/toast';
import alert from '@/services/alert';
import { helpCasesRequests } from '@/services/api/requests';

export default Vue.extend({
  components: {
    Button,
    Modal,
    LoadingSpinner,
    VueGoodTable: require('vue-good-table').VueGoodTable,
  },

  mounted() {
    this.fetchHelpCases();
  },

  data: () => ({
    paginationOptions: VueGoodTablePaginationOptions,
    modals: {
      isHelpCaseDetailsModalVisible: false,
      isCreateHelpCaseModalVisible: false,
      currentModal: '' as 'create' | 'edit',
    },

    form: {
      id: '',
      title: '',
      description: '',
      pictures: [] as string[],
      poolMoneyUrl: null as string | null,
    },
  }),

  computed: {
    ...mapGetters({
      helpCases: 'helpCases/getHelpCases',
      isLoading: 'helpCases/getIsLoading',
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
      fetchHelpCases: 'helpCases/fetchHelpCases',
      addHelpCase: 'helpCases/addHelpCase',
      deleteHelpCase: 'helpCases/deleteHelpCase',
      updateHelpCase: 'helpCases/updateHelpCase',
    }),

    openCreateModal() {
      this.$v.$reset();
      this.form = {
        id: '',
        title: '',
        description: '',
        pictures: [],
        poolMoneyUrl: null,
      };

      this.modals.currentModal = 'create';
      this.modals.isCreateHelpCaseModalVisible = true;
    },

    closeCreateModal() {
      this.modals.isCreateHelpCaseModalVisible = false;
    },

    async openEditModal(helpCaseId: string) {
      const helpCase = await this.getHelpCase(helpCaseId);

      if (!helpCase) {
        alert
          .error('Esse caso de ajuda não existe mais')
          .then(this.fetchHelpCases);
        return;
      }

      this.form = {
        ...helpCase,
      };

      this.modals.currentModal = 'edit';
      this.modals.isCreateHelpCaseModalVisible = true;
    },

    async openDetailsModal(helpCaseId: string) {
      const helpCase = await this.getHelpCase(helpCaseId);

      if (!helpCase) {
        alert.error('Esse produto não existe mais').then(this.fetchHelpCases);
        return;
      }

      this.form = {
        ...helpCase,
      };

      this.modals.isHelpCaseDetailsModalVisible = true;
    },

    async getHelpCase(helpCaseId: string) {
      const { data } = await helpCasesRequests.getById(helpCaseId);

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
      const response: ActionResponse = await this.addHelpCase(this.form);

      if (response.status === 201) {
        this.fetchHelpCases();
        this.modals.isCreateHelpCaseModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async submitEditForm() {
      const response: ActionResponse = await this.updateHelpCase(this.form);

      if (response.status === 200) {
        this.fetchHelpCases();
        this.modals.isCreateHelpCaseModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async confirmHelpCaseDelete(helpCaseId: string) {
      const { answer } = await alert.question({
        text: 'Essa operação não poderá ser desfeita',
      });

      if (answer === 'yes') {
        const deleteResponse: ActionResponse = await this.deleteHelpCase(
          helpCaseId
        );

        const isSuccessResponse = deleteResponse.status === 200;

        if (isSuccessResponse) {
          this.fetchHelpCases();
        }

        showToast({
          icon: isSuccessResponse ? 'success' : 'error',
          text: isSuccessResponse
            ? 'Caso de ajuda excluído com sucesso'
            : deleteResponse.message,
        });
      } else {
        showToast({ icon: 'info', text: 'O caso de ajuda não foi excluído' });
      }
    },

    removePicture(index: number) {
      this.form.pictures.splice(index, 1);
    },
  },

  validations: {
    form: {
      title: { required, minLength: minLength(5) },
      description: { maxLength: maxLength(320) },
      pictures: { $each: { isValidUrl: url } },
      poolMoneyUrl: { isValidUrl: url },
    },
  },
});
</script>

<style>
label {
  font-weight: 600;
}
</style>

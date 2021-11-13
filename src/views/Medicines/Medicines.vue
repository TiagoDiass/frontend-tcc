<template>
  <main class="products view">
    <div class="view-header">
      <h1>Medicamentos</h1>

      <p>
        Este é o módulo de
        <span class="text-primary text-bold">Medicamentos</span>, onde você pode
        gerenciar todos os medicamentos armazenados da ONG
      </p>
    </div>

    <div
      v-if="isLoading"
      class="view-content d-flex justify-content-center align-items-center"
    >
      <LoadingSpinner />
    </div>
    <div v-else>
      <Button category="primary" class="w-100" @click="openCreateMedicineModal">
        Cadastrar Medicamento
      </Button>

      <VueGoodTable
        class="mt-3 w-100"
        :rows="medicines"
        :columns="[
          {
            label: 'Nome',
            field: 'name',
          },
          {
            label: 'Data de validade',
            field: 'expirationDate',
          },
          {
            label: 'Ações',
            field: 'actions',
          },
        ]"
        :pagination-options="paginationOptions"
      >
        <p slot="emptystate" class="text-center m-0">
          Nenhum medicamento encontrado
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
              @click="confirmMedicineDelete(props.row.id)"
            >
              <i class="fas fa-trash-alt ml-1"></i>
            </Button>
          </div>
        </template>
      </VueGoodTable>
    </div>

    <!-- Modal de cadastro e edição -->
    <Modal size="lg" :isVisible="modals.isCreateMedicineModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          {{ currentModalLabel }} medicamento
          <i class="fas fa-capsules"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <form class="row" @submit="submitForm">
          <div class="form-group col-12">
            <label for="name">Nome *</label>
            <input
              id="name"
              type="text"
              v-model="form.name"
              class="form-control"
              placeholder="Digite o nome do medicamento"
              @focus="$v.form.name.$touch"
            />

            <div
              v-if="$v.form.name.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.name.required"
                >Nome do medicamento é obrigatório</span
              >
              <span v-if="!$v.form.name.minLength"
                >Nome do medicamento deve ter pelo menos 4 caracteres</span
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
              placeholder="Digite a descrição do medicamento"
              @focus="$v.form.description.$touch"
            />

            <div
              v-if="$v.form.description.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.description.maxLength"
                >Descrição do medicamento não pode ter mais de 150
                caracteres</span
              >
            </div>
          </div>

          <div class="form-group col-12">
            <label for="expirationDate">Data de validade *</label>
            <input
              id="expirationDate"
              type="date"
              v-model="form.expirationDate"
              class="form-control"
              placeholder="Digite a data de validade do medicamento"
              @focus="$v.form.expirationDate.$touch"
            />

            <div
              v-if="$v.form.expirationDate.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.expirationDate.required"
                >Data de validade do medicamento é obrigatório</span
              >
            </div>
          </div>

          <RadioCards
            v-model="form.amount.unit"
            class="form-group col-12"
            name="unit"
            label="Unidade da quantidade da dose do medicamento"
            required
            :options="[
              { label: 'Mililitros', value: 'mls' },
              { label: 'Miligramas', value: 'mgs' },
              { label: 'Quantidade de comprimidos', value: 'pill amount' },
            ]"
          />

          <div class="form-group col-12">
            <label for="value"
              >Valor da quantidade da dose do medicamento *</label
            >
            <input
              id="value"
              type="number"
              v-model.number="form.amount.value"
              class="form-control"
              placeholder="Digite o valor da quantidade da dose do medicamento"
              @focus="$v.form.amount.value.$touch"
            />

            <div
              v-if="$v.form.amount.value.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.amount.value.required"
                >Valor da quantidade da dose do medicamento é obrigatório</span
              >
            </div>
          </div>
        </form>
      </template>

      <template slot="modal-footer">
        <Button
          category="danger"
          class="col-6"
          @click="closeCreateMedicineModal"
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

    <Modal size="lg" :isVisible="modals.isMedicineDetailsModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          Visualizar medicamento
          <i class="fas fa-capsules"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <form class="row">
          <div class="form-group col-12">
            <label for="name">Nome *</label>
            <input
              id="name"
              type="text"
              v-model="form.name"
              class="form-control"
              placeholder="Digite o nome do medicamento"
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
              placeholder="Digite a descrição do medicamento"
              disabled
            />
          </div>

          <div class="form-group col-12">
            <label for="expirationDate">Data de validade *</label>
            <input
              id="expirationDate"
              type="date"
              v-model="form.expirationDate"
              class="form-control"
              placeholder="Digite a data de validade do medicamento"
              disabled
            />
          </div>

          <RadioCards
            v-model="form.amount.unit"
            class="form-group col-12"
            name="unit"
            label="Unidade da quantidade da dose do medicamento"
            required
            :options="[
              { label: 'Mililitros', value: 'mls' },
              { label: 'Miligramas', value: 'mgs' },
              { label: 'Quantidade de comprimidos', value: 'pill amount' },
            ]"
            disabled
          />

          <div class="form-group col-12">
            <label for="value"
              >Valor da quantidade da dose do medicamento *</label
            >
            <input
              id="value"
              type="number"
              v-model.number="form.amount.value"
              class="form-control"
              placeholder="Digite o valor da quantidade da dose do medicamento"
              disabled
            />
          </div>
        </form>
      </template>

      <template slot="modal-footer">
        <Button
          category="primary"
          class="col-12"
          @click="modals.isMedicineDetailsModalVisible = false"
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
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable vue/no-unused-components */
import 'vue-good-table/dist/vue-good-table.css';
import Vue from 'vue';
import { Button, Modal, LoadingSpinner, RadioCards } from '@/components';
import { mapActions, mapGetters } from 'vuex';
import { VueGoodTablePaginationOptions } from '@/utils/constants/VueGoodTablePaginationOptions';
import { maxLength, minLength, required } from 'vuelidate/lib/validators';
import { ActionResponse } from '@/store';
import showToast from '@/services/toast';
import alert from '@/services/alert';
import { medicinesRequests } from '@/services/api/requests';

export default Vue.extend({
  components: {
    Button,
    Modal,
    LoadingSpinner,
    VueGoodTable: require('vue-good-table').VueGoodTable,
    RadioCards,
  },

  mounted() {
    this.fetchMedicines();
  },

  data: () => ({
    paginationOptions: VueGoodTablePaginationOptions,
    modals: {
      isMedicineDetailsModalVisible: false,
      isCreateMedicineModalVisible: false,
      currentModal: '' as 'create' | 'edit',
    },

    form: {
      id: '',
      name: '',
      description: '',
      expirationDate: '',
      amount: {
        value: '' as unknown as number,
        unit: '',
      },
    },
  }),

  computed: {
    ...mapGetters({
      medicines: 'medicines/getMedicines',
      isLoading: 'medicines/getIsLoading',
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
      fetchMedicines: 'medicines/fetchMedicines',
      addMedicine: 'medicines/addMedicine',
      deleteMedicine: 'medicines/deleteMedicine',
      updateMedicine: 'medicines/updateMedicine',
    }),

    openCreateMedicineModal() {
      this.$v.$reset();
      this.form = {
        id: '',
        name: '',
        description: '',
        expirationDate: '',
        amount: {
          value: '' as unknown as number,
          unit: '',
        },
      };

      this.modals.currentModal = 'create';
      this.modals.isCreateMedicineModalVisible = true;
    },

    closeCreateMedicineModal() {
      this.modals.isCreateMedicineModalVisible = false;
    },

    async openEditModal(medicineId: string) {
      const medicine = await this.getMedicine(medicineId);

      if (!medicine) {
        alert
          .error('Esse medicamento não existe mais')
          .then(this.fetchMedicines);
        return;
      }

      this.form = {
        ...medicine,
      };

      this.modals.currentModal = 'edit';
      this.modals.isCreateMedicineModalVisible = true;
    },

    async openDetailsModal(medicineId: string) {
      const medicine = await this.getMedicine(medicineId);

      if (!medicine) {
        alert.error('Esse produto não existe mais').then(this.fetchMedicines);
        return;
      }

      this.form = {
        ...medicine,
      };

      this.modals.isMedicineDetailsModalVisible = true;
    },

    async getMedicine(medicineId: string) {
      const { data } = await medicinesRequests.getById(medicineId);

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
      const response: ActionResponse = await this.addMedicine(this.form);

      if (response.status === 201) {
        this.fetchMedicines();
        this.modals.isCreateMedicineModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async submitEditForm() {
      const response: ActionResponse = await this.updateMedicine(this.form);

      if (response.status === 200) {
        this.fetchMedicines();
        this.modals.isCreateMedicineModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async confirmMedicineDelete(medicineId: string) {
      const { answer } = await alert.question({
        text: 'Essa operação não poderá ser desfeita',
      });

      if (answer === 'yes') {
        const deleteResponse: ActionResponse = await this.deleteMedicine(
          medicineId
        );

        const isSuccessResponse = deleteResponse.status === 200;

        if (isSuccessResponse) {
          this.fetchMedicines();
        }

        showToast({
          icon: isSuccessResponse ? 'success' : 'error',
          text: isSuccessResponse
            ? 'Medicamento excluído com sucesso'
            : deleteResponse.message,
        });
      } else {
        showToast({ icon: 'info', text: 'O medicamento não foi excluído' });
      }
    },
  },

  validations: {
    form: {
      name: { required, minLength: minLength(4) },
      description: { maxLength: maxLength(150) },
      expirationDate: { required },
      amount: {
        unit: { required },
        value: { required },
      },
    },
  },
});
</script>

<style></style>

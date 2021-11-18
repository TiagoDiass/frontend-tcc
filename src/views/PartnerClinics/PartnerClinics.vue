<template>
  <main class="partner-clinics view">
    <div class="view-header">
      <h1>Clínicas parceiras</h1>

      <p>
        Este é o módulo de
        <span class="text-primary text-bold">Clínicas parceiras</span>, onde
        você poderá gerenciar todas as clínicas parceiras da ONG
      </p>
    </div>

    <div
      v-if="isLoading"
      class="d-flex justify-content-center align-items-center"
    >
      <LoadingSpinner />
    </div>
    <div v-else>
      <Button category="primary" class="w-100" @click="openCreateClinicModal">
        Cadastrar clínica parceira
      </Button>

      <VueGoodTable
        class="mt-3 w-100"
        :rows="clinics"
        :columns="[
          {
            label: 'Nome',
            field: 'name',
          },
          {
            label: 'CNPJ',
            field: 'cnpj',
          },
          {
            label: 'Telefone',
            field: 'phone',
          },
          {
            label: 'E-mail',
            field: 'email',
          },
          {
            label: 'Ações',
            field: 'actions',
          },
        ]"
        :pagination-options="paginationOptions"
      >
        <p slot="emptystate" class="text-center m-0">
          Nenhuma clínica parceira encontrado
        </p>

        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field === 'cnpj'">
            <span>{{ props.row.cnpj | cnpj }}</span>
          </div>
          <div v-else-if="props.column.field === 'phone'">
            <span>{{ props.row.phone | phone }}</span>
          </div>
          <div
            v-else-if="props.column.field === 'actions'"
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
              @click="confirmClinicDelete(props.row.id)"
            >
              <i class="fas fa-trash-alt ml-1"></i>
            </Button>
          </div>
        </template>
      </VueGoodTable>
    </div>

    <!-- Modal de cadastro e edição -->
    <Modal size="lg" :isVisible="modals.isCreateClinicModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          {{ currentModalLabel }} clínica parceira
          <i class="fas fa-clinic-medical"></i>
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
              placeholder="Digite o nome da clínica"
              @focus="$v.form.name.$touch"
              autocomplete="off"
            />

            <div
              v-if="$v.form.name.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.name.required">
                Nome da clínica é obrigatório
              </span>
              <span v-if="!$v.form.name.minLength">
                Nome da clínica deve ter pelo menos 4 caracteres
              </span>
            </div>
          </div>

          <div class="form-group col-6">
            <label for="cnpj">CNPJ *</label>

            <TheMask
              id="cnpj"
              :mask="'##.###.###/####-##'"
              :masked="false"
              type="text"
              v-model="form.cnpj"
              class="form-control"
              placeholder="Digite o CNPJ da clínica"
              autocomplete="off"
            />

            <div
              v-if="$v.form.cnpj.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.cnpj.required">
                CNPJ da clínica é obrigatório
              </span>
              <span v-if="!$v.form.cnpj.minLength">
                CNPJ da clínica deve conter 14 caracteres
              </span>
            </div>
          </div>

          <div class="form-group col-6">
            <label for="email">E-mail *</label>
            <input
              id="email"
              type="text"
              v-model="form.email"
              class="form-control"
              placeholder="Digite o e-mail da clínica"
              @focus="$v.form.email.$touch"
              autocomplete="off"
            />

            <div
              v-if="$v.form.email.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.email.required">
                E-mail da clínica é obrigatório
              </span>
              <span v-if="!$v.form.email.isValidEmail">
                E-mail da clínica deve ser um e-mail válido
              </span>
            </div>
          </div>

          <div class="form-group col-6">
            <label for="phone">Telefone *</label>

            <TheMask
              id="phone"
              :mask="['(##) ####-####', '(##) #####-####']"
              :masked="false"
              type="text"
              v-model="form.phone"
              class="form-control"
              placeholder="Digite o telefone de contato da clínica"
              autocomplete="off"
            />

            <div
              v-if="$v.form.phone.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.phone.required">
                Telefone da clínica é obrigatório
              </span>
              <span v-if="!$v.form.phone.minLength">
                Telefone da clínica deve conter pelo menos 10 caracteres
              </span>
            </div>
          </div>

          <div class="form-group col-6">
            <label for="address.cep">CEP *</label>

            <TheMask
              id="address.cep"
              :mask="'#####-###'"
              :masked="true"
              type="text"
              v-model="form.address.cep"
              class="form-control"
              placeholder="Digite o CEP da clínica"
              autocomplete="off"
            />

            <div
              v-if="$v.form.address.cep.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.address.cep.required">
                CEP da clínica é obrigatório
              </span>
              <span v-if="!$v.form.address.cep.minLength">
                CEP da clínica deve conter 8 caracteres
              </span>
            </div>
          </div>

          <Select
            id="address.state"
            label="Estado"
            class="col-6"
            v-model="form.address.state"
            :options="[
              { label: 'Selecione o estado', value: '' },
              ...BRAZILIAN_STATES_SELECT_OPTIONS,
            ]"
            required
            :error="$v.form.address.state.$error"
            @focus="$v.form.address.state.$touch"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.address.state.required"
                >Estado da clínica é obrigatório</span
              >
            </template>
          </Select>

          <div class="form-group col-8">
            <label for="address.street">Logradouro/Rua *</label>
            <input
              id="address.street"
              type="text"
              v-model="form.address.street"
              class="form-control"
              placeholder="Digite o logradouro do endereço da clínica"
              @focus="$v.form.address.street.$touch"
              autocomplete="off"
            />

            <div
              v-if="$v.form.address.street.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.address.street.required">
                Logradouro da clínica é obrigatório
              </span>
            </div>
          </div>

          <div class="form-group col-4">
            <label for="address.number">Número *</label>
            <input
              id="address.number"
              type="number"
              v-model.number="form.address.number"
              placeholder="Digite o número"
              class="form-control"
              @focus="$v.form.address.number.$touch"
              autocomplete="off"
            />

            <div
              v-if="$v.form.address.number.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.address.number.required">
                Número da clínica é obrigatório
              </span>
            </div>
          </div>

          <div class="form-group col-6">
            <label for="address.city">Cidade *</label>
            <input
              id="address.city"
              type="text"
              v-model="form.address.city"
              placeholder="Digite a cidade da clínica"
              class="form-control"
              @focus="$v.form.address.city.$touch"
            />

            <div
              v-if="$v.form.address.city.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.address.city.required">
                Cidade da clínica é obrigatória
              </span>
            </div>
          </div>

          <div class="form-group col-6">
            <label for="address.district">Bairro *</label>
            <input
              id="address.district"
              type="text"
              v-model="form.address.district"
              placeholder="Digite o bairro da clínica"
              class="form-control"
              @focus="$v.form.address.district.$touch"
              autocomplete="off"
            />

            <div
              v-if="$v.form.address.district.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.address.district.required">
                Bairro da clínica é obrigatória
              </span>
            </div>
          </div>

          <div class="form-group col-12">
            <label for="address.complement">Complemento</label>
            <input
              id="address.complement"
              type="text"
              v-model="form.address.complement"
              placeholder="Digite o complemento caso necessário"
              class="form-control"
            />
          </div>
        </form>
      </template>

      <template slot="modal-footer">
        <Button category="danger" class="col-6" @click="closeCreateClinicModal"
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
    <Modal size="lg" :isVisible="modals.isClinicDetailsModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          Visualizar clínica parceira
          <i class="fas fa-clinic-medical"></i>
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
              placeholder="Digite o nome da clínica"
              disabled
            />
          </div>

          <div class="form-group col-6">
            <label for="cnpj">CNPJ *</label>

            <TheMask
              id="cnpj"
              :mask="'##.###.###/####-##'"
              :masked="false"
              type="text"
              v-model="form.cnpj"
              class="form-control"
              placeholder="Digite o CNPJ da clínica"
              autocomplete="off"
              disabled
            />
          </div>

          <div class="form-group col-6">
            <label for="email">E-mail *</label>
            <input
              id="email"
              type="text"
              v-model="form.email"
              class="form-control"
              placeholder="Digite o e-mail da clínica"
              @focus="$v.form.email.$touch"
              autocomplete="off"
              disabled
            />
          </div>

          <div class="form-group col-6">
            <label for="phone">Telefone *</label>

            <TheMask
              id="phone"
              :mask="['(##) ####-####', '(##) #####-####']"
              :masked="false"
              type="text"
              v-model="form.phone"
              class="form-control"
              placeholder="Digite o telefone de contato da clínica"
              autocomplete="off"
              disabled
            />
          </div>

          <div class="form-group col-6">
            <label for="address.cep">CEP *</label>

            <TheMask
              id="address.cep"
              :mask="'#####-###'"
              :masked="true"
              type="text"
              v-model="form.address.cep"
              class="form-control"
              placeholder="Digite o CEP da clínica"
              autocomplete="off"
              disabled
            />
          </div>

          <Select
            id="address.state"
            label="Estado"
            class="col-6"
            v-model="form.address.state"
            :options="[
              { label: 'Selecione o estado', value: '' },
              ...BRAZILIAN_STATES_SELECT_OPTIONS,
            ]"
            required
            disabled
          >
          </Select>

          <div class="form-group col-8">
            <label for="address.street">Logradouro/Rua *</label>
            <input
              id="address.street"
              type="text"
              v-model="form.address.street"
              class="form-control"
              placeholder="Digite o logradouro do endereço da clínica"
              disabled
              autocomplete="off"
            />
          </div>

          <div class="form-group col-4">
            <label for="address.number">Número *</label>
            <input
              id="address.number"
              type="number"
              v-model.number="form.address.number"
              placeholder="Digite o número"
              class="form-control"
              autocomplete="off"
              disabled
            />
          </div>

          <div class="form-group col-6">
            <label for="address.city">Cidade *</label>
            <input
              id="address.city"
              type="text"
              v-model="form.address.city"
              placeholder="Digite a cidade da clínica"
              class="form-control"
              disabled
            />
          </div>

          <div class="form-group col-6">
            <label for="address.district">Bairro *</label>
            <input
              id="address.district"
              type="text"
              v-model="form.address.district"
              placeholder="Digite o bairro da clínica"
              class="form-control"
              autocomplete="off"
              disabled
            />
          </div>

          <div class="form-group col-12">
            <label for="address.complement">Complemento</label>
            <input
              id="address.complement"
              type="text"
              v-model="form.address.complement"
              placeholder="Digite o complemento caso necessário"
              class="form-control"
              disabled
            />
          </div>
        </form>
      </template>

      <template slot="modal-footer">
        <Button
          category="primary"
          class="col-12"
          @click="modals.isClinicDetailsModalVisible = false"
          >Fechar <i class="fas fa-times-circle" />
        </Button>
      </template>
    </Modal>
  </main>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'vue-good-table/dist/vue-good-table.css';
import Vue from 'vue';
import { Button, Modal, LoadingSpinner, Select } from '@/components';
import { TheMask } from 'vue-the-mask';
import { mapActions, mapGetters } from 'vuex';
import { VueGoodTablePaginationOptions } from '@/utils/constants/VueGoodTablePaginationOptions';
import { BRAZILIAN_STATES_SELECT_OPTIONS } from '@/utils/constants/BrazilianStates';
import { minLength, required, email } from 'vuelidate/lib/validators';
import { ActionResponse } from '@/store';
import showToast from '@/services/toast';
import alert from '@/services/alert';
import {
  addressesRequests,
  partnerClinicsRequests,
} from '@/services/api/requests';

export default Vue.extend({
  components: {
    Button,
    Modal,
    LoadingSpinner,
    VueGoodTable: require('vue-good-table').VueGoodTable,
    TheMask,
    Select,
  },

  mounted() {
    this.fetchClinics();

    const inputs = [
      { id: 'cnpj', callback: this.$v!.form!.cnpj!.$touch },
      { id: 'phone', callback: this.$v!.form!.phone!.$touch },
      { id: 'address.cep', callback: this.$v!.form!.address!.cep!.$touch },
    ];

    inputs.forEach((input) =>
      document
        .getElementById(input.id)
        ?.addEventListener('focus', input.callback)
    );
  },

  data: () => ({
    paginationOptions: VueGoodTablePaginationOptions,
    modals: {
      isClinicDetailsModalVisible: false,
      isCreateClinicModalVisible: false,
      currentModal: '' as 'create' | 'edit',
    },

    BRAZILIAN_STATES_SELECT_OPTIONS,

    form: {
      id: '',
      name: '',
      cnpj: '',
      email: '',
      phone: '',
      address: {
        cep: '',
        street: '',
        number: undefined as unknown as number,
        district: '',
        city: '',
        state: '',
        complement: '',
      },
    },
  }),

  computed: {
    ...mapGetters({
      clinics: 'clinics/getClinics',
      isLoading: 'clinics/getIsLoading',
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
      fetchClinics: 'clinics/fetchClinics',
      addClinic: 'clinics/addClinic',
      deleteClinic: 'clinics/deleteClinic',
      updateClinic: 'clinics/updateClinic',
    }),

    openCreateClinicModal() {
      this.$v.$reset();
      this.form = {
        id: '',
        name: '',
        cnpj: '',
        email: '',
        phone: '',
        address: {
          cep: '',
          street: '',
          number: undefined as unknown as number,
          district: '',
          city: '',
          state: '',
          complement: '',
        },
      };

      this.modals.currentModal = 'create';
      this.modals.isCreateClinicModalVisible = true;
    },

    closeCreateClinicModal() {
      this.modals.isCreateClinicModalVisible = false;
    },

    async openEditModal(clinicId: string) {
      const clinic = await this.getClinic(clinicId);

      if (!clinic) {
        alert
          .error('Essa clínica não existe mais em nossos registros')
          .then(this.fetchClinics);
        return;
      }

      this.form = {
        ...clinic,
      };

      this.modals.currentModal = 'edit';
      this.modals.isCreateClinicModalVisible = true;
    },

    async openDetailsModal(clinicId: string) {
      const clinic = await this.getClinic(clinicId);

      if (!clinic) {
        alert
          .error('Essa clínica não existe mais em nossos registros')
          .then(this.fetchClinics);
        return;
      }

      this.form = {
        ...clinic,
      };

      this.modals.isClinicDetailsModalVisible = true;
    },

    async getClinic(clinicId: string) {
      const { data } = await partnerClinicsRequests.getById(clinicId);

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
      const response: ActionResponse = await this.updateClinic(this.form);

      if (response.status === 200) {
        this.fetchClinics();
        this.modals.isCreateClinicModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async submitCreateForm() {
      const response: ActionResponse = await this.addClinic(this.form);

      if (response.status === 201) {
        this.fetchClinics();
        this.modals.isCreateClinicModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async confirmClinicDelete(clinicId: string) {
      const { answer } = await alert.question({
        text: 'Essa operação não poderá ser desfeita',
      });

      if (answer === 'yes') {
        const deleteResponse: ActionResponse = await this.deleteClinic(
          clinicId
        );

        const isSuccessResponse = deleteResponse.status === 200;

        if (isSuccessResponse) {
          this.fetchClinics();
        }

        showToast({
          icon: isSuccessResponse ? 'success' : 'error',
          text: isSuccessResponse
            ? 'Clínica excluída com sucesso'
            : deleteResponse.message,
        });
      } else {
        showToast({ icon: 'info', text: 'A clínica não foi excluído' });
      }
    },

    async fetchAddressDataByCep() {
      const address = await addressesRequests.fetchAddress(
        this.form.address.cep
      );

      if (!address) {
        return showToast({
          icon: 'error',
          text: 'Não conseguimos obter os outros dados do seu endereço com esse CEP',
        });
      }

      this.form.address.street = address.street;
      this.form.address.city = address.city;
      this.form.address.district = address.district;
      this.form.address.state = address.state;
      this.form.address.complement = address.complement;
    },
  },

  watch: {
    'form.address.cep'(newValue: string) {
      if (newValue.length === 9) {
        this.fetchAddressDataByCep();
      }
    },
  },

  validations: {
    form: {
      name: { required, minLength: minLength(4) },
      cnpj: { required, minLength: minLength(14) },
      email: { required, isValidEmail: email },
      phone: { required, minLength: minLength(10) },

      address: {
        cep: { required, minLength: minLength(9) },
        street: { required },
        number: { required },
        district: { required },
        state: { required },
        city: { required },
      },
    },
  },
});
</script>

<style>
label {
  font-weight: 600;
}
</style>

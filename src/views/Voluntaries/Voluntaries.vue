<template>
  <main class="voluntaries view">
    <div class="view-header">
      <h1>Voluntários</h1>

      <p>
        Este é o módulo de
        <span class="text-primary text-bold">Voluntários</span>, onde você pode
        gerenciar todos os voluntários da ONG;
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
        Cadastrar voluntário
      </Button>

      <VueGoodTable
        class="mt-3 w-100"
        :rows="voluntaries"
        :columns="[
          {
            label: 'Nome',
            field: 'name',
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
          Nenhum voluntário encontrada
        </p>

        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field === 'phone'">
            <span>{{ props.row.phone | phone }}</span>
          </div>
          <div
            v-else-if="props.column.field === 'actions'"
            class="media-body text-rigth d-flex justify-content-center"
          >
            <a
              target="_blank"
              :href="`https://api.whatsapp.com/send?phone=+55${
                props.row.phone
              }&text=Ol%C3%A1%20${getFirstName(props.row.name)}!`"
              class="btn btn-whatsapp mr-1"
              title="Entrar em contato com voluntário"
            >
              <i class="fab fa-whatsapp"></i>
            </a>

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
              @click="confirmVoluntaryDelete(props.row.id)"
            >
              <i class="fas fa-trash-alt ml-1"></i>
            </Button>
          </div>
        </template>
      </VueGoodTable>
    </div>

    <!-- Modal de cadastro e edição -->
    <Modal size="lg" :isVisible="modals.isCreateVoluntaryModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          {{ currentModalLabel }} voluntário
          <i class="fas fa-people-carry"></i>
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
              placeholder="Digite o nome"
              @focus="$v.form.name.$touch"
              autocomplete="off"
            />

            <div
              v-if="$v.form.name.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.name.required"> Nome é obrigatório </span>
              <span v-if="!$v.form.name.minLength">
                Nome deve ter pelo menos 6 caracteres
              </span>
            </div>
          </div>

          <div class="form-group col-6">
            <label for="cpf">CPF *</label>

            <TheMask
              id="cpf"
              :mask="'###.###.###-##'"
              :masked="false"
              type="text"
              v-model="form.cpf"
              class="form-control"
              placeholder="Digite o CPF"
              autocomplete="off"
            />

            <div
              v-if="$v.form.cpf.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.cpf.required"> CPF é obrigatório </span>
              <span v-if="!$v.form.cpf.minLength">
                CPF deve conter 11 caracteres
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
              placeholder="Digite o telefone"
              autocomplete="off"
            />

            <div
              v-if="$v.form.phone.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.phone.required">
                Telefone é obrigatório
              </span>
              <span v-if="!$v.form.phone.minLength">
                Telefone deve conter pelo menos 10 caracteres
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
              placeholder="Digite o e-mail"
              @focus="$v.form.email.$touch"
              autocomplete="off"
            />

            <div
              v-if="$v.form.email.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.email.required"> E-mail é obrigatório </span>
              <span v-if="!$v.form.email.isValidEmail">
                O e-mail inserido está inválido
              </span>
            </div>
          </div>

          <div class="col-12 mb-3">
            <label>Serviços realizados pelo voluntário</label>
            <Multiselect
              v-model="form.services"
              :options="SERVICES_OPTIONS"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Escolha os serviços"
              label="title"
              track-by="title"
              style="border: 1px solid #ced4da; border-radius: 0.25rem"
              @open="$v.form.services.$touch"
              selectLabel="Clique para selecionar"
              deselectLabel="Clique para remover"
              selectedLabel="Serviço selecionado"
            />

            <div
              v-if="$v.form.services.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.services.required">
                O voluntário deve ser vinculado a pelo menos um serviço
              </span>
            </div>
          </div>

          <div class="form-group col-6">
            <label for="address.cep">CEP*</label>

            <TheMask
              id="address.cep"
              :mask="'#####-###'"
              :masked="true"
              type="text"
              v-model="form.address.cep"
              class="form-control"
              placeholder="Digite o CEP do voluntário"
              autocomplete="off"
            />

            <div
              v-if="$v.form.address.cep.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.address.cep.required">
                CEP do voluntário é obrigatório
              </span>
              <span v-if="!$v.form.address.cep.minLength">
                CEP do voluntário deve conter 8 caracteres
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
                >Estado é obrigatório</span
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
              placeholder="Digite o logradouro do endereço"
              @focus="$v.form.address.street.$touch"
              autocomplete="off"
            />

            <div
              v-if="$v.form.address.street.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.address.street.required">
                Logradouro é obrigatório
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
                Número é obrigatório
              </span>
            </div>
          </div>

          <div class="form-group col-6">
            <label for="address.city">Cidade *</label>
            <input
              id="address.city"
              type="text"
              v-model="form.address.city"
              placeholder="Digite a cidade"
              class="form-control"
              @focus="$v.form.address.city.$touch"
            />

            <div
              v-if="$v.form.address.city.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.address.city.required">
                Cidade é obrigatória
              </span>
            </div>
          </div>

          <div class="form-group col-6">
            <label for="address.district">Bairro *</label>
            <input
              id="address.district"
              type="text"
              v-model="form.address.district"
              placeholder="Digite o bairro"
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
                Bairro é obrigatório
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
    <Modal size="lg" :isVisible="modals.isVoluntaryDetailsModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          Visualizar voluntário
          <i class="fas fa-people-carry"></i>
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
              placeholder="Digite o nome"
              disabled
            />
          </div>

          <div class="form-group col-6">
            <label for="cpf">CPF *</label>

            <TheMask
              id="cpf"
              :mask="'###.###.###-##'"
              :masked="false"
              type="text"
              v-model="form.cpf"
              class="form-control"
              placeholder="Digite o CPF"
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
              placeholder="Digite o telefone"
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
              placeholder="Digite o e-mail"
              disabled
            />
          </div>

          <div class="col-12 mb-3">
            <label>Serviços realizados pelo voluntário</label>
            <Multiselect
              v-model="form.services"
              :options="SERVICES_OPTIONS"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Escolha os serviços"
              label="title"
              track-by="title"
              style="border: 1px solid #ced4da; border-radius: 0.25rem"
              @open="$v.form.services.$touch"
              selectLabel="Clique para selecionar"
              deselectLabel="Clique para remover"
              selectedLabel="Serviço selecionado"
              disabled
            />
          </div>

          <div class="form-group col-6">
            <label for="address.cep">CEP*</label>

            <TheMask
              id="address.cep"
              :mask="'#####-###'"
              :masked="true"
              type="text"
              v-model="form.address.cep"
              class="form-control"
              placeholder="Digite o CEP do voluntário"
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
              placeholder="Digite o logradouro do endereço"
              disabled
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
              disabled
            />
          </div>

          <div class="form-group col-6">
            <label for="address.city">Cidade *</label>
            <input
              id="address.city"
              type="text"
              v-model="form.address.city"
              placeholder="Digite a cidade"
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
              placeholder="Digite o bairro"
              class="form-control"
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
          @click="modals.isVoluntaryDetailsModalVisible = false"
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
import Multiselect from 'vue-multiselect';
import { mapActions, mapGetters } from 'vuex';
import { VueGoodTablePaginationOptions } from '@/utils/constants/VueGoodTablePaginationOptions';
import { email, minLength, required } from 'vuelidate/lib/validators';
import { ActionResponse } from '@/store';
import showToast from '@/services/toast';
import alert from '@/services/alert';
import {
  addressesRequests,
  voluntariesRequests,
} from '@/services/api/requests';
import { BRAZILIAN_STATES_SELECT_OPTIONS } from '@/utils/constants/BrazilianStates';
import { TheMask } from 'vue-the-mask';
import { Service } from '@/@types/Services';
import { APIVoluntary } from '@/@types/Voluntaries';

export default Vue.extend({
  components: {
    Button,
    Modal,
    LoadingSpinner,
    VueGoodTable: require('vue-good-table').VueGoodTable,
    TheMask,
    Select,
    Multiselect,
  },

  mounted() {
    this.fetchVoluntaries();

    const inputs = [
      { id: 'cpf', callback: this.$v!.form!.cpf!.$touch },
      { id: 'phone', callback: this.$v!.form!.phone!.$touch },
      {
        id: 'address.cep',
        callback: this.$v!.form!.address!.cep!.$touch,
      },
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
      isVoluntaryDetailsModalVisible: false,
      isCreateVoluntaryModalVisible: false,
      currentModal: '' as 'create' | 'edit',
    },

    BRAZILIAN_STATES_SELECT_OPTIONS,

    form: {
      id: '',
      name: '',
      cpf: '',
      phone: '',
      email: '',
      services: [] as Service[],
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
      voluntaries: 'voluntaries/getVoluntaries',
      isLoading: 'voluntaries/getIsLoading',
    }),

    currentModalLabel(): 'Cadastrar' | 'Editar' {
      const modalLabels = {
        create: 'Cadastrar',
        edit: 'Editar',
      } as const;

      return modalLabels[this.modals.currentModal];
    },

    SERVICES_OPTIONS(): Service[] {
      return [
        {
          id: '109a3495-f8be-4317-9357-f4f5aefa97ab',
          title: 'Passear com os cães',
          description:
            'Passear com os cães as segundas, quartas e sexta-feiras',
        },
        {
          id: '21c4dd16-5ee8-4d29-a4d8-a1cb708166fc',
          title: 'Soltar os cães',
          description: 'Soltar os cães no parquinho',
        },
        {
          id: '07a25ac0-00d7-4751-a43c-66e65322e55b',
          title: 'Passear com os gatos',
          description:
            'Passear com os gatos as segundas, quartas e sexta-feiras',
        },
        {
          id: 'f35f0c49-ed79-48ce-ae1b-e3d72543edd6',
          title: 'Alimentar os cães',
          description: 'Alimentar os cães as manhãs e fim da tarde',
        },
        {
          id: 'f9275fd9-62f7-4578-be2e-00df3e12df3a',
          title: 'Alimentar os gatos',
          description: 'Alimentar os gatos as manhãs e fim da tarde',
        },
        {
          id: '66ab636a-cce2-489f-a295-330873e36a74',
          title: 'Comprar medicamentos',
          description:
            'Sair para comprar os medicamentos necessários para os animais que precisam',
        },
        {
          id: '47e5c5fa-d5e7-4112-b1fb-01ec0920db44',
          title: 'Brincar com os cães',
          description: 'Sair para o parquinho para brincar com os cães',
        },
      ];
    },
  },

  methods: {
    ...mapActions({
      fetchVoluntaries: 'voluntaries/fetchVoluntaries',
      addVoluntary: 'voluntaries/addVoluntary',
      deleteVoluntary: 'voluntaries/deleteVoluntary',
      updateVoluntary: 'voluntaries/updateVoluntary',
    }),

    openCreateModal() {
      this.$v.$reset();
      this.form = {
        id: '',
        name: '',
        cpf: '',
        phone: '',
        email: '',
        services: [],
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
      this.modals.isCreateVoluntaryModalVisible = true;
    },

    closeCreateModal() {
      this.modals.isCreateVoluntaryModalVisible = false;
    },

    async openEditModal(voluntaryId: string) {
      // const clinic = await this.getVoluntary(voluntaryId);

      const voluntary: APIVoluntary = {
        id: '78759cba-4c30-4c44-9e0d-dad0fe883caf',
        name: 'Gabrielly Maitê Helena',
        cpf: '03159971414',
        phone: '95988385230',
        email: 'gabriellymaitehelenalopes@negleribeiro.com',
        services: [
          this.SERVICES_OPTIONS[0],
          this.SERVICES_OPTIONS[1],
          this.SERVICES_OPTIONS[2],
        ],
        address: {
          cep: '13802-456',
          street: 'Rua Amélia de Camargo Azevedo',
          number: 189,
          complement: '',
          district: 'Loteamento Linda Chaib',
          city: 'Mogi Mirim',
          state: 'SP',
        },
      };

      if (!voluntary) {
        alert
          .error('Esse voluntário não existe mais em nossos registros')
          .then(this.fetchVoluntaries);
        return;
      }

      this.form = {
        ...voluntary,
      };

      this.modals.currentModal = 'edit';
      this.modals.isCreateVoluntaryModalVisible = true;
    },

    async openDetailsModal(voluntaryId: string) {
      // const clinic = await this.getVoluntary(voluntaryId);

      const voluntary: APIVoluntary = {
        id: '78759cba-4c30-4c44-9e0d-dad0fe883caf',
        name: 'Gabrielly Maitê Helena',
        cpf: '03159971414',
        phone: '95988385230',
        email: 'gabriellymaitehelenalopes@negleribeiro.com',
        services: [
          this.SERVICES_OPTIONS[0],
          this.SERVICES_OPTIONS[1],
          this.SERVICES_OPTIONS[2],
        ],
        address: {
          cep: '13802-456',
          street: 'Rua Amélia de Camargo Azevedo',
          number: 189,
          complement: '',
          district: 'Loteamento Linda Chaib',
          city: 'Mogi Mirim',
          state: 'SP',
        },
      };

      if (!voluntary) {
        alert
          .error('Esse voluntário não existe mais em nossos registros')
          .then(this.fetchVoluntaries);
        return;
      }

      this.form = {
        ...voluntary,
      };

      this.modals.isVoluntaryDetailsModalVisible = true;
    },

    async getVoluntary(voluntaryId: string) {
      const { data } = await voluntariesRequests.getById(voluntaryId);

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
      const response: ActionResponse = await this.addVoluntary(this.form);

      if (response.status === 201) {
        this.fetchVoluntaries();
        this.modals.isCreateVoluntaryModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async submitEditForm() {
      const response: ActionResponse = await this.updateVoluntary(this.form);

      if (response.status === 200) {
        this.fetchVoluntaries();
        this.modals.isCreateVoluntaryModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async confirmVoluntaryDelete(voluntaryId: string) {
      const { answer } = await alert.question({
        text: 'Essa operação não poderá ser desfeita',
      });

      if (answer === 'yes') {
        const deleteResponse: ActionResponse = await this.deleteVoluntary(
          voluntaryId
        );

        const isSuccessResponse = deleteResponse.status === 200;

        if (isSuccessResponse) {
          this.fetchVoluntaries();
        }

        showToast({
          icon: isSuccessResponse ? 'success' : 'error',
          text: isSuccessResponse
            ? 'Voluntário excluído com sucesso'
            : deleteResponse.message,
        });
      } else {
        showToast({ icon: 'info', text: 'O voluntário não foi excluído' });
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

    getFirstName(fullName: string) {
      return fullName.split(' ')[0];
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
      name: { required, minLength: minLength(6) },
      phone: { required, minLength: minLength(10) },
      cpf: { required, minLength: minLength(11) },
      email: { required, isValidEmail: email },
      services: { required, minLength: minLength(1) },
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
label {
  font-weight: 600;
}
</style>

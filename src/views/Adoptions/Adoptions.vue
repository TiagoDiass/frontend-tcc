<template>
  <main class="adoptions view">
    <div class="view-header">
      <h1>Adoções</h1>

      <p>
        Este é o módulo de
        <span class="text-primary text-bold">Adoções</span>, onde você pode
        gerenciar as adoções realizadas pela ONG.
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
        Cadastrar adoção
      </Button>

      <VueGoodTable
        class="mt-3 w-100"
        :rows="adoptions"
        :columns="[
          {
            label: 'Nome do adotante',
            field: 'adopter.name',
          },
          {
            label: 'Telefone do adotante',
            field: 'adopter.phone',
          },
          {
            label: 'Nome do animal',
            field: 'animal.name',
          },
          {
            label: 'Tipo do animal',
            field: 'animal.type',
          },
          {
            label: 'Ações',
            field: 'actions',
          },
        ]"
        :pagination-options="paginationOptions"
      >
        <p slot="emptystate" class="text-center m-0">
          Nenhuma adoção encontrada
        </p>

        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field === 'adopter.phone'">
            <span>{{ props.row.adopter.phone | phone }}</span>
          </div>
          <div
            v-else-if="props.column.field === 'actions'"
            class="media-body text-rigth d-flex justify-content-center"
          >
            <a
              target="_blank"
              :href="`https://api.whatsapp.com/send?phone=+55${
                props.row.adopter.phone
              }&text=Ol%C3%A1%20${getFirstName(props.row.adopter.name)}!`"
              class="btn btn-whatsapp mr-1"
              title="Entrar em contato com adotante"
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
              @click="confirmAdoptionDelete(props.row.id)"
            >
              <i class="fas fa-trash-alt ml-1"></i>
            </Button>
          </div>
        </template>
      </VueGoodTable>
    </div>

    <!-- Modal de cadastro e edição -->
    <Modal size="lg" :isVisible="modals.isCreateAdoptionModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          {{ currentModalLabel }} adoção
          <i class="fas fa-paw"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <form class="row" @submit="submitForm">
          <div class="form-group col-6">
            <label for="adopter.name">Nome do adotante *</label>
            <input
              id="adopter.name"
              type="text"
              v-model="form.adopter.name"
              class="form-control"
              placeholder="Digite o nome do adotante"
              @focus="$v.form.adopter.name.$touch"
              autocomplete="off"
            />

            <div
              v-if="$v.form.adopter.name.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.adopter.name.required">
                Nome do adotante é obrigatório
              </span>
              <span v-if="!$v.form.adopter.name.minLength">
                Nome do adotante deve ter pelo menos 6 caracteres
              </span>
            </div>
          </div>

          <div class="form-group col-6">
            <label for="phone">Telefone do adotante *</label>

            <TheMask
              id="phone"
              :mask="['(##) ####-####', '(##) #####-####']"
              :masked="false"
              type="text"
              v-model="form.adopter.phone"
              class="form-control"
              placeholder="Digite o telefone do adotante"
              autocomplete="off"
            />

            <div
              v-if="$v.form.adopter.phone.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.adopter.phone.required">
                Telefone do adotante é obrigatório
              </span>
              <span v-if="!$v.form.adopter.phone.minLength">
                Telefone do adotante deve conter pelo menos 10 caracteres
              </span>
            </div>
          </div>

          <Select
            id="address.state"
            label="Animal adotado"
            class="col-6"
            v-model="form.animalId"
            :options="[
              { label: 'Selecione um animal', value: '' },
              ...ANIMALS_OPTIONS,
            ]"
            required
            :error="$v.form.animalId.$error"
            @focus="$v.form.animalId.$touch"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.animalId.required"
                >Animal adotado é obrigatório</span
              >
            </template>
          </Select>

          <div class="col-6 d-flex flex-column align-items-center mb-4">
            <template v-if="form.animalPictureUrl">
              <label>Foto preview</label>
              <img
                style="max-width: 160px"
                :src="form.animalPictureUrl"
                alt="Imagem do animal"
              />
            </template>
          </div>

          <div class="form-group col-6">
            <label for="address.cep">CEP do adotante*</label>

            <TheMask
              id="address.cep"
              :mask="'#####-###'"
              :masked="true"
              type="text"
              v-model="form.adopter.address.cep"
              class="form-control"
              placeholder="Digite o CEP do adotante"
              autocomplete="off"
            />

            <div
              v-if="$v.form.adopter.address.cep.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.adopter.address.cep.required">
                CEP do adotante é obrigatório
              </span>
              <span v-if="!$v.form.adopter.address.cep.minLength">
                CEP do adotante deve conter 8 caracteres
              </span>
            </div>
          </div>

          <Select
            id="address.state"
            label="Estado do adotante"
            class="col-6"
            v-model="form.adopter.address.state"
            :options="[
              { label: 'Selecione o estado', value: '' },
              ...BRAZILIAN_STATES_SELECT_OPTIONS,
            ]"
            required
            :error="$v.form.adopter.address.state.$error"
            @focus="$v.form.adopter.address.state.$touch"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.adopter.address.state.required"
                >Estado do adotante é obrigatório</span
              >
            </template>
          </Select>

          <div class="form-group col-8">
            <label for="address.street">Logradouro/Rua *</label>
            <input
              id="address.street"
              type="text"
              v-model="form.adopter.address.street"
              class="form-control"
              placeholder="Digite o logradouro do endereço do adotante"
              @focus="$v.form.adopter.address.street.$touch"
              autocomplete="off"
            />

            <div
              v-if="$v.form.adopter.address.street.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.adopter.address.street.required">
                Logradouro do adotante é obrigatório
              </span>
            </div>
          </div>

          <div class="form-group col-4">
            <label for="address.number">Número *</label>
            <input
              id="address.number"
              type="number"
              v-model.number="form.adopter.address.number"
              placeholder="Digite o número"
              class="form-control"
              @focus="$v.form.adopter.address.number.$touch"
              autocomplete="off"
            />

            <div
              v-if="$v.form.adopter.address.number.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.adopter.address.number.required">
                Número do adotante é obrigatório
              </span>
            </div>
          </div>

          <div class="form-group col-6">
            <label for="address.city">Cidade *</label>
            <input
              id="address.city"
              type="text"
              v-model="form.adopter.address.city"
              placeholder="Digite a cidade do adotante"
              class="form-control"
              @focus="$v.form.adopter.address.city.$touch"
            />

            <div
              v-if="$v.form.adopter.address.city.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.adopter.address.city.required">
                Cidade do adotante é obrigatória
              </span>
            </div>
          </div>

          <div class="form-group col-6">
            <label for="address.district">Bairro *</label>
            <input
              id="address.district"
              type="text"
              v-model="form.adopter.address.district"
              placeholder="Digite o bairro do adotante"
              class="form-control"
              @focus="$v.form.adopter.address.district.$touch"
              autocomplete="off"
            />

            <div
              v-if="$v.form.adopter.address.district.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.adopter.address.district.required">
                Bairro do adotante é obrigatória
              </span>
            </div>
          </div>

          <div class="form-group col-12">
            <label for="address.complement">Complemento</label>
            <input
              id="address.complement"
              type="text"
              v-model="form.adopter.address.complement"
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
    <Modal size="lg" :isVisible="modals.isAdoptionDetailsModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          Visualizar adoção
          <i class="fas fa-paw"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <form class="row">
          <div class="form-group col-6">
            <label for="adopter.name">Nome do adotante *</label>
            <input
              id="adopter.name"
              type="text"
              v-model="form.adopter.name"
              class="form-control"
              placeholder="Digite o nome do adotante"
              disabled
            />
          </div>

          <div class="form-group col-6">
            <label for="phone">Telefone do adotante *</label>

            <TheMask
              id="phone"
              :mask="['(##) ####-####', '(##) #####-####']"
              :masked="false"
              type="text"
              v-model="form.adopter.phone"
              class="form-control"
              placeholder="Digite o telefone do adotante"
              disabled
            />
          </div>

          <Select
            id="address.state"
            label="Animal adotado"
            class="col-6"
            v-model="form.animalId"
            :options="[
              { label: 'Selecione um animal', value: '' },
              ...ANIMALS_OPTIONS,
            ]"
            required
            disabled
          >
          </Select>

          <div class="col-6 d-flex flex-column align-items-center mb-4">
            <template v-if="form.animalPictureUrl">
              <label>Foto preview</label>
              <img
                style="max-width: 160px"
                :src="form.animalPictureUrl"
                alt="Imagem do animal"
              />
            </template>
          </div>

          <div class="form-group col-6">
            <label for="address.cep">CEP do adotante*</label>

            <TheMask
              id="address.cep"
              :mask="'#####-###'"
              :masked="true"
              type="text"
              v-model="form.adopter.address.cep"
              class="form-control"
              placeholder="Digite o CEP do adotante"
              disabled
            />
          </div>

          <Select
            id="address.state"
            label="Estado do adotante"
            class="col-6"
            v-model="form.adopter.address.state"
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
              v-model="form.adopter.address.street"
              class="form-control"
              placeholder="Digite o logradouro do endereço do adotante"
              disabled
            />
          </div>

          <div class="form-group col-4">
            <label for="address.number">Número *</label>
            <input
              id="address.number"
              type="number"
              v-model.number="form.adopter.address.number"
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
              v-model="form.adopter.address.city"
              placeholder="Digite a cidade do adotante"
              class="form-control"
              disabled
            />
          </div>

          <div class="form-group col-6">
            <label for="address.district">Bairro *</label>
            <input
              id="address.district"
              type="text"
              v-model="form.adopter.address.district"
              placeholder="Digite o bairro do adotante"
              class="form-control"
              disabled
            />
          </div>

          <div class="form-group col-12">
            <label for="address.complement">Complemento</label>
            <input
              id="address.complement"
              type="text"
              v-model="form.adopter.address.complement"
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
          @click="modals.isAdoptionDetailsModalVisible = false"
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
import { mapActions, mapGetters } from 'vuex';
import { VueGoodTablePaginationOptions } from '@/utils/constants/VueGoodTablePaginationOptions';
import { minLength, required } from 'vuelidate/lib/validators';
import { ActionResponse } from '@/store';
import showToast from '@/services/toast';
import alert from '@/services/alert';
import {
  addressesRequests,
  adoptionsRequests,
  animalsRequests,
} from '@/services/api/requests';
import { BRAZILIAN_STATES_SELECT_OPTIONS } from '@/utils/constants/BrazilianStates';
import { TheMask } from 'vue-the-mask';

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
    this.fetchAdoptions();

    const inputs = [
      { id: 'phone', callback: this.$v!.form!.adopter!.phone!.$touch },
      {
        id: 'address.cep',
        callback: this.$v!.form!.adopter!.address!.cep!.$touch,
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
      isAdoptionDetailsModalVisible: false,
      isCreateAdoptionModalVisible: false,
      currentModal: '' as 'create' | 'edit',
    },

    BRAZILIAN_STATES_SELECT_OPTIONS,

    form: {
      id: '',
      adopter: {
        name: '',
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
      animalId: '',
      animalPictureUrl: '',
    },
  }),

  computed: {
    ...mapGetters({
      adoptions: 'adoptions/getAdoptions',
      isLoading: 'adoptions/getIsLoading',
    }),

    currentModalLabel(): 'Cadastrar' | 'Editar' {
      const modalLabels = {
        create: 'Cadastrar',
        edit: 'Editar',
      } as const;

      return modalLabels[this.modals.currentModal];
    },

    ANIMALS_OPTIONS() {
      return [
        { label: 'dudu', value: '1cafbb52-c964-4e24-af09-46cc988a93b8' },
        { label: 'twister', value: '8880a8d5-c158-47e6-a3a8-2f0f6ed827f3' },
        { label: 'Beethoven', value: '1a1f9f8f-dc57-4714-9706-956b3a25bc17' },
        { label: 'Garfield', value: '53027579-2391-4110-ac19-c316e53f7fa0' },
        { label: 'Mew', value: 'dfdd8659-fe70-4964-951e-74dc458ef0ba' },
        { label: 'totó', value: 'aa0fb7c3-34f1-4d00-a9c3-1e0f272628f1' },
        { label: 'Barney', value: 'cbec04ed-bc74-4501-812f-6cb8934720f3' },
        { label: 'theo', value: '450261bf-eddb-4167-a273-1621260e636b' },
      ];
    },
  },

  methods: {
    ...mapActions({
      fetchAdoptions: 'adoptions/fetchAdoptions',
      addAdoption: 'adoptions/addAdoption',
      deleteAdoption: 'adoptions/deleteAdoption',
      updateAdoption: 'adoptions/updateAdoption',
    }),

    openCreateModal() {
      this.$v.$reset();
      this.form = {
        id: '',
        adopter: {
          name: '',
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
        animalId: '',
        animalPictureUrl: '',
      };

      this.modals.currentModal = 'create';
      this.modals.isCreateAdoptionModalVisible = true;
    },

    closeCreateModal() {
      this.modals.isCreateAdoptionModalVisible = false;
    },

    async openEditModal(adoptionId: string) {
      // const adoption = await this.getAdoption(adoptionId);

      const adoption = {
        id: 'c12bf715-571a-43b6-a9d9-119ce4804b67',
        animal: {
          id: '1a1f9f8f-dc57-4714-9706-956b3a25bc17',
          name: 'Beethoven',
          type: 'dog',
          size: 'G',
          gender: 'M',
          pictureUrl:
            'http://4.bp.blogspot.com/-OrftBQM3zzY/UNhRHXoeirI/AAAAAAAAACk/8_Cqm1vQqcQ/s1600/beethoven.jpg',
        },
        adopter: {
          name: 'José Lima',
          phone: '3580808080',
          address: {
            cep: '13802-456',
            street: 'Rua Amélia de Camargo Azevedo',
            number: 189,
            complement: '',
            district: 'Loteamento Linda Chaib',
            city: 'Mogi Mirim',
            state: 'SP',
          },
        },
      };

      if (!adoption) {
        alert
          .error('Essa adoção não existe mais em nossos registros')
          .then(this.fetchAdoptions);
        return;
      }

      this.form = {
        ...adoption,
        animalId: adoption.animal.id,
        animalPictureUrl: adoption.animal.pictureUrl,
      };

      this.modals.currentModal = 'edit';
      this.modals.isCreateAdoptionModalVisible = true;
    },

    async openDetailsModal(adoptionId: string) {
      // const adoption = await this.getAdoption(adoptionId);

      const adoption = {
        id: 'c12bf715-571a-43b6-a9d9-119ce4804b67',
        animal: {
          id: '1a1f9f8f-dc57-4714-9706-956b3a25bc17',
          name: 'Beethoven',
          type: 'dog',
          size: 'G',
          gender: 'M',
          pictureUrl:
            'http://4.bp.blogspot.com/-OrftBQM3zzY/UNhRHXoeirI/AAAAAAAAACk/8_Cqm1vQqcQ/s1600/beethoven.jpg',
        },
        adopter: {
          name: 'José Lima',
          phone: '3580808080',
          address: {
            cep: '13802-456',
            street: 'Rua Amélia de Camargo Azevedo',
            number: 189,
            complement: '',
            district: 'Loteamento Linda Chaib',
            city: 'Mogi Mirim',
            state: 'SP',
          },
        },
      };

      if (!adoption) {
        alert
          .error('Essa adoção não existe mais em nossos registros')
          .then(this.fetchAdoptions);
        return;
      }

      this.form = {
        ...adoption,
        animalId: adoption.animal.id,
        animalPictureUrl: adoption.animal.pictureUrl,
      };

      this.modals.isAdoptionDetailsModalVisible = true;
    },

    async getAdoption(adoptionId: string) {
      const { data } = await adoptionsRequests.getById(adoptionId);

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
      const response: ActionResponse = await this.addAdoption(this.form);

      if (response.status === 201) {
        this.fetchAdoptions();
        this.modals.isCreateAdoptionModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async submitEditForm() {
      const response: ActionResponse = await this.updateAdoption(this.form);

      if (response.status === 200) {
        this.fetchAdoptions();
        this.modals.isCreateAdoptionModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async confirmAdoptionDelete(adoptionId: string) {
      const { answer } = await alert.question({
        text: 'Essa operação não poderá ser desfeita',
      });

      if (answer === 'yes') {
        const deleteResponse: ActionResponse = await this.deleteAdoption(
          adoptionId
        );

        const isSuccessResponse = deleteResponse.status === 200;

        if (isSuccessResponse) {
          this.fetchAdoptions();
        }

        showToast({
          icon: isSuccessResponse ? 'success' : 'error',
          text: isSuccessResponse
            ? 'Adoção excluída com sucesso'
            : deleteResponse.message,
        });
      } else {
        showToast({ icon: 'info', text: 'A adoção não foi excluída' });
      }
    },

    async fetchAddressDataByCep() {
      const address = await addressesRequests.fetchAddress(
        this.form.adopter.address.cep
      );

      if (!address) {
        return showToast({
          icon: 'error',
          text: 'Não conseguimos obter os outros dados do seu endereço com esse CEP',
        });
      }

      this.form.adopter.address.street = address.street;
      this.form.adopter.address.city = address.city;
      this.form.adopter.address.district = address.district;
      this.form.adopter.address.state = address.state;
      this.form.adopter.address.complement = address.complement;
    },

    getFirstName(fullName: string) {
      return fullName.split(' ')[0];
    },
  },

  watch: {
    'form.adopter.address.cep'(newValue: string) {
      if (newValue.length === 9) {
        this.fetchAddressDataByCep();
      }
    },

    async 'form.animalId'(newValue: string) {
      const { data } = await animalsRequests.getById(newValue);
      const animal = data.data;

      if (!animal) {
        alert
          .error('Ops, parece que este animal não existe mais')
          .then(() => (this.modals.isCreateAdoptionModalVisible = false));
      } else {
        this.form.animalPictureUrl = animal.pictureUrl;
      }
    },
  },

  validations: {
    form: {
      adopter: {
        name: { required, minLength: minLength(6) },
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
      animalId: { required },
    },
  },
});
</script>

<style>
label {
  font-weight: 600;
}
</style>

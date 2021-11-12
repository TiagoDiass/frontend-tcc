<template>
  <main class="transactions view">
    <div class="view-header">
      <h1>Transações</h1>

      <p>
        Este é o módulo de
        <span class="text-primary text-bold">Transações</span>, onde você poderá
        gerenciar todas as transações realizadas pela ONG
      </p>
    </div>

    <div>
      <header class="totalizers-wrapper">
        <div class="totalizer normal">
          <p class="label">Entradas 🟢</p>

          <span class="value">+ {{ formattedBalance.entries }}</span>
        </div>

        <div class="totalizer normal">
          <p class="label">Saídas 🔴</p>

          <span class="value">- {{ formattedBalance.withdraws }}</span>
        </div>

        <div
          class="totalizer current-balance"
          :class="[
            { 'positive-score': balance.total > 0 },
            { 'negative-score': balance.total < 0 },
          ]"
        >
          <p class="label">Total 💸</p>

          <span class="value">
            {{ balance.total > 0 ? '+' : '-' }}
            {{ formattedBalance.total }}
          </span>
        </div>
      </header>

      <hr />

      <Button
        category="primary"
        class="w-100 mt-2"
        @click="openCreateTransactionModal"
      >
        Cadastrar Transação
      </Button>

      <VueGoodTable
        class="mt-3 w-100"
        :rows="transactions"
        :columns="[
          {
            label: 'Título',
            field: 'title',
          },
          {
            label: 'Tipo',
            field: 'type',
          },
          {
            label: 'Valor',
            field: 'value',
          },
          {
            label: 'Data',
            field: 'date',
          },
          {
            label: 'Ações',
            field: 'actions',
          },
        ]"
        :pagination-options="paginationOptions"
      >
        <p slot="emptystate" class="text-center m-0">
          Nenhum produto encontrado
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
              @click="confirmTransactionDelete(props.row.id)"
            >
              <i class="fas fa-trash-alt ml-1"></i>
            </Button>
          </div>
        </template>
      </VueGoodTable>
    </div>

    <!-- Modal de cadastro e edição -->
    <Modal size="md" :isVisible="modals.isCreateTransactionModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          {{ currentModalLabel }} transação
          <i class="fas fa-money-check-alt"></i>
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
              placeholder="Digite o título da transação"
              @focus="$v.form.title.$touch"
            />

            <div
              v-if="$v.form.title.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.title.required"
                >Título da transação é obrigatório</span
              >
              <span v-if="!$v.form.title.minLength"
                >Título da transação deve ter pelo menos 5 caracteres</span
              >
            </div>
          </div>

          <RadioCards
            v-model="form.type"
            class="form-group col-12"
            name="type"
            label="Tipo da transação"
            required
            :options="[
              { label: '🟢 Entrada', value: 'deposit' },
              { label: '🔴 Saída', value: 'withdraw' },
            ]"
          />

          <div class="form-group col-12">
            <label for="title">Valor *</label>
            <input
              id="value"
              type="number"
              v-model.number="form.value"
              class="form-control"
              placeholder="Digite o valor da transação"
              @focus="$v.form.value.$touch"
            />

            <div
              v-if="$v.form.value.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.value.required"
                >Valor da transação é obrigatório</span
              >
              <span v-if="!$v.form.value.minValue"
                >Valor da transação deve ser maior que zero</span
              >
            </div>
          </div>

          <div class="form-group col-12">
            <label for="title">Data *</label>
            <input
              id="value"
              type="date"
              v-model="form.date"
              class="form-control"
              placeholder="Digite a data da transação"
              @focus="$v.form.date.$touch"
            />

            <div
              v-if="$v.form.date.$error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              <span v-if="!$v.form.date.required"
                >Data da transação é obrigatório</span
              >
            </div>
          </div>
        </form>
      </template>

      <template slot="modal-footer">
        <Button
          category="danger"
          class="col-6"
          @click="closeCreateTransactionModal"
        >
          Cancelar <i class="fas fa-times-circle" />
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
    <Modal size="md" :isVisible="modals.isTransactionDetailsModalVisible">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          Visualizar transação
          <i class="fas fa-money-check-alt"></i>
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
              placeholder="Digite o título da transação"
              disabled
            />
          </div>

          <RadioCards
            v-model="form.type"
            class="form-group col-12"
            name="type"
            label="Tipo da transação"
            required
            :options="[
              { label: '🟢 Entrada', value: 'deposit' },
              { label: '🔴 Saída', value: 'withdraw' },
            ]"
            disabled
          />

          <div class="form-group col-12">
            <label for="title">Valor *</label>
            <input
              id="value"
              type="number"
              v-model.number="form.value"
              class="form-control"
              placeholder="Digite o valor da transação"
              disabled
            />
          </div>

          <div class="form-group col-12">
            <label for="title">Data *</label>
            <input
              id="value"
              type="date"
              v-model="form.date"
              class="form-control"
              placeholder="Digite a data da transação"
              disabled
            />
          </div>
        </form>
      </template>

      <template slot="modal-footer">
        <Button
          category="primary"
          class="col-12"
          @click="modals.isTransactionDetailsModalVisible = false"
          >Fechar <i class="fas fa-times-circle" />
        </Button>
      </template>
    </Modal>
  </main>
</template>

<script lang="ts">
/* eslint-disable vue/no-unused-components */
/* eslint-disable @typescript-eslint/no-var-requires */
import 'vue-good-table/dist/vue-good-table.css';
import Vue from 'vue';
import { Balance } from '@/@types/Transactions';
import { VueGoodTablePaginationOptions } from '@/utils/constants/VueGoodTablePaginationOptions';
import { mapActions, mapGetters } from 'vuex';
import { Button, Modal, LoadingSpinner, RadioCards } from '@/components';
import { convertNumberIntoMoneyString } from '@/utils';
import alert from '@/services/alert';
import showToast from '@/services/toast';
import { ActionResponse } from '@/store';
import { minLength, minValue, required } from 'vuelidate/lib/validators';
import { transactionsRequests } from '@/services/api/requests';

export default Vue.extend({
  components: {
    Button,
    Modal,
    LoadingSpinner,
    VueGoodTable: require('vue-good-table').VueGoodTable,
    RadioCards,
  },

  mounted() {
    this.fetchBalanceAndTransactions();
  },

  data: () => ({
    paginationOptions: VueGoodTablePaginationOptions,
    modals: {
      isTransactionDetailsModalVisible: false,
      isCreateTransactionModalVisible: false,
      currentModal: '' as 'create' | 'edit',
    },

    form: {
      id: '',
      title: '',
      value: null as unknown as number,
      type: '',
      date: '',
    },
  }),

  computed: {
    ...mapGetters({
      balance: 'transactions/getBalance',
      transactions: 'transactions/getTransactions',
    }),

    formattedBalance(): { total: string; entries: string; withdraws: string } {
      const balance: Balance = this.balance;

      return {
        total:
          balance.total > 0
            ? convertNumberIntoMoneyString(balance.total)
            : convertNumberIntoMoneyString(balance.total * -1),
        entries: convertNumberIntoMoneyString(balance.entries),
        withdraws: convertNumberIntoMoneyString(balance.withdraws),
      };
    },

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
      fetchBalance: 'transactions/fetchBalance',
      fetchTransactions: 'transactions/fetchTransactions',
      addTransaction: 'transactions/addTransaction',
      deleteTransaction: 'transactions/deleteTransaction',
      updateTransaction: 'transactions/updateTransaction',
    }),

    fetchBalanceAndTransactions() {
      this.fetchBalance();
      this.fetchTransactions();
    },

    openCreateTransactionModal() {
      this.$v.$reset();

      this.form = {
        id: '',
        title: '',
        value: '' as unknown as number,
        type: '',
        date: '',
      };

      this.modals.currentModal = 'create';
      this.modals.isCreateTransactionModalVisible = true;
    },

    closeCreateTransactionModal() {
      this.modals.isCreateTransactionModalVisible = false;
    },

    async openEditModal(transactionId: string) {
      const transaction = await this.getTransaction(transactionId);

      if (!transaction) {
        alert
          .error('Essa transação não existe mais')
          .then(this.fetchBalanceAndTransactions);
        return;
      }

      this.form = {
        ...transaction,
        value: transaction.value / 100,
      };

      this.modals.currentModal = 'edit';
      this.modals.isCreateTransactionModalVisible = true;
    },

    async openDetailsModal(transactionId: string) {
      const transaction = await this.getTransaction(transactionId);

      if (!transaction) {
        alert
          .error('Esse produto não existe mais')
          .then(this.fetchBalanceAndTransactions);
        return;
      }

      this.form = {
        ...transaction,
        value: transaction.value / 100,
      };

      this.modals.isTransactionDetailsModalVisible = true;
    },

    async getTransaction(transactionId: string) {
      const { data } = await transactionsRequests.getById(transactionId);

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
      const response: ActionResponse = await this.addTransaction({
        ...this.form,
        value: this.form.value * 100, // * 100 porque a API salva em centavos
      });

      if (response.status === 201) {
        this.fetchBalanceAndTransactions();
        this.modals.isCreateTransactionModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async submitEditForm() {
      const response: ActionResponse = await this.updateTransaction({
        ...this.form,
        value: this.form.value * 100, // * 100 porque a API salva em centavos
      });

      if (response.status === 200) {
        this.fetchBalanceAndTransactions();
        this.modals.isCreateTransactionModalVisible = false;
        showToast({ icon: 'success', text: response.message });
      } else {
        alert.error(response.message);
      }
    },

    async confirmTransactionDelete(transactionId: string) {
      const { answer } = await alert.question({
        text: 'Essa operação não poderá ser desfeita',
      });

      if (answer === 'yes') {
        const deleteResponse: ActionResponse = await this.deleteTransaction(
          transactionId
        );

        const isSuccessResponse = deleteResponse.status === 200;

        if (isSuccessResponse) {
          this.fetchBalanceAndTransactions();
        }

        showToast({
          icon: isSuccessResponse ? 'success' : 'error',
          text: isSuccessResponse
            ? 'Transação excluída com sucesso'
            : deleteResponse.message,
        });
      } else {
        showToast({ icon: 'info', text: 'A transação não foi excluída' });
      }
    },
  },

  validations: {
    form: {
      title: {
        required,
        minLength: minLength(5),
      },

      value: {
        required,
        minValue: minValue(1),
      },

      type: {
        required,
      },

      date: {
        required,
      },
    },
  },
});
</script>

<style lang="scss" src="./Transactions.styles.scss"></style>
<style>
label {
  font-weight: 600;
}
</style>

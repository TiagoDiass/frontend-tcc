import Vue from 'vue';
import Vuex from 'vuex';
import adoptionsModule from './modules/adoptions.store';
import animalsModule from './modules/animals.store';
import helpCasesModule from './modules/helpCases.store';
import medicinesModule from './modules/medicines.store';
import partnerClinicsModule from './modules/partnerClinics.store';
import productsModule from './modules/products.store';
import servicesModule from './modules/services.store';
import transactionsModule from './modules/transactions.store';
import voluntariesModule from './modules/voluntaries.store';

Vue.use(Vuex);

export type ActionResponse = {
  status: number;
  message: string;
};

export default new Vuex.Store({
  modules: {
    animals: animalsModule,
    services: servicesModule,
    products: productsModule,
    transactions: transactionsModule,
    medicines: medicinesModule,
    clinics: partnerClinicsModule,
    adoptions: adoptionsModule,
    voluntaries: voluntariesModule,
    helpCases: helpCasesModule,
  },
});

import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/globals.scss';

Vue.filter('cnpj', (cnpjUnmasked: string) => {
  const cnpjArray = cnpjUnmasked.split('');
  cnpjArray.splice(2, 0, '.');
  cnpjArray.splice(6, 0, '.');
  cnpjArray.splice(10, 0, '/');
  cnpjArray.splice(15, 0, '-');

  return cnpjArray.join('');
});

Vue.filter('phone', (phoneUnmasked: string) => {
  const phoneArray = phoneUnmasked.split('');

  phoneArray.splice(0, 0, '(');
  phoneArray.splice(3, 0, ')');
  phoneArray.splice(4, 0, ' ');

  return phoneArray.join('');
});

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

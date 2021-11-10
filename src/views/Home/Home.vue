<template>
  <div class="home view">
    <div class="view-header">
      <h1>Home</h1>
    </div>

    <div class="view-content">
      <h1 class="text-bold text-uppercase">
        Bem vindo a <span class="text-primary">KapaKamael</span>!
      </h1>
      <h5 class="mb-1">
        Abaixo segue algumas instruções pra você utilizar a aplicação.
      </h5>

      <ul class="p-2 ml-5">
        <li>
          A tela de <span class="text-bold">Animais</span> é onde você pode
          gerenciar os animais que são cuidados pela ONG;
        </li>
        <li>
          A tela de <span class="text-bold">Adoções</span> é onde você pode
          gerenciar as adoções realizadas pela ONG.
        </li>
        <li>
          A tela de <span class="text-bold">Voluntários</span> é onde você pode
          gerenciar todos os voluntários da ONG;
        </li>
        <li>
          A tela de <span class="text-bold">Medicamentos</span> é onde você pode
          gerenciar todos os medicamentos armazenados da ONG;
        </li>
        <li>
          A tela de <span class="text-bold">Casos de ajuda</span> é onde você
          pode gerenciar todos os casos de ajuda da ONG;
        </li>
        <li>
          A tela de <span class="text-bold">Serviços</span> é onde você pode
          gerenciar todos os serviços realizados pelos voluntários da ONG;
        </li>
        <li>
          A tela de <span class="text-bold">Clínicas parceiras</span> é onde
          você pode gerenciar todas as clínicas parceiras da ONG;
        </li>
        <li>
          A tela de <span class="text-bold">Transações</span> é onde você pode
          gerenciar todas as transações realizadas pela ONG;
        </li>
        <li>
          A tela de <span class="text-bold">Produtos</span> é onde você pode
          gerenciar todos os produtos armazenados pela ONG;
        </li>
      </ul>

      <h5 class="mt-3">Onde posso pedir por ajuda ou reportar algum bug?</h5>
      <p>
        Caso precise de ajuda ou tenha percebido alguma falha no sistema, você
        pode entrar em contato com os desenvolvedores da aplicação para explicar
        a situação. Os contatos estão abaixo
      </p>

      <a
        href="https://github.com/TiagoDiass"
        target="_blank"
        class="btn btn-secondary mt-1"
      >
        Entre em contato com o desenvolvedor
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
});
</script>

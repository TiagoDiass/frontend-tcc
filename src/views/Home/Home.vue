<template>
  <div class="home view">
    <div class="view-header">
      <h1>Home</h1>
    </div>

    <div class="view-content">
      <h1 class="text-bold">
        Bem vindo a <span class="text-primary">KapaKamael</span>!
      </h1>
      <h5 class="mb-1">
        Abaixo segue algumas instruções pra você utilizar a aplicação.
      </h5>

      <ul class="p-2 ml-5">
        <li>
          A tela de <span class="text-bold">Pacientes</span> é onde você pode
          cadastrar, editar, excluir e visualizar os dados de um paciente;
        </li>
        <li>
          A tela de <span class="text-bold">Doutores</span> é onde você pode
          cadastrar, editar, excluir e visualizar os dados de um doutor;
        </li>
        <li>
          A tela de <span class="text-bold">Agendamentos</span> é onde você pode
          registrar, editar, excluir e visualizar os agendamentos marcados;
        </li>
      </ul>

      <h5 class="mt-3">Onde posso pedir por ajuda ou reportar algum bug?</h5>
      <p>
        Caso precise de ajuda ou tenha percebido alguma falha no sistema, você
        pode entrar em contato com os desenvolvedores da aplicação para explicar
        a situação. Os contatos estão abaixo
      </p>

      <h5 class="mt-3">Sobre a aplicação</h5>
      <p>Essa aplicação foi desenvolvida com fins de tralalalalalalala</p>
      <ul class="p-2 ml-5">
        <li>
          <a
            href="https://github.com/TiagoDiass/easy-hospital"
            target="_blank"
            class="btn btn-secondary"
          >
            Código fonte da aplicação
            <i class="fas fa-code"></i>
          </a>
        </li>
        <li class="mt-1">
          <a
            href="https://github.com/TiagoDiass"
            target="_blank"
            class="btn btn-secondary"
          >
            Desenvolvedor
            <i class="fab fa-dev"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
});
</script>

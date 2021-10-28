<template>
  <div>
    <p>Component to test Modal.vue</p>

    <Modal size="lg" :isVisible="isModalVisible">
      <template slot="modal-header">
        <h4>Modal Header</h4>
      </template>

      <template slot="modal-body">
        <h2>Modal Body</h2>
      </template>

      <template slot="modal-footer">
        <h3>Modal Footer</h3>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from './Modal.vue';

export default Vue.extend({
  props: {
    isModalVisible: {
      type: Boolean,
    },
  },

  components: {
    Modal,
  },
});
</script>

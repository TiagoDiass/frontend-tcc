<template>
  <button
    @click="handleClick"
    class="btn"
    :class="[buttonTypeClass]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Button',

  props: {
    type: {
      type: String,
      required: false,
      default: 'primary',
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    buttonTypeClass(): string {
      return `btn-${this.type}`;
    },
  },

  methods: {
    handleClick(event: Event) {
      this.$emit('click', event);
    },
  },
});
</script>

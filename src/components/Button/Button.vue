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
    category: {
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
      return `btn-${this.category}`;
    },
  },

  methods: {
    handleClick(event: Event) {
      this.$emit('click', event);
    },
  },
});
</script>

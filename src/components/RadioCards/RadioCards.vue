<template>
  <div class="radio-cards-wrapper">
    <label :for="name">{{ label }} {{ required && '*' }} </label>

    <div class="options">
      <div
        class="option"
        :class="{ selected: value === option.value, disabled: disabled }"
        v-for="(option, index) in options"
        :key="index"
        @click="handleChangeOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';

export default Vue.extend({
  inheritAttrs: false,

  props: {
    label: { required: true, type: String },
    name: { required: true, type: String },
    options: { required: true, type: Array },
    value: [String, Number],
    required: Boolean,
    disabled: Boolean,
  },

  methods: {
    handleChangeOption(option: { label: string; value: any }) {
      if (this.disabled) return;

      this.$emit('input', this.value !== option.value ? option.value : '');
    },
  },
});
</script>

<style lang="scss" src="./RadioCards.scss" />

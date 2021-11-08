<template>
  <div class="form-group base-input">
    <label :for="id" v-if="label" class="form-control-label"
      >{{ label }} <span v-if="required">*</span></label
    >

    <input
      v-if="mask"
      type="text"
      v-bind="$attrs"
      class="form-control"
      :class="[
        { 'is-valid': isValid === true },
        { 'is-invalid': isValid === false },
        inputClasses,
      ]"
      v-model="model"
      v-mask="mask"
    />
    <input
      v-else
      type="text"
      v-bind="$attrs"
      class="form-control"
      :class="[
        { 'is-valid': isValid === true },
        { 'is-invalid': isValid === false },
        inputClasses,
      ]"
      v-model="model"
    />

    <slot name="helpBlock">
      <div
        class="text-danger invalid-feedback"
        style="display: block"
        v-if="error"
      >
        <slot name="errorBlock"></slot>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import { mask } from 'vue-the-mask';

export default Vue.extend({
  inheritAttrs: false,

  // mounted() {
  //   console.log(this.mask);
  // },

  directives: {
    mask,
  },

  props: {
    id: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: false,
    },

    required: {
      type: Boolean,
      required: false,
      default: false,
    },

    error: {
      type: Boolean,
      required: false,
      default: false,
    },

    value: String,

    inputClasses: Array,

    isValid: {
      type: Boolean,
      default: null,
    },

    mask: {
      required: false,
      default: undefined,
    },

    masked: Boolean,
  },

  computed: {
    model: {
      get(): any {
        return this.value;
      },

      set(value: string) {
        this.$emit('input', this.masked ? value : value.replace(/\D/g, ''));
      },
    },
  },
});
</script>

<style lang="scss">
.form-group.base-input {
  .form-control-label {
    font-weight: 600;
  }
}
</style>

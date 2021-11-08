<template>
  <div class="form-group base-select">
    <label
      :for="id"
      v-if="label"
      class="form-control-label"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required">*</span>
    </label>

    <select
      v-bind="$attrs"
      :id="id"
      v-on="listeners"
      class="form-control"
      :class="[
        { 'is-valid': isValid === true },
        { 'is-invalid': isValid === false },
        selectClasses,
      ]"
    >
      <option
        style="color: #000"
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :selected="value == option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';

export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true,
    },

    label: String,
    labelClasses: Array,
    required: Boolean,

    isValid: {
      type: Boolean,
      default: null,
    },

    options: Array,
    selectClasses: Array,

    value: {},
  },

  computed: {
    listeners(): any {
      return {
        ...this.$listeners,
        focus: (value: any) => this.$emit('focus', value),
        input: (event: any) => this.$emit('input', event.target.value),
      };
    },
  },
});
</script>

<style lang="scss">
.form-group.base-select {
  .form-control-label {
    font-weight: 600;
  }
}
</style>

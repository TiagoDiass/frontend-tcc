<template>
  <div class="form-group base-input">
    <label :for="id" v-if="label" class="form-control-label"
      >{{ label }} <span v-if="required">*</span></label
    >

    <input
      type="text"
      v-bind="$attrs"
      class="form-control"
      :class="[
        { 'is-valid': isValid === true },
        { 'is-invalid': isValid === false },
        inputClasses,
      ]"
      :value="value"
      v-mask="mask"
      v-on="listeners"
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

  mounted() {
    console.log(this.isValid);
  },

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
      default: null,
    },

    masked: Boolean,
  },

  computed: {
    listeners(): any {
      return {
        ...this.$listeners,
        input: this.updateValue,
        focus: (v: FocusEvent) => this.$emit('focus', v),
      };
    },
  },

  methods: {
    updateValue(event: any) {
      const value =
        event.target.value && !this.masked
          ? event.target.value.replace(/\D/g, '')
          : event.target.value;

      this.$emit('input', value);
    },
  },
});
</script>

<style></style>

<template>
  <SlideYUpTransition :duration="animationDuration">
    <div
      :data-testid="testId"
      class="modal fade"
      :class="{ 'show d-block': isVisible }"
      v-show="isVisible"
      tabindex="-1"
      role="dialog"
      :aria-hidden="!isVisible"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        :class="modalSizeClass"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header py-2">
            <slot name="modal-header"></slot>
          </div>

          <div class="modal-body px-4">
            <slot name="modal-body"></slot>
          </div>

          <div class="modal-footer py-1 justify-content-center flex-nowrap">
            <slot name="modal-footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </SlideYUpTransition>
</template>

<script lang="ts">
import { SlideYUpTransition } from 'vue2-transitions';
import Vue from 'vue';

export default Vue.extend({
  name: 'Modal',

  components: {
    SlideYUpTransition,
  },

  props: {
    isVisible: {
      type: Boolean,
    },

    animationDuration: {
      type: Number,
      default: 500,
    },

    size: {
      type: String,
      default: 'lg',
    },

    testId: {
      type: String,
      default: 'modal',
    },
  },

  computed: {
    modalSizeClass(): string {
      return `modal-${this.size}`;
    },
  },
});
</script>

<style lang="scss" src="./Modal.scss" />

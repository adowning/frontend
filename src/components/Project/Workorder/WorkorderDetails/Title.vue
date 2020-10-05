<template>
  <div class="w-full inline-block mt-4 -ml-2 h-10">
    <j-textarea
      placeholder="Short summary"
      class="title"
      @input="e => (title = e)"
      @blur="updateworkorderDescription"
      :value="value"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    },
    updateworkorder: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const isWorking = ref<boolean>(false)
    const title = ref<HTMLDivElement>(props.value)

    const updateworkorderDescription = async () => {
      try {
        isWorking.value = true
        await props.updateworkorder({ title: title.value })
        isWorking.value = false
      } catch (error) {
        console.error(error)
      }
    }

    return {
      title,
      isWorking,
      updateworkorderDescription
    }
  }
})
</script>

<style lang="postcss" scoped>
.title {
  border-color: transparent !important;
  @apply h-auto font-medium text-2xl text-textDarkest;
}
</style>

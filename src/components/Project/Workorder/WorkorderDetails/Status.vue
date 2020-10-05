<template>
  <div>
    <div class="mt-6 mb-1 uppercase text-textMedium text-13 font-bold">
      status
    </div>
    <j-select
      searchable
      variant="empty"
      :dropdownWidth="300"
      :withClearValue="false"
      :options="workorderStatusOptions"
      :value="value"
      @change="updateworkorderStatus"
      customRender
      customRenderOption
    >
      <template v-slot:default="{ label }">
        <j-button
          class="uppercase text-textMedium text-13"
          :variant="workorderStatusVariants[value]"
        >
          {{ label }}
        </j-button>
      </template>
      <template v-slot:option="{ label }">
        <div class="flex items-center pr-1 pl-2">
          <div class="text-15 pr-1 pl-2">
            {{ label }}
          </div>
        </div>
      </template>
    </j-select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { WorkorderStatusCopy, WorkorderStatus } from '@/types/workorder'
import { WorkorderStatusVariants } from '@/utils/colors'
export default defineComponent({
  props: {
    value: {
      type: String as () => WorkorderStatus,
      required: true
    },
    updateworkorder: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const WorkorderStatusOptions = Object.values(WorkorderStatus).map(
      status => ({
        value: status,
        label: WorkorderStatusCopy[status]
      })
    )
    const updateworkorderStatus = async (status: WorkorderStatus) => {
      try {
        await props.updateworkorder({ status })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      WorkorderStatusOptions,
      WorkorderStatusVariants,
      updateworkorderStatus
    }
  }
})
</script>

<style></style>

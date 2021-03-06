<template>
  <div class="flex container mt-7">
    <List
      @drop="onDrop"
      v-for="status in WorkorderStatus"
      :key="status"
      :status="status"
    >
    </List>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'
import List from '@/components/Project/Lists/List.vue'
import { WorkorderStatus } from '@/types/workorder'
import { getters, mutations } from '@/store'
import {
  DropResult,
  Target,
  calculateWorkorderListPosition,
  isPositionChanged,
  updateArrayItemById
} from '@/utils/dnd'
import { useMutation } from '@vue/apollo-composable'
import { updateWorkorderMutation } from '@/graphql/queries/workorder'

export default defineComponent({
  components: {
    List
  },
  setup() {
    const project = computed(getters.project)
    const destination = ref<Target>(null)
    const source = ref<Target>(null)

    const { mutate } = useMutation(updateWorkorderMutation)

    const handleWorkorderDrop = (workorderId: string, d: Target, s: Target) => {
      if (!isPositionChanged(s, d)) return

      const workorderUpdateValues = {
        status: d.droppableId,
        listPosition: calculateWorkorderListPosition(
          project.value.workorders,
          d,
          s,
          workorderId
        )
      }

      const workorders = updateArrayItemById(
        project.value.workorders,
        workorderId,
        workorderUpdateValues
      )

      const oldProjectValues = getters.project()
      // optimistic update
      mutations.setProject({
        ...project.value,
        workorders
      })

      mutate({
        workorderId: Number(workorderId),
        Workorder: workorderUpdateValues
        // eslint-disable-next-line
      } as any).catch(e => {
        console.error(e)
        mutations.setProject(oldProjectValues)
      })
      destination.value = null
      source.value = null
    }

    const onDrop = (dropResult: DropResult) => {
      const { removedIndex, addedIndex, payload, to } = dropResult

      if (removedIndex == null && addedIndex == null) return

      if (removedIndex != null) {
        source.value = {
          index: removedIndex,
          droppableId: payload.status
        }
      }

      if (addedIndex != null) {
        destination.value = {
          index: addedIndex,
          droppableId: Object.values(WorkorderStatus)[to]
        }
      }

      if (destination.value != null && source.value != null) {
        handleWorkorderDrop(payload.id, destination.value, source.value)
      }
    }

    return {
      onDrop,
      WorkorderStatus
    }
  }
})
</script>

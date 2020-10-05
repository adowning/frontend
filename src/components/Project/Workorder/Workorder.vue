<template>
  <div class="Workorder-wrap">
    <div @click="openWorkorderDetails" class="Workorder">
      <p class="pb-3 text-15 text-textDarkest">
        {{ Workorder.title }}
      </p>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <j-icon
            :name="Workorder.type"
            :size="20"
            class="text-textMedium mr-1"
          ></j-icon>

          <j-icon
            :style="{ color: WorkorderPriorityStyles.color }"
            :name="WorkorderPriorityStyles.icon"
            :size="20"
          ></j-icon>
        </div>
        <div class="flex flex-row-reverse ml-1">
          <j-avatar
            v-for="user in assignees"
            :key="user.id"
            :size="24"
            :avatarUrl="user.avatarUrl"
            :name="user.name"
            class="shadow-outline-white -ml-1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { Workorder, WorkorderPriority } from '@/types/workorder'
import { getters } from '@/store'
import { WorkorderPriorityColors } from '@/utils/colors'
import eventBus from '@/utils/eventBus'

export default defineComponent({
  props: {
    Workorder: {
      type: Object as () => Workorder,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const project = computed(getters.project)
    const assignees = computed(() =>
      props.Workorder.userIds.map(userId =>
        project.value.users.find(user => user.id === userId)
      )
    )

    const WorkorderPriorityStyles = computed(() => ({
      icon: [WorkorderPriority.LOW, WorkorderPriority.LOWEST].includes(
        props.Workorder.priority
      )
        ? 'arrow-down'
        : 'arrow-up',
      color: WorkorderPriorityColors[props.Workorder.priority]
    }))

    const openWorkorderDetails = () => {
      eventBus.$emit('toggle-Workorder-details', true, props.Workorder.id)
    }

    return {
      assignees,
      WorkorderPriorityStyles,
      openWorkorderDetails
    }
  }
})
</script>

<style lang="postcss" scoped>
.Workorder-wrap {
  touch-action: manipulation;
  cursor: grab;
  margin-bottom: 5px;
}
.Workorder {
  @apply rounded-sm bg-white  transition-all duration-100 select-none;
  padding: 10px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 2px 0px;
}
.Workorder:hover {
  @apply bg-backgroundLight;
}
</style>

<script setup lang='ts'>
import type { MenuGroupOption, MenuOption } from 'naive-ui'
import { useAutoRouter } from '@oiij/auto-router'
import { useNaiveMenu } from '@oiij/naive-ui'
import { renderIcon } from '~/utils/render-icon'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const autoRouter = useAutoRouter()
const { menuOptions } = useNaiveMenu(autoRouter.routes, {
  renderIcon: icon => renderIcon(icon),
})
function renderLabel(option: MenuOption | MenuGroupOption) {
  return t(`GLOBAL.MENU.${option.label}`, `${option.label}`)
}

function handleUpdateValue(key: string) {
  router.push(key)
}
</script>

<template>
  <div class="flex-col wh-full">
    <div class="flex-1 min-h-0 w-full">
      <NScrollbar>
        <NMenu
          :collapsed="appStore.collapsed"
          :collapsed-width="60"
          :collapsed-icon-size="32"
          :indent="14"
          :icon-size="24"
          accordion
          :value="route.fullPath"
          :options="menuOptions"
          :render-label="renderLabel"
          @update:value="handleUpdateValue"
        />
      </NScrollbar>
    </div>
    <div class="p-y-[10px] flex items-center justify-center">
      <NButton quaternary @click="appStore.toggleCollapsed">
        <template #icon>
          <Transition name="fade" mode="out-in">
            <i v-if="appStore.collapsed" class="i-mage-dots-menu" />
            <i v-else class="i-mage-dash-menu" />
          </Transition>
        </template>
      </NButton>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>

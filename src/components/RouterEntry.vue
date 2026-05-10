<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useAutoRouter } from '@oiij/auto-router'

const autoRouter = useAutoRouter()
const appStore = useAppStore()
const keepAliveName = computed(() => autoRouter.flattenRoutes.map(m => m.name?.toString() ?? m.path))

const wrapperMap = new Map()

function formatComponentInstance(component: Component, route: RouteLocationNormalizedLoaded) {
  let wrapper
  if (component) {
    const wrapperName = route.name
    if (wrapperMap.has(wrapperName)) {
      wrapper = wrapperMap.get(wrapperName)
    }
    else {
      wrapper = {
        name: wrapperName,
        render() {
          return h(component)
        },
      }
      wrapperMap.set(wrapperName, wrapper)
    }
    return h(wrapper)
  }
  return null
}
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition appear mode="out-in" :name="appStore.transitionName">
      <KeepAlive :include="keepAliveName" :exclude="appStore.reloadFlag ? route.name : undefined">
        <Suspense>
          <component :is="formatComponentInstance(Component, route)" v-if="!appStore.reloadFlag" :key="route.name" />
          <template #fallback>
            <slot name="fallback">
              Component Fallback
            </slot>
          </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<style>

</style>

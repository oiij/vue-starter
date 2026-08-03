<script setup lang="ts">
import BaseLayoutAside from './BaseLayoutAside.vue'

const { collapsed } = storeToRefs(useAppStore())
</script>

<template>
  <div class="flex-col wh-full">
    <NLayout has-sider class="flex-1 min-h-0">
      <NLayoutSider
        :width="160"
        :collapsed-width="60"
        collapse-mode="width"
        :collapsed="collapsed"
        bordered
        content-class="flex flex-col"
      >
        <BaseLayoutAside />
      </NLayoutSider>
      <NLayoutContent>
        <main class="wh-full">
          <slot />
        </main>
      </NLayoutContent>
    </NLayout>
  </div>
</template>

<style scoped lang="less"></style>

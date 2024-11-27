<template>
  <div class="dashboard-container">vue3-element-template</div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});
</script>

<style lang="scss" scoped>
.dashboard-container {
  height: 100%;
  background: url("@/assets/images/login-background-light.jpg") no-repeat center right;
}

html.dark {
  .dashboard-container {
    background: url("@/assets/images/login-background-dark.jpg") no-repeat center right;
  }
}
</style>

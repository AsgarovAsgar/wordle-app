<script setup lang="ts">
defineProps<{
  wordOfTheDay: string
}>()
</script>

<template>
  <div>
    <input type="text">
    <p>You won!</p>
  </div>
</template>

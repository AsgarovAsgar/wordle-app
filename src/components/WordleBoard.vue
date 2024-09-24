<script setup lang="ts">
import { VICTORY_MESSAGE } from '@/settings'

defineProps<{
  wordOfTheDay: string
}>()
</script>

<template>
  <div>
    <input type="text">
    <p>{{ VICTORY_MESSAGE }}</p>
  </div>
</template>

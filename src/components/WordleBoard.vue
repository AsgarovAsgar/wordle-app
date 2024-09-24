<script setup lang="ts">
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '@/settings'
import { ref } from 'vue'
defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => wordGiven.length === 5 && wordGiven.toUpperCase() === wordGiven
  }
})

const guessInProgress = ref('')
const guessSubmitted = ref('')
</script>

<template>
  <div>
    <input type="text" v-model="guessInProgress" @keydown.enter="guessSubmitted = guessInProgress">
    <p v-if="guessSubmitted.length">
      {{ guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '@/settings'
import { ref } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'
import GuessInput from './GuessInput.vue';

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => wordGiven.length === 5 
      && wordGiven.toUpperCase() === wordGiven
      && englishWords.includes(wordGiven)
  }
})

const guessSubmitted = ref('')

</script>

<template>
  <div>
    <GuessInput @guess-submitted="guess => guessSubmitted = guess" />
    <p v-if="guessSubmitted.length">
      {{ guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE }}
    </p>
  </div>
</template>

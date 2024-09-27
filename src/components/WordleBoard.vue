<script setup lang="ts">
import { VICTORY_MESSAGE, DEFEAT_MESSAGE, WORD_SIZE } from '@/settings'
import { ref, computed } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => wordGiven.length === 5 
      && wordGiven.toUpperCase() === wordGiven
      && englishWords.includes(wordGiven)
  }
})

const guessInProgress = ref('')
const guessSubmitted = ref('')

// in order to make computed writable, we need to use a getter and setter
const formattedGuessInProgress = computed({
  get: () => guessInProgress.value,
  set: (rawValue: string) => guessInProgress.value = rawValue
    .slice(0, WORD_SIZE)
    .toUpperCase()
    .replace(/[^A-Z]+/gi, '')
})

function onSubmit() {
  if(!englishWords.includes(guessInProgress.value)) return

  guessSubmitted.value = guessInProgress.value
}
</script>

<template>
  <div>
    <input 
      type="text" 
      :maxlength="WORD_SIZE"
      v-model="formattedGuessInProgress" 
      @keydown.enter="onSubmit"
    />
    <p v-if="guessSubmitted.length">
      {{ guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE }}
    </p>
  </div>
</template>

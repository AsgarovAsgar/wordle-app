<script setup lang="ts">
import { VICTORY_MESSAGE, DEFEAT_MESSAGE, WORD_SIZE } from '@/settings'
import { ref, computed, watch } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => wordGiven.length === 5 
      && wordGiven.toUpperCase() === wordGiven
      && englishWords.includes(wordGiven)
  }
})

const guessInProgress = ref<string | null>(null)
const guessSubmitted = ref('')

// in order to make computed writable, we need to use a getter and setter
const formattedGuessInProgress = computed<string>({
  get: () => guessInProgress.value ?? '',
  set: (rawValue: string) => {
    guessInProgress.value = null

    guessInProgress.value = rawValue
      .slice(0, WORD_SIZE)
      .toUpperCase()
      .replace(/[^A-Z]+/gi, '')
  }
})

function onSubmit() {
  if(!englishWords.includes(formattedGuessInProgress.value)) return

  guessSubmitted.value = formattedGuessInProgress.value
}

</script>

<template>
  <div>
    <pre v-show="false">{{ guessInProgress }}</pre>
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

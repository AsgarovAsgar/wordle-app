<script setup lang="ts">
import { WORD_SIZE } from '@/settings'
import { ref, computed } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'
import GuessView from './GuessView.vue';

const guessInProgress = ref<string | null>(null)
const emit = defineEmits<{
  'guess-submitted': [guess: string]
}>()

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

  emit('guess-submitted', formattedGuessInProgress.value)
  guessInProgress.value = null
}

</script>

<template>
  <pre v-show="false">{{ guessInProgress }}</pre>
  <GuessView :guess="formattedGuessInProgress" />

  <input v-model="formattedGuessInProgress"
         :maxlength="WORD_SIZE"
         autofocus
         @blur="({target}) => (target as HTMLInputElement).focus()"
         type="text"
         @keydown.enter="onSubmit">
</template>

<style scoped>
input {
  position: absolute;
  opacity: 0;
}
</style>
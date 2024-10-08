<script setup lang="ts">
import { WORD_SIZE } from '@/settings'
import { ref, computed } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'

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
  </div>
</template>

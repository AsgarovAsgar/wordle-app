<script setup lang="ts">
import { WORD_SIZE } from '@/settings'
import { ref, computed } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'
import GuessView from './GuessView.vue';

withDefaults(defineProps<{
  disabled: boolean
}>(), {
  disabled: false
})

const guessInProgress = ref<string | null>(null)
const hasFailedValidation = ref<boolean>(false)

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
  if(!englishWords.includes(formattedGuessInProgress.value)) {
    hasFailedValidation.value = true
    setTimeout(() => hasFailedValidation.value = false, 500)
    return
  }

  emit('guess-submitted', formattedGuessInProgress.value)
  guessInProgress.value = null
}

</script>

<template>
  <pre v-show="false">{{ guessInProgress }}</pre>
  <GuessView v-if="!disabled" :class="{shake: hasFailedValidation}" :guess="formattedGuessInProgress" />

  <input v-model="formattedGuessInProgress"
         :maxlength="WORD_SIZE"
         :disabled="disabled"
         aria-label="Make your guess for the word of the day"
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

.shake {
  animation: shake;
  animation-duration: 100ms;
  animation-iteration-count: 2;
}
@keyframes shake {
  0% {
    transform: translateX(-2%);
  }
  25% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(2%);
  }
  75% {
    transform: translateX(0);
  }
}
</style>
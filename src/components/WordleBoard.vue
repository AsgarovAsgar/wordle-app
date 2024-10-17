<script setup lang="ts">
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '@/settings'
import { ref } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'
import GuessInput from '@/components/GuessInput.vue';

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
  <main>
    <GuessInput @guess-submitted="guess => guessSubmitted = guess" />
    <p v-if="guessSubmitted.length" class="end-of-game-message">
      {{ guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE }}
    </p>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
}

.end-of-game-message {
  font-size: 3rem;
  animation: end-of-game-message-animation 700ms forwards;
  white-space: nowrap;
  text-align: center;
}
@keyframes end-of-game-message-animation {
  0% {
    opacity: 0;
    transform: rotateZ(0);
  }
  100% {
    opacity: 1;
    transform: translateY(2rem);
  }
}
</style>
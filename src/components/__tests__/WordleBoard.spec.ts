import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '@/settings'

describe('WordleBoard', () => {
  const wordOfTheDay = 'TESTS'
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => { 
    wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
  })

  async function playerSubmitsGuess(guess: string) {
    const guessINPUT = wrapper.find('input[type="text"]')
    await guessINPUT.setValue(guess)
    await guessINPUT.trigger('keydown.enter')
    // const guessButton = wrapper.find('button')
    // await guessButton.trigger('click')
  }

  describe('End of the game messages', () => {
    test("A victory message appears when the user makes a guess that matches the word of the day", async () => {
      await playerSubmitsGuess(wordOfTheDay)
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })
  
    test('a defeat message appears when the user makes a guess that is incorrect', async () => { 
      await playerSubmitsGuess('WRONG')
      expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
    })
  
    test('no end-of-game message appears if the user has not yet made a guess', async () => {
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    })
  })

  describe('Rules defining the word of the day', () => { 
    test.each(
      [
        {wordOfTheDay: 'FLY', reason: 'word-of-the-day must have 5 characters'},
        {wordOfTheDay: 'tests', reason: 'word-of-the-day must be in all uppercase'},
        {wordOfTheDay: 'ZZZZZ', reason: 'word-of-the-day must be a valid English word'}
      ]
    )('Since $reason: $wordOfTheDay is invalid, therefore a warning must be emitted', async ({ wordOfTheDay }) => {
      console.warn = vi.fn()
  
      mount(WordleBoard, {props: { wordOfTheDay }})
  
      expect(console.warn).toHaveBeenCalled()
    })
  
    test('no warning is emitted if the word of the day provided is a real uppercase English word with exactly 5 characters', async () => {
      console.warn = vi.fn()
  
      mount(WordleBoard, {props: {wordOfTheDay: 'TESTS'}})
  
      expect(console.warn).not.toHaveBeenCalled()
    })
  })

  describe('Player input', () => {
    test.todo('player guesses are limited to 5 letters')
    test.todo('player guesses can only be submitted if they are real words')
    test.todo('player guesses are not case-sensitive')
    test.todo('player guesses can only contain letters')
  })
})

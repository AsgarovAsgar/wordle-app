import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '@/settings'

describe('WordleBoard', () => {
  const wordOfTheDay = 'TESTS'
  test("A victory message appears when the user makes a guess that matches the word of the day", async () => {
    // Arrange
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay}})

    // Act  
    const guessINPUT = wrapper.find('input[type="text"]')
    await guessINPUT.setValue('TESTS')
    await guessINPUT.trigger('keydown.enter')
    // const guessButton = wrapper.find('button')
    // await guessButton.trigger('click')

    // Assert
    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  test('a defeat message appears when the user makes a guess that is incorrect', async () => { 
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay}})

    const guessINPUT = wrapper.find('input[type="text"]')
    await guessINPUT.setValue('WRONG')
    await guessINPUT.trigger('keydown.enter')

    expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
  })
  test.todo('no end-of-game message appears if the user has not yet made a guess')
})

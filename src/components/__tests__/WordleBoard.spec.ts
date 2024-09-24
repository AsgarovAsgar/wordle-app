import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE } from '@/settings'

describe('WordleBoard', () => {
  test("A victory message appears when the user makes a guess that matches the word of the day", async () => {
    // Arrange
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay: 'TESTS'}})

    // Act
    const guessINPUT = wrapper.find('input[type="text"]')
    await guessINPUT.setValue('TESTS')
    await guessINPUT.trigger('keydown.enter')
    // const guessButton = wrapper.find('button')
    // await guessButton.trigger('click')

    // Assert
    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })
})

import axios from 'axios'
import { shallowMount } from "@vue/test-utils";
import flushPromises from 'flush-promises'

import Search from "@/views/Search.vue";

import { firstResponse200, secondResponse200, thirddResponse200 } from './response.js'
jest.mock('axios')

// number : event(input) - result(output)
// (done) Enter characters in the <input> (User Interaction) - enable <input> (What is rendered to the DOM)
// (pass) (bad test) Press the search button (User Interaction) - loading status will be true (nothing...)
// (pass) (bad test) Press the search button (User Interaction) - error status will be true when receiving an error response (nothing...)
// (done) Press the search button (User Interaction) -  "page" is rendered (What is rendered to the DOM)
// (done) Press the search button (User Interaction) -  "current_page" is rendered (What is rendered to the DOM)
// (done) Press the search button (User Interaction) -  "total page" is rendered (What is rendered to the DOM)
// (done) Press the search button (User Interaction) -  previous button is rendered (What is rendered to the DOM)
// Press the search button (User Interaction) -  next button is rendered (What is rendered to the DOM)

// bellow is test cases of Players.vue
// Press the search button (User Interaction) -  Player names, positions and teams are displayed in a list format (What is rendered to the DOM)
// Press the previous button (User Interaction) - The previous page is displayed (What is rendered to the DOM)
// Press the next button (User Interaction) - The next page is displayed (What is rendered to the DOM)
// Press the Check the Stats button (User Interaction) - Go to the PlayerDetail page (Route Changes)

describe("Search.vue", () => {
  beforeEach(() => {
  })

  it('Enter characters in the <input> (User Interaction) - enable <input> (What is rendered to the DOM)', async () => {
    // axios.get.mockResolvedValueOnce(firstResponse200)

    const wrapper = shallowMount(Search)
    const searchInput = wrapper.find('[data-testid="search-input"]')
    expect(wrapper.find('[data-testid="search-button"]').attributes().disabled).toMatch('')

    searchInput.setValue('test')
    wrapper.vm.$nextTick()
    await flushPromises()

    expect(wrapper.find('[data-testid="search-button"]').attributes().disabled).toBeUndefined()

  })

  it('Press the search button (User Interaction) -  "page" is rendered (What is rendered to the DOM)', async () => {
    axios.get.mockResolvedValueOnce(firstResponse200)

    const wrapper = shallowMount(Search)
    const searchInput = wrapper.find('[data-testid="search-input"]')

    searchInput.setValue('test')
    wrapper.vm.$nextTick()
    await flushPromises()
    
    wrapper.find('[data-testid="search-button"]').trigger('click')
    wrapper.vm.$nextTick()
    await flushPromises()

    expect(wrapper.find('[data-testid="page-paragraph"]').html()).toMatch('<p data-testid="page-paragraph">page : 1</p>')
  })

  it('Press the search button (User Interaction) -  "current_page" is rendered (What is rendered to the DOM)', async () => {
    axios.get.mockResolvedValueOnce(firstResponse200)

    const wrapper = shallowMount(Search)
    const searchInput = wrapper.find('[data-testid="search-input"]')

    searchInput.setValue('test')
    wrapper.vm.$nextTick()
    await flushPromises()
    
    wrapper.find('[data-testid="search-button"]').trigger('click')
    wrapper.vm.$nextTick()
    await flushPromises()

    // console.log(wrapper.find('[data-testid="current-page-paragraph"]').html())
    expect(wrapper.find('[data-testid="current-page-paragraph"]').html()).toMatch('<p data-testid="current-page-paragraph">current_page : 1</p>')
  })

  it('Press the search button (User Interaction) -  "total page" is rendered (What is rendered to the DOM)', async () => {
    axios.get.mockResolvedValueOnce(firstResponse200)

    const wrapper = shallowMount(Search)
    const searchInput = wrapper.find('[data-testid="search-input"]')
  
    searchInput.setValue('test')
    wrapper.vm.$nextTick()
    await flushPromises()
    
    wrapper.find('[data-testid="search-button"]').trigger('click')
    wrapper.vm.$nextTick()
    await flushPromises()
  
    // console.log(wrapper.find('[data-testid="total-page-paragraph"]').html())
    expect(wrapper.find('[data-testid="total-page-paragraph"]').html()).toMatch('<p data-testid="total-page-paragraph">total page : 1</p>')
  })

  it('Press the search button (User Interaction) -  previous button is rendered (What is rendered to the DOM)', async () => {
    // dont use firstResponse200. use 300response from beginning. The values of total_page and current_page are different from 200response
    axios.get.mockResolvedValueOnce(secondResponse200)
    // return thirddResponse200 after pressing the previous button
    axios.get.mockResolvedValueOnce(thirddResponse200)

    const wrapper = shallowMount(Search)
    const searchInput = wrapper.find('[data-testid="search-input"]')  
    searchInput.setValue('test')
    wrapper.vm.$nextTick()
    await flushPromises()
  
    // Execute the search logic at first time
    wrapper.find('[data-testid="search-button"]').trigger('click')
    wrapper.vm.$nextTick()
    await flushPromises()

    // the previous button is avalable after returning secondResponse200. so disable attribute is undefined.
    expect(wrapper.find('[data-testid="previous-button"]').attributes().disabled).toBeUndefined()

    // Execute the search logic at second time
    wrapper.find('[data-testid="previous-button"]').trigger('click')
    wrapper.vm.$nextTick()
    await flushPromises()

    // the previous button is not avalable after returning thirdResponse200. so disable attribute match with ''.
    expect(wrapper.find('[data-testid="previous-button"]').attributes().disabled).toMatch('')

    // The values of current_page and total_page are set to 1 and 2, respectively.
    expect(wrapper.find('[data-testid="current-page-paragraph"]').html()).toMatch('<p data-testid="current-page-paragraph">current_page : 1</p>')
    expect(wrapper.find('[data-testid="total-page-paragraph"]').html()).toMatch('<p data-testid="total-page-paragraph">total page : 2</p>')
  })

})

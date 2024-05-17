const themeKey = 'meeting-bingo-theme'
const themeButton = document.getElementById('theme')
let activeTheme
const tileTemplate = document.getElementById('cell')
const card = document.getElementById('card')
const body = document.querySelector('body')
const tileOptions = [
  'You are muted',
  'Virtual background',
  'Dog barking',
  'Cat says hello',
  'Meeting crashes',
  'Need to restart computer',
  'Can you hear me now?',
  'Let\'s circle back',
  'Screen share malfunction',
  'Can you see my screen?',
  'RBF',
  'Can we take this offline?',
  'Sorry, go ahead...',
  'Someone eating during the call',
  'Running out of coffee', 
  'Sorry I need to jump on another call',
  'Internet dies',
  'Bathroom with video on',
  'Toilet flush sound',
  'Kids in the background',
  'Inappropriate tabs in screen share',
  'Facebook tab in screen share',
  'Sorry, was multitasking',
  'Can you repeat the question?',
  'Sorry, was talking on mute',
  'You aren\'t sharing',
  'Sorry was reading slack',
  'ZZZzzz',
  'Could we record this?',
  'Who is taking notes?',
  'I\'m sorry you cut out',
  'I think there\'s a lag',
  'Sorry I\'m late',
  'Presenter just reading the slides',
  'This meeting could have been an email',
  'Is ______ on the call?',
  'Loud echo or feedback',
  'That\'s above my pay grade',
  'That\'s not my job',
  'I\'m going to need hazard pay',
  'I have a hard stop at ____',
  'It\'s still loading',
  'Ceiling camera',
  'I\'ll turn it over to ____ ',
  'Awkward Silence',
  'Does that make sense?',
  'Do you/we have the bandwidth?'
]

function generateCard() {
  'use strict'
  const tiles = Array(25)
  let i = 0;
  while (i < 25) {
    let option;
    if (i === 12) { option = 'FREE' }
    while(!option) {
      const index = getRandomInt(0, tileOptions.length - 1)
      const tile = tileOptions[index]
      if (!tiles.includes(tile)) { option = tile }
    }
    tiles[i] = option
    i++
  }
  
  card.innerHTML = '';
  tiles.forEach((option, i) => {
    const cell = tileTemplate.content.cloneNode(true)
    const label = cell.querySelector('label')
    if (i === 12) { label.classList.add('free')}
    const text = document.createTextNode(option)
    const span = cell.querySelector('span')
    span.appendChild(text)
    card.appendChild(cell)
  })
}

function getRandomInt(min, max) {
  'use strict'
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setTheme(newTheme) {
  if (newTheme === 'dark') { body.classList.remove('light') }
  if (newTheme === 'light') { body.classList.add('light') }
  activeTheme = newTheme
  localStorage.setItem(themeKey, newTheme)
}

function toggleTheme() {
  themeButton.innerHTML = `switch to ${activeTheme} theme`
  const newTheme = activeTheme === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
}

function clearCard() {
  Array.from(card.querySelectorAll('input')).forEach((input, i) => {
    if (i === 12) { return }
    input.checked = false;
  })
}

(() => {
  'use strict'
  generateCard()

  let theme = localStorage.getItem(themeKey)
  if (
    !theme 
    && window.matchMedia
    && window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    theme = 'light' 
  } else if (!theme) {
    theme = 'dark'
  }
  themeButton.innerHTML = `switch to ${theme === 'dark' ? 'light' : 'dark'} theme`
  setTheme(theme)

  const year = new Date().getFullYear();
  const yearContainer = document.getElementById('year')
  yearContainer.innerText = year === 2024 ? year : `2024 - ${year}`

})()
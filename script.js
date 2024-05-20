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
  'Zoom bomber',
  'Coloring / drawing / journaling',
  'Can you hear me now?',
  'Walking / Outside',
  'Screen share malfunction',
  'Can you see my screen?',
  'Timekeeper forgets to reset time',
  'Member shares too long',
  'Sorry, go ahead...',
  'Eating during the call',
  'Running out of coffee or tea', 
  'Heart emoji is shared',
  'Internet dies',
  'Cooking during the meeting',
  'Toilet flush sound',
  'Kids in the background',
  'Clapping emoji is shared',
  'Thumbs up emoji is shared',
  'Sorry, was multitasking',
  'What\'s the topic',
  'Sorry, was talking on mute',
  'You aren\'t sharing',
  'I never heard of MA before',
  'Sad / crying face emoji is shared',
  'Co-host accidentally mutes everyone',
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
  'Ceiling or floor camera',
  'I\'ll turn it over to ____ ',
  'Awkward silence',
  'I\'m just rambling',
  'Newcomer',
  'We see you',
  'Pop culture reference or quote',
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
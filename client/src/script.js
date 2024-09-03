const hamburger = document.querySelector('.hamburger')
const mobileMenu = document.querySelector('.mobile-links')

hamburger.addEventListener('click', function () {
  mobileMenu.classList.toggle('hidden')
  mobileMenu.classList.toggle('flex')

  if (hamburger.textContent === '🌳') hamburger.textContent = '❌'
  else hamburger.textContent = '🌳'
})

window.addEventListener('click', function (e) {
  if (!e.target.classList.contains('hamburger')) {
    mobileMenu.classList.add('hidden')
    hamburger.textContent = '🌳'
  } else return
})

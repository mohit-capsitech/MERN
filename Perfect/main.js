const newsletterForm = document.querySelector('.newsletter-form')

newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault()
  const button = newsletterForm.querySelector('button')
  if (button) button.textContent = 'Subscribed'
})

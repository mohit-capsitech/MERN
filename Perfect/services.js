const services = [
  { name: 'Dry Cleaning', price: 200, icon: 'shirt', selected: true },
  { name: 'Wash & Fold', price: 100, icon: 'basket', selected: false },
  { name: 'Ironing', price: 30, icon: 'iron', selected: true },
  { name: 'Stain Removal', price: 500, icon: 'stain', selected: false },
  { name: 'Leather & Suede Cleaning', price: 999, icon: 'leather', selected: true },
  { name: 'Wedding Dress Cleaning', price: 2800, icon: 'dress', selected: false },
]

const serviceList = document.querySelector('#service-list')
const cartItems = document.querySelector('#cart-items')
const totalAmount = document.querySelector('#total-amount')
const bookingForm = document.querySelector('#booking-form')
const bookingMessage = document.querySelector('#booking-message')

const formatPrice = (price) => `₹${price.toFixed(2)}`

const renderServices = () => {
  if (!serviceList) return
  serviceList.innerHTML = services.map((service, index) => `
    <div class="service-row">
      <div class="service-name"><span class="service-symbol ${service.icon}" aria-hidden="true"></span><strong>${service.name}</strong><span class="bullet">•</span><b>${formatPrice(service.price)}</b></div>
      <button class="service-action ${service.selected ? 'remove' : ''}" type="button" data-service-index="${index}">${service.selected ? 'Remove Item' : 'Add Item'}<span aria-hidden="true">${service.selected ? '−' : '+'}</span></button>
    </div>
  `).join('')
}

const renderCart = () => {
  const selectedServices = services.filter((service) => service.selected)
  const total = selectedServices.reduce((sum, service) => sum + service.price, 0)
  if (cartItems) {
    cartItems.innerHTML = selectedServices.length
      ? selectedServices.map((service, index) => `<tr><td>${index + 1}</td><td>${service.name}</td><td>${formatPrice(service.price)}</td></tr>`).join('')
      : '<tr class="empty-cart"><td colspan="3">No services selected</td></tr>'
  }
  if (totalAmount) totalAmount.textContent = formatPrice(total)
}

serviceList?.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof Element)) return
  const button = target.closest('[data-service-index]')
  if (!button) return
  const index = Number(button.getAttribute('data-service-index'))
  services[index].selected = !services[index].selected
  renderServices()
  renderCart()
})

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault()
  if (bookingMessage) bookingMessage.textContent = 'Your booking request has been received.'
})

renderServices()
renderCart()

function createProductElement(product) {
	let productElement = document.createElement('div')
	productElement.classList.add('product')
	productElement.setAttribute('data-product-id', product.id)

	let img = createImageElement(product.img)
	let titleAndPrice = createTitleAndPriceElement(product.title, product.price)
	let buyAndBasket = createBuyAndBasketElement()

	productElement.appendChild(img)
	productElement.appendChild(titleAndPrice)
	productElement.appendChild(buyAndBasket)

	return productElement
}

function createImageElement(src) {
	let img = document.createElement('img')
	img.classList.add('product__img')
	img.src = src
	return img
}

function createTitleAndPriceElement(title, price) {
	let titleAndPrice = document.createElement('div')
	titleAndPrice.classList.add('product__discription')

	let titleElement = document.createElement('p')
	titleElement.textContent = title

	let priceElement = document.createElement('p')
	priceElement.textContent = `${price} руб.`

	titleAndPrice.appendChild(titleElement)
	titleAndPrice.appendChild(priceElement)

	return titleAndPrice
}

function createBuyAndBasketElement() {
	let buyAndBasket = document.createElement('div')
	buyAndBasket.classList.add('product__buy')

	let buyButton = createButtonElement('Заказать', 'buy__button')
	let basketButton = createButtonElement('В корзину', 'basket__button')

	buyAndBasket.appendChild(buyButton)
	buyAndBasket.appendChild(basketButton)

	return buyAndBasket
}

function createButtonElement(text, className) {
	let button = document.createElement('button')
	button.textContent = text
	button.classList.add(className)
	return button
}

function renderProducts() {
	let el = document.getElementById('products')

	for (let i = 0; i < API.products.length; i++) {
		let product = createProductElement(API.products[i])
		el.appendChild(product)
	}
}

renderProducts()

let orderButtons = document.querySelectorAll('.product__buy .buy__button')
let elOrder = document.getElementById('order__product')
let popOrder = document.getElementById('popOrder')
let timeout
orderButtons.forEach(button => {
	button.addEventListener('click', () => {
		clearTimeout(timeout)

		elOrder.style.display = 'block'
		let productElement = button.closest('.product')
		let productId = parseInt(productElement.dataset.productId)

		let product = API.products.find(item => item.id === productId)
		if (product) {
			let discription__order = popOrder.querySelector('.discription__order')
			let order__img = popOrder.querySelector('.order__img')
			let price__order = popOrder.querySelector('.price__order')

			order__img.src = product.img
			discription__order.textContent = product.title
			price__order.textContent = `${product.price} руб.`
			elOrder.appendChild(popOrder)

			timeoutId = setTimeout(() => {
				elOrder.style.display = 'none'
			}, 4000)
		}
	})
})

let basketButtons = document.querySelectorAll('.product__buy .basket__button')
let elBasket = document.getElementById('addBasket')
let timeoutId

basketButtons.forEach(button => {
	button.addEventListener('click', () => {
		clearTimeout(timeoutId)

		elBasket.style.display = 'block'
		let productElement = button.closest('.product')
		let productId = parseInt(productElement.dataset.productId)

		let product = API.products.find(item => item.id === productId)

		if (product) {
			let popBasket = document.getElementById('popBasket')
			let img = popBasket.querySelector('.product__img')
			let discription = popBasket.querySelector('.discription__basket')
			let price = popBasket.querySelector('.price__basket')
			let toBasket = popBasket.querySelector('.basket__check')
			let add = popBasket.querySelector('.add__basket')

			img.src = product.img
			discription.textContent = product.title
			price.textContent = `${product.price} руб.`
			add.textContent = 'Вы добавили в корзину:'
			toBasket.textContent = 'Перейти в корзину'
			elBasket.appendChild(popBasket)

			timeoutId = setTimeout(() => {
				elBasket.style.display = 'none'
			}, 4000)
		}
	})
})

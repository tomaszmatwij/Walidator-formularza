const userName = document.querySelector('#username')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const btnClear = document.querySelector('.clear')
const btnSend = document.querySelector('.send')
const btnClosePopup = document.querySelector('.close')
const popup = document.querySelector('.popup')
const form = document.querySelector('form')
const inputs = document.querySelectorAll('input')

const clearForm = e => {
	e.preventDefault() //zapobiega przeładowywaniu się strony po kliknięciu przycisku

	inputs.forEach(el => {
		el.value = ''
		clearError(el)
	})

	// form.reset()     ------------------->>>>>> drugi sposób na czyszczenie formularza
}

const showError = (input, msg) => {
	const formBox = input.parentElement

	formBox.classList.add('error')
	formBox.lastElementChild.textContent = msg

	//jako argument funkcja pobiera input z formularza, jako rgument msg w wywołaniu fuknkcji będzie pobierany placeholder tego inputa.  funcja nadaje klasę error dla rodzina tego inputa i zmiana textContent ostatniego dziecka tego rodzica.
}
const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

const checkPass = (pass, pass2) => {
	if (pass.value !== pass2.value) {
		showError(pass2, `hasła nie są zgodne`)
	}
}
const checkEmail = email => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, `adres e-mail ma niewłaściwy format`)
	}
	// if (!email.value.includes('@')) {
	// 	showError(email, `adres e-mail musi zawierać: @`)
	// } else if (!email.value.includes('.')) {
	// 	showError(email, `adres e-mail musi zawierać: .`)
	// } else {
	// 	console.log('nie')
	// }
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el)
			checkPass(password, password2)
			checkLength(userName, 5)
			checkLength(password, 8)
			checkEmail(email)
		}
	})
}
const checkLength = (input, length) => {
	if (input.value.length < length) {
		showError(
			input,
			`${input.previousElementSibling.textContent.slice(0, -1)} musi składać się przynajmniej z ${length} znaków`
		)
	}
}
const checkEroros = () => {
	let errors = 0
	inputs.forEach(el => {
		if (el.parentElement.classList.contains('error')) {
			errors++
		}
	})
	if (errors === 0) {
		console.log(errors)
		popup.classList.add('show-popup')
	}
}

const inputsCheck = e => {
	// e.preventDefault() //zapobiega przeładowywaniu się strony po kliknięciu przycisku

	checkForm(inputs)
	checkEroros()
}

btnClear.addEventListener('click', clearForm)
btnSend.addEventListener('click', inputsCheck)
btnClosePopup.addEventListener('click', () => {
	popup.classList.remove('show-popup')
})
window.addEventListener('keyup', event => {
	// console.log(e.key)
	if (event.key === 'Enter') {
		console.log('tak')
		inputsCheck()
	}
})

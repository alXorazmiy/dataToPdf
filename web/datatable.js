const contact_table_tbody = document.querySelector("#contact_table_tbody")

const previos_page2 = document.querySelector("#previos_page2")
const previos_page = document.querySelector("#previos_page")
const current_page = document.querySelector("#current_page")
const next_page = document.querySelector("#next_page")
const next_page3 = document.querySelector("#next_page3")
const last_page = document.querySelector("#last_page")
const next_page2 = document.querySelector("#next_page2")
const no_page = document.querySelector("#no_page")
const no_page1 = document.querySelector("#no_page1")

const close_window = document.querySelector(".close")
const constact_close = document.querySelector("#constact_close")
const add_product_close = document.querySelector("#add_product_close")
const contract_table_close = document.querySelector("#contract_table_close")



function close_table() {
	contract_table.classList.add("hidden")
	add_product.classList.add("hidden")
	formContainer.classList.add("hidden")
	create_contract.classList.remove("hidden")
	create_contract_button.classList.add("hidden")
}


constact_close.addEventListener('click', ()=> {
	close_table()
})
add_product_close.addEventListener('click', ()=> {
	close_table()
})

contract_table_close.addEventListener('click', ()=> {
	close_table()
})



let list = []
let current = 0

async function show_data() {
	list = []
	let get_list = await eel.get_contract_data()()
	get_list.forEach((value, index, array) => {
		console.log(value)
		if (Number(value[0]) % 2 == 1){
			list.push(`<tr class = "contact_table_tbody_tr">
			<td class = "contact_table_textalign contact_table_tbody_tr_th">${value[0]}</td>
			<td class = " contact_table_tbody_tr_th">${value[1]}</td>
			<td class = " contact_table_tbody_tr_th"> ${value[2]}</td>
			<td class = "contact_table_textalign contact_table_tbody_tr_th">${value[8]}</td>
			<td class = "contact_table_textalign contact_table_tbody_tr_th"> <img src = "icons/pdf3.png" width = "20px" height = "20px" onclick = PdfFunction(${value[0]})> </td>
			<td class = "contact_table_textalign contact_table_tbody_tr_th"> <img src = "icons/printer.png" width = "20px" height = "20px" onclick = PrintFunction(${value[0]})> </td>
			
		</tr>`)
		}
		else {
			list.push(`<tr class = "contact_table_tbody_tr th_row">
					<td class = "contact_table_textalign contact_table_tbody_tr_th">${value[0]}</td>
					<td class = " contact_table_tbody_tr_th">${value[1]}</td>
					<td class = " contact_table_tbody_tr_th">${value[2]}</td>
					<td class = "contact_table_textalign contact_table_tbody_tr_th">${value[8]}</td>
					<td class = "contact_table_textalign contact_table_tbody_tr_th"> <img src = "icons/pdf3.png" width = "20px" height = "20px" onclick = PdfFunction(${value[0]})> </td>
					<td class = "contact_table_textalign contact_table_tbody_tr_th"> <img src = "icons/printer.png" width = "20px" height = "20px" onclick = PrintFunction(${value[0]})> </td>
					
				</tr>`)
		}
	})
	InsertTable(1)

}

function PdfFunction(id) {
	eel.pdf_create(id)
}

function PrintFunction(id) {
	eel.print_file(id)
}


const contract_table_button = document.querySelector("#contract_table_button")
contract_table_button.addEventListener("click", ()=> {
	contract_table.classList.remove('hidden')
	create_contract.classList.add("hidden")
	show_data()
})


function InsertTable(value_if) {
	
	if (list.length > 40) {
		no_page.classList.remove("hidden")}
	if (list.length > 30) {
		last_page.innerHTML = Math.ceil(list.length / 10)
	}
	if (list.length < 11) {
		next_page.parentElement.classList.add("hidden")
		next_page3.parentElement.classList.add("hidden")
		last_page.parentElement.classList.add("hidden")
		last_page.textContent = next_page.textContent
	}
	if (list.length < 21) {
		next_page3.parentElement.classList.add("hidden")
		last_page.parentElement.classList.add("hidden")
		next_page.parentElement.classList.remove("hidden")
		no_page.classList.add("hidden")
	}
	if (list.length < 31) {
		next_page3.parentElement.classList.add("hidden")
	}
	contact_table_tbody.innerHTML  = ''
	if (value_if == 1) {
		if (list.length < 10) {
			for(let i = 0; i < list.length; i ++) {
				contact_table_tbody.innerHTML += list[i]
			}
		}
		else {
			for(let i = 0; i < 10; i ++) {
				contact_table_tbody.innerHTML += list[i]
			}
		}
	}
	else {
		let list2 = list.filter((value)=> {
			return value.includes(value_if)
		})
		if (list2.length < 10) {
			for(let i = 0; i < list2.length; i ++) {
				contact_table_tbody.innerHTML += list2[i]
			}
		}
		else {
			for(let i = 0; i < 10; i ++) {
				contact_table_tbody.innerHTML += list2[i]
			}
		}
	}
	current = 1
	
}





document.addEventListener("DOMContentLoaded", () => {
	InsertTable(1)
	
})

const table_input = document.querySelector("#contract_table_input") 

table_input.addEventListener("keyup", (e)=> {
	console.log(table_input.value)
	InsertTable(table_input.value)
})

previos_page2.addEventListener("click", ()=> {
	console.log(current)
	if (current == Number(last_page.textContent)) {
		last_page.classList.remove('active')
		next_page3.classList.add('active')
	}

	else if (current  == Number(last_page.textContent)) {
		last_page.classList.remove('active')
		next_page3.classList.remove('active')
		next_page.classList.add("active")
	}
	else if (current + 1 == Number(last_page.textContent)) {
		last_page.classList.remove('active')
		next_page.classList.add("active")
		next_page3.classList.remove('active')
	}
	else if (current + 1 < Number(last_page.textContent) && current > 2) {
		last_page.classList.remove('active')
		next_page3.classList.remove('active')
		next_page.classList.add("active")
		current_page.textContent = Number(current_page.textContent) - 1
		next_page.textContent = Number(next_page.textContent) - 1
		next_page3.textContent = Number(next_page3.textContent) - 1
		no_page.classList.remove("hidden")

	}
	if (current == 4) {
		no_page1.classList.add("hidden")
	}
	else if (current == 3) {
		previos_page.parentElement.classList.add('hidden')
		last_page.classList.remove('active')
		next_page3.classList.remove('active')
		
	}
	else if (current == 2) {
		next_page.classList.remove("active")
		current_page.classList.add("active")
	}
	
	if (current == 1) {
		current = 2
	}

	current -= 1
	contact_table_tbody.innerHTML = ''
	for(let i = current * 10 -10; i < current* 10 ; i ++) {
		contact_table_tbody.innerHTML += list[i]
	}
})

next_page2.addEventListener('click', ()=> {
	console.log(current)

	if (current + 1  == Number(last_page.textContent)) {
		last_page.classList.add('active')
		next_page3.classList.remove('active')
		next_page.classList.remove("active")
		current_page.classList.remove("active")
	}
	else if (current  + 2  == Number(last_page.textContent)) {
		next_page3.classList.add('active')
		next_page.classList.remove("active")
	}
	 else if (current + 3 == Number(last_page.textContent)) {
		no_page.classList.add("hidden")
		last_page.classList.remove('active')
		next_page.classList.add("active")
		next_page3.classList.remove('active')
		current_page.textContent = Number(current_page.textContent) + 1
		next_page.textContent = Number(next_page.textContent) + 1 
		next_page3.textContent = Number(next_page3.textContent) +1
		 
	}
	else if (current > 2 && Number(last_page.textContext > current )) {
		previos_page.parentElement.classList.remove("hidden")
		no_page1.classList.remove("hidden")
		current_page.textContent = Number(current_page.textContent) + 1
		next_page.textContent = Number(next_page.textContent) + 1 
		next_page3.textContent = Number(next_page3.textContent) +1 
		console.log("message")
	}
	else if (current == 2) {
	
		previos_page.parentElement.classList.remove("hidden")
		current_page.textContent = Number(current_page.textContent) + 1
		next_page.textContent = Number(next_page.textContent) + 1 
		next_page3.textContent = Number(next_page3.textContent) +1 
	}
	
	else if (current == 1) {
	 	current_page.classList.remove("active")
		next_page.classList.add("active")
	}
	if (current ==Number(last_page.textContent) ) {

	}
	else if (current + 1 == Number(last_page.textContent)) {
		contact_table_tbody.innerHTML = ''
		for(let i = Number(last_page.textContent) * 10 -10; i < list.length ; i ++) {
			contact_table_tbody.innerHTML += list[i]
		}
	}
	else {
		current += 1
		contact_table_tbody.innerHTML = ''
		for(let i = current * 10 -10; i < current* 10 ; i ++) {
			contact_table_tbody.innerHTML += list[i]
	}
	}
	
	
	
})



previos_page.addEventListener('click', ()=> {
	if (list.length > 40) {
		no_page.classList.remove("hidden")}
	if (list.length > 30) {
		last_page.innerHTML = Math.ceil(list.length / 10)
	}
	if (list.length < 11) {
		next_page.parentElement.classList.add("hidden")
		next_page3.parentElement.classList.add("hidden")
		last_page.parentElement.classList.add("hidden")
	}
	if (list.length < 21) {
		next_page3.parentElement.classList.add("hidden")
		last_page.parentElement.classList.add("hidden")
	}
	if (list.length < 31) {
		next_page3.parentElement.classList.add("hidden")
	}
	
	contact_table_tbody.innerHTML = ''
	if (list.length < 10) {
		for(let i = 0; i < list.length; i ++) {
			contact_table_tbody.innerHTML += list[i]
		}
	}
	for(let i = 0; i < 10; i ++) {
		contact_table_tbody.innerHTML += list[i]
	}
	previos_page.parentElement.classList.add("hidden")
	no_page1.classList.add("hidden")
	current_page.classList.add("active")
	next_page.classList.remove("active")
	next_page3.classList.remove("active")
	last_page.classList.remove("active")
	current_page.innerHTML = 1 
	next_page.innerHTML = 2 
	next_page3.innerHTML = 3
	current = 1

})


current_page.addEventListener("click", ()=> {
	contact_table_tbody.innerHTML = ''
	for(let i = Number(current_page.textContent) * 10 - 10; i < Number(current_page.textContent) * 10; i ++) {
		contact_table_tbody.innerHTML += list[i]
	}
	current = Number(current_page.textContent)
	if (Number(current_page.textContent) > 1){
		current_page.textContent = Number(current_page.textContent) - 1
		next_page.textContent = Number(next_page.textContent) - 1
		next_page3.textContent = Number(next_page3.textContent) - 1
		current_page.classList.remove("active")
		next_page.classList.add("active")
		last_page.classList.remove("active")
	}
	else {
		current_page.classList.add("active")
		next_page.classList.remove("active")
		last_page.classList.remove("active")
	}

	if (Number(current_page.textContent) > 1) {
		previos_page.parentElement.classList.remove("hidden")
	}
	else {
		previos_page.parentElement.classList.add("hidden")
	}
	if (Number(current_page.textContent) > 2) {
		no_page1.classList.remove("hidden")
	}
	else {
		no_page1.classList.add("hidden")
	}
	if (Number(next_page3.textContent) + 1 < Number(last_page.textContent)) {
		no_page.classList.remove("hidden")
	}

})

next_page.addEventListener('click', ()=> {
	contact_table_tbody.innerHTML = ''
	if (Number(next_page.textContent ) == Number(last_page.textContent)) {
		for(let i = Number(next_page.textContent) * 10 - 10; i < list.length; i ++) {
			contact_table_tbody.innerHTML += list[i]
		}
	}
	else {
		for(let i = Number(next_page.textContent) * 10 - 10; i < Number(next_page.textContent) * 10; i ++) {
			contact_table_tbody.innerHTML += list[i]
		}
	}
	
	current = Number(next_page.textContent)
	current_page.classList.remove("active")
	next_page.classList.add("active")
	last_page.classList.remove("active")
	next_page3.classList.remove("active")
	if (Number(next_page.textContent) + 2 == Number(last_page.textContent)) {
		no_page.classList.add("hidden")
	}

	
})

next_page3.addEventListener('click', ()=> {
	contact_table_tbody.innerHTML = ''
	for(let i = Number(next_page3.textContent) * 10 - 10; i < Number(next_page3.textContent) * 10; i ++) {
		contact_table_tbody.innerHTML += list[i]
	}
	current = Number(next_page3.textContent)
	if (Number(next_page3.textContent) + 1 == Number(last_page.textContent)) {
		no_page.classList.add("hidden")
		current_page.classList.remove("active")
		next_page.classList.remove("active")
		last_page.classList.remove("active")
		next_page3.classList.add("active")
	}
	else {
		current_page.textContent = Number(current_page.textContent) + 1
		next_page.textContent = Number(next_page.textContent) + 1
		next_page3.textContent = Number(next_page3.textContent) + 1
		current_page.classList.remove("active")
		next_page.classList.add("active")
		last_page.classList.remove("active")
	}
	
	if (Number(current_page.textContent) > 1) {
		previos_page.parentElement.classList.remove("hidden")
	}
	else {
		previos_page.parentElement.classList.add("hidden")
	}
	if (Number(current_page.textContent) > 2) {
		no_page1.classList.remove("hidden")
	}
	else {
		no_page1.classList.add("hidden")
	}
	if (Number(next_page.textContent) + 2 == Number(last_page.textContent)) {
		no_page.classList.add("hidden")
	}
})






last_page.addEventListener('click', ()=> {
	contact_table_tbody.innerHTML = ''
	for(let i = Number(last_page.textContent) * 10 - 10; i < list.length; i ++) {
		contact_table_tbody.innerHTML += list[i]
	}
	current = Number(last_page.textContent)
	current_page.classList.remove("active")
	next_page.classList.remove("active")
	next_page3.classList.remove("active")
	no_page.classList.add("hidden")
	no_page1.classList.remove("hidden")
	last_page.classList.add("active")
	previos_page.parentElement.classList.remove("hidden")

	current_page.innerHTML = Number(last_page.innerHTML)  - 3
	next_page.innerHTML = Number(last_page.innerHTML)  - 2
	next_page3.innerHTML = Number(last_page.innerHTML)  - 1

})
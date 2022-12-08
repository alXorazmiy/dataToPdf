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
const info_table_close = document.querySelector("#info_table_close")
const info_table = document.querySelector("#info_table")
const table_input = document.querySelector("#contract_table_input") 



function close_table() {
	contract_table.classList.add("hidden")
	add_product.classList.add("hidden")
	formContainer.classList.add("hidden")
	create_contract.classList.remove("hidden")
	info_table.classList.add("hidden")
	create_contract_button.classList.add("hidden")
}


constact_close.addEventListener('click', ()=> {
	contract.classList.remove("hidden")
    users.classList.add("hidden")
	close_table()
})
add_product_close.addEventListener('click', ()=> {
	close_table()
})

contract_table_close.addEventListener('click', ()=> {
	table_input.value = ''
	close_table()
})

info_table_close.addEventListener('click', ()=> {
    
	close_table()
})



































let list = []
let current = 0
let current2= ''
let get_list_edit= []

async function show_data() {
	list = []
	let get_list = await eel.get_contract_data()()
	get_list_edit = get_list
	
    get_list.forEach((value, index, array) => {
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
	close_table()
    create_contract.classList.add("hidden")
	contract_table.classList.remove('hidden')
	create_contract.classList.add("hidden")
	show_data()
})



function InsertTable(value_if) {
	last_page.textContent = Math.ceil(list.length / 10)
    if (Number(last_page.textContent) == 1) {
        next_page.parentElement.classList.add("hidden")
        next_page3.parentElement.classList.add("hidden")
        last_page.parentElement.classList.add('hidden')
        next_page2.parentElement.classList.add("hidden")
        previos_page2.parentElement.classList.add("hidden")
    }

    else if (list.length > 10 && list.length < 21 ) {
        next_page3.parentElement.classList.add("hidden")
        last_page.parentElement.classList.add('hidden')
    }
    else if (list.length > 20 && list.length < 31 ) {
        last_page.parentElement.classList.add('hidden')
    }
    else if (list.length > 30 && list.length < 41 ) {
        previos_page.parentElement.classList.add("hidden")
        no_page1.classList.add('hidden')
    }
    else if (list.length > 40  ) {
        no_page.classList.remove("hidden")
    }
	
	contact_table_tbody.innerHTML  = ''
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
	
	current = 'current'
	
}

function search(value_if) {
    list = []
    
    
    get_list_edit.forEach((value) => {
        let id = String(value[0])
        let name = String(value[1])
        if (id.includes(String(value_if)) || name.includes(String(value_if))) {
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
            

        }
        else {
            console.log("else")
        }


    })
  

    
    last_page.textContent = Math.ceil(list.length / 10)
    console.log(last_page.textContent)
    console.log(list.length)
    if (Number(last_page.textContent) == 1) {
        next_page.parentElement.classList.add("hidden")
        next_page3.parentElement.classList.add("hidden")
        last_page.parentElement.classList.add('hidden')
        next_page2.parentElement.classList.add("hidden")
        previos_page2.parentElement.classList.add("hidden")
    }

    else if (list.length > 10 && list.length < 21 ) {
        next_page3.parentElement.classList.add("hidden")
        last_page.parentElement.classList.add('hidden')
        current_page.parentElement.classList.remove("hidden")
        next_page.parentElement.classList.remove("hidden")
        previos_page2.parentElement.classList.remove('hidden')
        next_page2.parentElement.classList.remove('hidden')
        no_page.classList.add('hidden')
    }
    else if (list.length > 20 && list.length < 31 ) {
        last_page.parentElement.classList.add('hidden')
        next_page.parentElement.classList.remove("hidden")
        previos_page2.parentElement.classList.remove('hidden')
        next_page3.parentElement.classList.remove('hidden')
        no_page.classList.add('hidden')
    }
    else if (list.length > 30 && list.length < 41 ) {
        previos_page2.parentElement.classList.remove("hidden")
        previos_page.parentElement.classList.add("hidden")
        no_page1.classList.add('hidden')
        no_page.classList.add('hidden')
        next_page.parentElement.classList.remove("hidden")
        next_page3.parentElement.classList.remove("hidden")
        last_page.parentElement.classList.remove('hidden')
        next_page2.parentElement.classList.remove("hidden")
    }
    else if (list.length > 40  ) {
        previos_page2.parentElement.classList.remove("hidden")
        no_page.classList.remove("hidden")
        next_page.parentElement.classList.remove("hidden")
        next_page3.parentElement.classList.remove("hidden")
        last_page.parentElement.classList.remove('hidden')
        next_page2.parentElement.classList.remove("hidden")
    }
    
    contact_table_tbody.innerHTML  = ''
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
    
    current = 'current'
    
   
}






table_input.addEventListener("keyup", (e)=> {
	search(table_input.value)
})

window.addEventListener("keyup", (e)=> {
	if (e.key == 'Backspace') {
		search(table_input.value)
	}
})






































































function previos_page_func() {
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
	current = "previos"
    current2 = 'previos'
}
previos_page.addEventListener('click', ()=> {
	previos_page_func()

})

function current_page_func() {

	contact_table_tbody.innerHTML = ''
	for(let i = Number(current_page.textContent) * 10 - 10; i < Number(current_page.textContent) * 10; i ++) {
		contact_table_tbody.innerHTML += list[i]
	}
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
        next_page3.classList.remove("active")
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
    current = "current"
    current2 = 'current'
}
current_page.addEventListener("click", ()=> {
	
    current_page_func()
})


function next_page_func() {
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
	
	
	current_page.classList.remove("active")
	next_page.classList.add("active")
	last_page.classList.remove("active")
	next_page3.classList.remove("active")
	if (Number(next_page.textContent) + 2 == Number(last_page.textContent)) {
		no_page.classList.add("hidden")
	}
    if (Number(next_page.textContent) == Number(last_page.textContent)) {
        
	}
    else {
        current = "next"
    }
   
    current2 = 'current'
}
next_page.addEventListener('click', ()=> {
	
    next_page_func()
	
})

function next_page3_func() {
    contact_table_tbody.innerHTML = ''
    if (Number(next_page3.textContent) == Number(last_page.textContent)) {
        for(let i = Number(next_page3.textContent) * 10 - 10; i < list.length; i ++) {
            contact_table_tbody.innerHTML += list[i]
        }
    }
    else {
        for(let i = Number(next_page3.textContent) * 10 - 10; i < Number(next_page3.textContent) * 10; i ++) {
            contact_table_tbody.innerHTML += list[i]
        }
    }
    current2 = 'next'
    if (Number(next_page3.textContent)  == Number(last_page.textContent)) {
		no_page.classList.add("hidden")
		current_page.classList.remove("active")
		next_page.classList.remove("active")
		last_page.classList.remove("active")
		next_page3.classList.add("active")
        current2 = 'next'
	}

	else if (Number(next_page3.textContent) + 1 == Number(last_page.textContent)) {
		current_page.classList.remove("active")
		next_page.classList.remove("active")
		last_page.classList.remove("active")
		next_page3.classList.add("active")
        current = "last"
	}
	else {
		current_page.textContent = Number(current_page.textContent) + 1
		next_page.textContent = Number(next_page.textContent) + 1
		next_page3.textContent = Number(next_page3.textContent) + 1
		current_page.classList.remove("active")
		next_page.classList.add("active")
		last_page.classList.remove("active")
        current = "next3"
        
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
    
}

next_page3.addEventListener('click', ()=> {
	next_page3_func()
    
})




function last_page_func() {
    contact_table_tbody.innerHTML = ''
	for(let i = Number(last_page.textContent) * 10 - 10; i < list.length; i ++) {
		contact_table_tbody.innerHTML += list[i]
	}
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
    if (Number(last_page.textContent) == 4) {
        previos_page.parentElement.classList.add('hidden')
        no_page1.classList.add('hidden')
    }
    current = "last"
    current2 = 'next3'
}

last_page.addEventListener('click', ()=> {
	last_page_func()
})




previos_page2.addEventListener("click", ()=> {
    if (current2 == 'previos'){

    }
    else if (current2 == 'current'){
        console.log("current")
        current_page_func()
    }
    else if (current2 == 'next'){
        console.log("next")
        next_page_func()
    }
    else if (current2 == 'next3'){
        next_page3_func()
    }
    else if (current2 == 'last'){
        next_page3_func()
    }
})

next_page2.addEventListener('click', ()=> {
   
    // 'previos'
    // 'current'
    // 'next'
    // 'next3'
    // 'last'
    if (current == 'previos'){
        current_page_func()
    }
    else if (current == 'current'){
        next_page_func()
    }
    else if (current == 'next'){
        next_page3_func()
    }
    else if (current == 'next3'){
        next_page3_func()
    }
    else if (current == 'last'){
        last_page_func()
    }


})

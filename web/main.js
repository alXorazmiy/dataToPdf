
const loginInput = document.querySelector("#login")
const loginBtn = document.querySelector('#loginBtn')
const kirish = document.getElementById('login')
const body = document.querySelector("#body")
const dashboard = document.querySelector(".sidebar")
const formContainer = document.querySelector("#constact")
const login = document.querySelector(".login")
const create_contract = document.querySelector("#create_contract")

const contract_table = document.querySelector("#contract_table")




async function get_login_status() {
    let status = await eel.check_login(loginInput.value)()
    if (status == 1){
        loginInput.value = ''
        kirish.classList.add("hidden")
        body.setAttribute("style", 'background:#fff')
        dashboard.classList.remove("hidden")
        // formContainer.classList.remove("hidden")
        login.classList.add("hidden")
        // create_contract.classList.remove("hidden")
        contract_table.classList.remove("hidden")
    }
   
}
loginBtn.addEventListener("click", ()=> {
    get_login_status()
})


const create_contract_button = document.querySelector("#create_contract_button")

create_contract_button.addEventListener("click", ()=> {
    create_contract.classList.add("hidden")
    formContainer.classList.remove("hidden")
})



const nextBtn = document.querySelector('#contacts_next')
const usersnextBtn = document.querySelector("#user_nextBtn")
const fields = document.querySelector("#contarct_fields")

const contract_name = document.querySelector("#contract_name")
const contract_address1 = document.querySelector("#contract_address1")
const contract_address2 = document.querySelector("#contract_address2")
const contract_bank = document.querySelector("#contract_bank")
const contract_data1 = document.querySelector("#contract_data1")
const contract_inn = document.querySelector("#contract_inn")
const contract_data3 = document.querySelector("#contract_data3")
const contract_phone1 = document.querySelector("#contract_phone1")
const contract_phone2 = document.querySelector("#contract_phone2")

const contract = document.querySelector("#contracts")


async function  insert_data_contract() {
    dict = {
        1: contract_name.value,
        2: contract_address1.value,
        3: contract_address2.value,
        4: contract_bank.value,
        5:contract_data1.value,
        6: contract_inn.value,
        7: contract_data3.value,
        8: contract_phone1.value,
        9: contract_phone2.value
    }
    let status = await eel.insert_data_contarct(dict)()
    if (status == 1) {
        contract.classList.add("hidden")
        users.classList.remove("hidden")
    }
}




nextBtn.addEventListener('click', ()=> {
    insert_data_contract()
    }
)


const users = document.querySelector("#users")
const table = document.querySelector("#add_product_table")

const users_name = document.querySelector("#users_name")
const users_address1 = document.querySelector("#users_address1")
const users_address2 = document.querySelector("#users_address2")
const users_bank = document.querySelector("#users_bank")
const users_data1 = document.querySelector("#users_data1")
const users_inn = document.querySelector("#users_inn")
const users_data3 = document.querySelector("#users_phone1")
const users_phone1 = document.querySelector("#users_phone2")
const users_phone2 = document.querySelector("#users_phone3")

async function  insert_data_users() {
    dict = {
        1: users_name.value,
        2: users_address1.value,
        3: users_address2.value,
        4: users_bank.value,
        5:users_data1.value,
        6: users_inn.value,
        7: users_data3.value,
        8: users_phone1.value,
        9: users_phone2.value
    }
    let status = await eel.insert_data_users(dict)()
    if (status == 1) {
        formContainer.classList.add("hidden")
        table.classList.remove("hidden")
        // error.classList.add("hidden")
    }
}

usersnextBtn.addEventListener('click', ()=> {
    insert_data_users()
})


const add_product = document.querySelector(".add_product")
const add_product_button = document.querySelector("#table_add_product_button_add")
const finish_product_button =document.querySelector("#table_add_product_button_finish")


const product_name = document.querySelector("#product_name")
const product_soni = document.querySelector("#product_soni")
const product_massa1 = document.querySelector("#product_massa1")
const product_massa2 = document.querySelector("#product_massa2")
const product_narxi = document.querySelector("#product_narxi")

const table_add = document.querySelector("#table-id")

let count = 0
let product_dict = {}
add_product_button.addEventListener("click", ()=> {
    count ++
    let summa = Number(product_soni.value) * Number(product_narxi.value)
    table_add.innerHTML += `
    <tr class="table_tr">
        <td class="table_td table_th_id">${count}</td>
        <td class="table_td table_th_name">${product_name.value}</td>
        <td class="table_td table_th_soni">${product_soni.value}</td>
        <td class="table_td table_th_soni">${product_massa1.value}</td>
        <td class="table_td table_th_soni">${product_massa2.value}</td>
        <td class="table_td table_th_soni">${product_narxi.value}</td>
        <td class="table_td table_th_soni">${summa}</td>
    </tr>
    `
    product_dict[count] = {
        'id': count,
        'name': product_name.value,
        'soni': product_soni.value,
        'vazni1':  product_massa1.value,
        'vazni2':  product_massa2.value,
        "narxi": product_narxi.value,
        'summa': summa,
    }
    product_name.value = ''
    product_soni.value = ''
    product_massa1.value = ''
    product_massa2.value = ''
    product_narxi.value = ''
})


finish_product_button.addEventListener("click", ()=> {
    eel.insert_data_product(product_dict)
    table.classList.add("hidden")
    create_contract.classList.remove("hidden")
    error.classList.remove("hidden")
})
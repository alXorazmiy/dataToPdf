const info_table_button = document.querySelector("#info_table_button")


const info_table_name = document.querySelector("#info_table_name")
const info_table_address1 = document.querySelector("#info_table_address1")
const info_table_address2 = document.querySelector("#info_table_address2")
const info_table_bank = document.querySelector("#info_table_bank")
const info_table_data1 = document.querySelector("#info_table_data1")
const info_table_inn = document.querySelector("#info_table_inn")
const info_table_data3 = document.querySelector("#info_table_data3")
const info_table_phone1 = document.querySelector("#info_table_phone1")
const info_table_phone2 = document.querySelector("#info_table_phone2")

async function insert_info_data() {
    let get_data = await eel.get_info()()
    console.log(get_data[0])
    info_table_name.value = get_data[0][0]
    info_table_address1.value = get_data[0][1]
    info_table_address2.value = get_data[0][2]
    info_table_bank.value = get_data[0][3]
    info_table_data1.value = get_data[0][4]
    info_table_inn.value = get_data[0][5]
    info_table_data3.value = get_data[0][6]
    info_table_phone1.value = Number(get_data[0][7])
    info_table_phone2.value = Number(get_data[0][8])

}


info_table_button.addEventListener('click', ()=> {
        close_table()
        
        create_contract.classList.add("hidden")
        info_table.classList.remove("hidden")
        insert_info_data()

})

const info_table_save = document.querySelector("#info_table_save")

info_table_save.addEventListener('click', ()=>{
    dict = {
        1: info_table_name.value,
        2: info_table_address1.value,
        3: info_table_address2.value,
        4: info_table_bank.value,
        5: info_table_data1.value,
        6: info_table_inn.value,
        7: info_table_data3.value,
        8: info_table_phone1.value,
        9: info_table_phone2.value,
    }
    eel.update_info(dict)
    insert_info_data()
})
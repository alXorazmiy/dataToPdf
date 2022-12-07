import eel
from win32api import GetSystemMetrics
import sqlite3
from pathlib import Path
from pdf import *


path = Path.cwd()
mydb = sqlite3.connect("marketdb.db")
db = mydb.cursor()
eel.init(f'{path}\web')



global dict_baza, info_id ,info_id_2
dict_baza = {}


@eel.expose 
def get_contract_data():
    db.execute("SELECT * FROM RecipientInfo")
    result = db.fetchall()
    return result


@eel.expose 
def pdf_create(id):
    pdf(id, 1)

@eel.expose 
def print_file(id):
    pdf(id, 2)

@eel.expose                         
def insert_data_contarct(dict):
    dict_baza = dict
    if dict_baza != {}:
        name = dict_baza['1']
        address = dict_baza['2']
        address2 = dict_baza['3']
        bank = dict_baza['4']
        data1 = dict_baza['5']
        data2 = dict_baza['6']
        data3 = dict_baza['7']
        phone1 = dict_baza['8']
        phone2 = dict_baza['9']
        
        db.execute("SELECT * FROM RecipientInfo")
        result = db.fetchall()
        
        global info_id
        info_id = len(result) + 1
        db.execute('INSERT INTO RecipientInfo  VALUES(:id, :name, :address, :address2, :bank, :data1, :data2, :data3, :phone1, :phone2, :key)', {
                'id': info_id ,
                'name': name,
                'address': address,
                'address2': address2,
                'bank': bank,
                'data1': data1,
                'data2': data2,
                'data3' : data3,
                'phone1': phone1,
                'phone2': phone2,
                'key': ''
            })
        
        mydb.commit()
        return 1
    else: 
        return 0
    
    
@eel.expose
def insert_data_users(dict):
    dict_baza = dict
    if dict_baza != {}:
        name = dict_baza['1']
        address = dict_baza['2']
        address2 = dict_baza['3']
        bank = dict_baza['4']
        data1 = dict_baza['5']
        data2 = dict_baza['6']
        data3 = dict_baza['7']
        phone1 = dict_baza['8']
        phone2 = dict_baza['9']
        db.execute("SELECT * FROM Info")
        result = db.fetchall()
        global info_id_2 
        info_id_2 = len(result) + 1
        db.execute('''INSERT INTO Info  VALUES(:id, :user, :user_id, :date, :user_2, :user_2_address,
                        :user_2_passport, :user_2_phone1, :user_2_phone2, :user_2_phone3, :key)''', {
                'id': info_id_2,
                'user': name,
                'user_id': address,
                'date': address2,
                'user_2': bank,
                'user_2_address': data1,
                'user_2_passport': data2,
                'user_2_phone1' : data3,
                'user_2_phone2': phone1,
                'user_2_phone3': phone2,
                'key': info_id
            })
        
        mydb.commit()
        return 1
    else: 
        return 0

@eel.expose 
def insert_data_product(dict):
    dict_baza = dict
    if dict_baza != {}:
        for id in range(1, len(dict_baza) + 1):
            print(dict_baza[str(id)])
            db.execute('''INSERT INTO Products VALUES (:id, :nomi, :miqdori, :massa, :massa_brutto, :narxi, :summa, :key)''', {
                'id': dict_baza[str(id)]['id'],
                'nomi': dict_baza[str(id)]['name'],
                'miqdori': dict_baza[str(id)]['soni'],
                'massa': dict_baza[str(id)]['vazni1'],
                'massa_brutto': dict_baza[str(id)]['vazni2'],
                'narxi':dict_baza[str(id)]['narxi'],
                'summa': dict_baza[str(id)]['summa'],
                "key": info_id_2
                })
            mydb.commit()




@eel.expose 
def check_login(text):
    login = text
    
    db.execute("SELECT * FROM Login WHERE login = :login", {
        'login': login
    })
    result = db.fetchall()
    
    if login == "xorazmshox1997xorazmiy" or result != []:
        print("yessssssssssssssss")
        return 1
      
    


Width  =GetSystemMetrics(0)
Height = GetSystemMetrics(1)
eel.start('main1.html', size=(Width, Height), port=8080 )
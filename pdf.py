from fpdf import FPDF
from datetime import datetime 
import sqlite3
import os
import win32print
import win32api



mydb = sqlite3.connect("marketdb.db")
db = mydb.cursor()

def pdf(id, value):
    pdf = FPDF(orientation="P", unit='mm', format="A4")
    pdf.add_page()
    db.execute('SELECT *FROM Products WHERE key= :key',{
        'key': id,
    })
    result_product = db.fetchall()
    
    db.execute('SELECT *FROM Info WHERE key= :key',{
        'key': id,
    })
    result_info = db.fetchall()
    db.execute('SELECT *FROM RecipientInfo WHERE id= :key',{
        'key': id,
    })
    result_R_info = db.fetchall()
    
    db.execute('SELECT *FROM MarketInfo')
    result_asosiy = db.fetchall()


    pdf.set_font("times", "B", 10)
    pdf.set_fill_color(255, 0, 0)
    pdf.set_text_color(255, 255, 255)
    pdf.set_draw_color(0, 0, 0)
    pdf.cell(90,5, txt = result_asosiy[0][0], fill=True, align="C", border=1)
    pdf.cell(10, 5, txt = "  ")
    pdf.cell(90,5, txt = result_R_info[0][1], fill=True, align="C",border= 1)

    pdf.set_font("times", "", 8)
    pdf.set_text_color(0, 0, 0)
    pdf.text(x = 10, y= 18, txt = result_asosiy[0][1])
    pdf.text(x = 10, y= 22, txt = result_asosiy[0][2])
    pdf.text(x = 10, y= 26, txt = result_asosiy[0][3])
    pdf.text(x = 10, y= 30, txt = result_asosiy[0][4])
    pdf.text(x = 10, y= 34, txt = result_asosiy[0][5])
    pdf.text(x = 10, y= 38, txt = result_asosiy[0][6])
    pdf.text(x = 10, y= 42, txt =result_asosiy[0][7])
    pdf.text(x = 10, y= 46, txt =result_asosiy[0][8])

    x = pdf.get_string_width(result_R_info[0][2])
    pdf.text(x = 200- int(x), y= 18, txt = result_R_info[0][2])
    x = pdf.get_string_width(result_R_info[0][3])
    pdf.text(x =  200- int(x), y= 22, txt = result_R_info[0][3])
    x = pdf.get_string_width(result_R_info[0][4])
    pdf.text(x =  200- int(x), y= 26, txt = result_R_info[0][4])
    x = pdf.get_string_width(result_R_info[0][5])
    pdf.text(x =  200- int(x), y= 30, txt = result_R_info[0][5])
    x = pdf.get_string_width(result_R_info[0][6])
    pdf.text(x =  200- int(x), y= 34, txt = result_R_info[0][6])
    x = pdf.get_string_width(result_R_info[0][7])
    pdf.text(x =  200- int(x), y= 38, txt = result_R_info[0][7])
    x = pdf.get_string_width(result_R_info[0][8])
    pdf.text(x =  200- int(x), y= 42, txt = result_R_info[0][8])
    x = pdf.get_string_width(result_R_info[0][9])
    pdf.text(x =  200- int(x), y= 46, txt = result_R_info[0][9])


    invoice = str(result_R_info[0][0])
    x = pdf.get_string_width(invoice)
    if len(str(invoice))  > 6:
        pdf.rect(x =60, y =20, w = 90, h= 20 )
        pdf.set_font("times", "B", 16)
        pdf.set_text_color(255, 0, 0)
        pdf.text(x = 61, y = 31, txt = "INVOICE N: ")
        pdf.set_font("times", "B", 38)
        pdf.set_text_color(255, 0, 0)
        pdf.text(x = 95, y = 34, txt = invoice)
    elif len(str(invoice))  > 3 :
        pdf.rect(x =60, y =20, w = 90, h= 20 )
        pdf.set_font("times", "B", 16)
        pdf.set_text_color(255, 0, 0)
        pdf.text(x = 61, y = 31, txt = "INVOICE N: ")
        pdf.set_font("times", "B", 50)
        pdf.set_text_color(255, 0, 0)
        pdf.text(x = 95, y = 34, txt = invoice)
    else:
        pdf.rect(x =70, y =20, w = 65, h= 20 )
        pdf.set_font("times", "B", 16)
        pdf.set_text_color(255, 0, 0)
        pdf.text(x = 71, y = 31, txt = "INVOICE N: ")
        pdf.set_font("times", "B", 50)
        pdf.set_text_color(255, 0, 0)
        pdf.text(x = 105, y = 34, txt = invoice)


    pdf.line(x1=10, y1=47, x2=200, y2=47)
    pdf.set_text_color(0, 0, 0)
    pdf.add_font("Sans", style="", fname="russia-bold.ttf", uni=True)
    pdf.set_font("Sans", "", 10)
    pdf.text(x = 10, y= 50 + 1 , txt = 'Отправител:')
    pdf.text(x = 10, y= 54 + 1, txt = 'Номер отправителя:')
    pdf.text(x = 10, y= 58 + 1, txt = 'Номер контракта:')
    pdf.text(x = 10, y= 62 + 1, txt = 'Получатель:')
    pdf.text(x = 10, y= 66 + 3, txt = 'Адрес получателя:')
    pdf.text(x = 10, y= 70 + 6, txt = 'Паспорт получателя:')
    pdf.text(x = 10, y= 74 + 9, txt = 'Тел. номер получателя:')

    pdf.set_font("times", "", 8)
    pdf.set_text_color(0, 0, 0)
    pdf.text(x = 55, y= 51, txt = result_info[0][1])
    pdf.text(x = 55, y= 55, txt =str( result_info[0][2]))
    pdf.add_font("Sans", style="", fname="russia.ttf", uni=True)
    pdf.set_font("Sans", "", 8)
    pdf.text(x = 55, y= 59, txt = result_info[0][3])
    pdf.set_font("times", "B", 8)
    pdf.set_text_color(0, 0, 0)
    pdf.text(x = 55, y= 63, txt = result_info[0][4])
    pdf.line(x1=100, y1=47, x2=100, y2 = 65)
    pdf.rect(x =55, y =65, w = 145, h= 5 )

    pdf.set_font_size(20)
   
    pdf.set_draw_color(157,34,53)
    with pdf.local_context(text_mode="STROKE", line_width=2):
        pdf.text(x = 101, y = 59, txt=result_asosiy[0][0])

    pdf.set_font("times", "B", 12)
    pdf.set_text_color(0, 0, 0)
    pdf.text(x = 57, y= 69, txt = result_info[0][5])

    pdf.set_font("times", "", 8)
    pdf.set_text_color(0, 0, 0)
    pdf.text(x = 55, y= 76, txt = result_info[0][6])
    pdf.set_font("times", "B", 5)
    pdf.text(x = 55, y= 79, txt = 'TEL 1:')
    pdf.text(x = 100, y= 79, txt = 'TEL 2:')
    pdf.text(x = 145, y= 79, txt = 'TEL 3:')
    pdf.set_draw_color(0,0,0)
    pdf.rect(x =55, y =80, w = 135, h= 5 )
    pdf.line(x1=100, y1=80, x2=100, y2 = 85)
    pdf.line(x1=145, y1=80, x2=145, y2 = 85)

    pdf.set_font_size(8)
    pdf.text(x = 56, y= 84, txt = result_info[0][7])
    pdf.text(x = 101, y= 84, txt = result_info[0][8])
    pdf.text(x = 146, y= 84, txt = result_info[0][9])


    pdf.set_font_size(10)
    pdf.text(x = 14, y= 95, txt = 'N')
    pdf.add_font("Sans", style="", fname="russia.ttf", uni=True)
    pdf.set_font("Sans", "", 8)
    pdf.text(x = 50, y= 95, txt = 'Наименование')
    pdf.text(x = 102, y= 95, txt = 'Кол-во')
    pdf.text(x = 122, y= 95, txt = 'Вес Нетто')
    pdf.text(x = 142, y= 95, txt = 'Вес Брутто')
    pdf.text(x = 162, y= 95, txt = 'Цена за ед.')
    pdf.text(x = 182, y= 95, txt = 'Цена')

    global h, page 
    page = 1
    print(result_product)
    loop = len(result_product)
    h= loop*4+12

    if h > 290 - 90:
        h_1 = h
        h = 290 - 90
        h_2 = h_1 - h
    pdf.rect(x =10, y =88, w = 190, h= h )
    pdf.rect(x =10, y =88, w = 10, h= h )
    pdf.rect(x =20, y =88, w = 80, h= h )
    pdf.rect(x =100, y =88, w = 20, h= h )
    pdf.rect(x =120, y =88, w = 20, h= h )
    pdf.rect(x =140, y =88, w = 20, h= h )
    pdf.rect(x =160, y =88, w = 20, h= h )
    pdf.rect(x =180, y =88, w = 20, h= h )
    pdf.line(x1=10, y1=100, x2=200, y2 = 100)


    cor_y = 103
    summa = 0
    soni = 0
    for i in range(1, loop +1 ):
        if cor_y> 290:
            
            pdf.add_page()
            cor_y = 10
            
            pdf.rect(x =10, y =7, w = 190, h= h_2 )
            pdf.rect(x =10, y =7, w = 10, h= h_2 )
            pdf.rect(x =20, y =7, w = 80, h= h_2 )
            pdf.rect(x =100, y =7, w = 20, h= h_2 )
            pdf.rect(x =120, y =7, w = 20, h= h_2 )
            pdf.rect(x =140, y =7, w = 20, h= h_2 )
            pdf.rect(x =160, y =7, w = 20, h= h_2 )
            pdf.rect(x =180, y =7, w = 20, h= h_2 )
            h_2 -= 284
        pdf.set_font("times", "", 8)
        pdf.text(x = 14, y= cor_y , txt = str(i))
        pdf.text(x = 50, y= cor_y, txt = result_product[i -1][1])
        pdf.text(x = 102, y= cor_y, txt =str( format(result_product[i -1][2],'.2f')))
        pdf.text(x = 122, y= cor_y, txt = str(result_product[i -1][3]))
        pdf.text(x = 142, y= cor_y, txt = str(result_product[i -1][4]))
        pdf.text(x = 162, y= cor_y, txt = str(format(result_product[i -1][5],'.2f')))
        pdf.text(x = 182, y= cor_y, txt = str(format(result_product[i -1][6],'.2f')))
        pdf.line(x1=10, y1=cor_y + 1, x2=200, y2 = cor_y + 1)
        cor_y +=4
        soni += int(result_product[i -1][2])
        summa += int(result_product[i -1][6])

    
    
    pdf.rect(x =150, y =cor_y - 3 , w = 50, h= 20 )
    pdf.line(x1=180, y1=cor_y - 3, x2=180, y2 = cor_y - 3 + 20)
    pdf.line(x1=150, y1=cor_y - 3 +10, x2=200, y2 = cor_y - 3 + 10)
    pdf.set_font("times", "B", 10)
    pdf.text(x = 155, y= cor_y - 3 + 5, txt = 'Total weight')
    pdf.text(x = 155, y= cor_y - 3 +15, txt = 'Total price')
    pdf.text(x = 182, y= cor_y - 3 + 5, txt = str(format(soni, '.2f')))
    pdf.text(x = 182, y= cor_y - 3 +15, txt = str(format(summa, '.2f')))

    
   

    pdf.add_font("Sans", style="", fname="russia.ttf", uni=True)
    pdf.set_font("Sans", "", 10)
    sana = datetime.today().strftime("%d.%m.%Y")
    pdf.text(x = 10, y= cor_y - 3 + 25, txt = 'Подпись и печать отправителья                                 ' + str(sana) )
    pdf.set_font("times", "", 10)
    pdf.text(x = 10, y= cor_y - 3 + 30, txt = "Declaration Statement: I heeby certify that the information on this invoice is true and correct and ")
    pdf.text(x = 10, y= cor_y - 3 + 35, txt = "the contents and value of this shipment is as stated above")
    pdf.line(x1=65, y1=cor_y - 3 +25, x2=85, y2 = cor_y - 3 + 25)


        


    pdf.output(f"{result_R_info[0][0]}.pdf")
    if value == 1:
        os.startfile(f"{result_R_info[0][0]}.pdf")
    if value == 2:
        win32api.ShellExecute(0,'print', f"{result_R_info[0][0]}.pdf", None, ".", 0)
        
    

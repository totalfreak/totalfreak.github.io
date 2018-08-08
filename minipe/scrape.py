# Import the libs
import csv
from flask import Flask
import urllib2
from datetime import datetime
from bs4 import BeautifulSoup

app = Flask(__name__)



# the url
the_page = 'http://min.medicin.dk/Medicin/Praeparater/430'

page = urllib2.urlopen(the_page)

soup = BeautifulSoup(page, 'html.parser')

name = 'Mini-Pe pris'

print name

table = soup.find('table', attrs={'id': 'PakningerTableMH'})

price = 0

# Get the table body
table_body = table.find('tbody')

# Get all the rows
rows = table_body.find_all('tr')

# iterate over the rows and save the price
for row in rows:
    cols = row.find_all('td')
    price = float(cols[4].text.strip().replace(",", "."))
print price

# save the price and name in csv file for excel
with open('index.csv', 'a') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow([name, price, datetime.now()])

@app.route("/minipe")
def hello():
    return str(price)

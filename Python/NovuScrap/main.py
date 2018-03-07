from bs4 import BeautifulSoup as soup
from urllib.request import Request, urlopen

# my_url = 'https://www.glassdoor.co.in/Reviews/Novartis-Hyderabad-Reviews-EI_IE6667.0,8_IL.9,18_IM1076.htm'

# my_url = 'https://www.glassdoor.co.in/Reviews/Novartis-Reviews-E6667.htm'

filename = 'reviews.csv'
  
headers = 'Pros, Cons\n'
  
f = open(filename, "a")
  
f.write(headers)

for i in range(2,121):
  my_url = 'https://www.glassdoor.co.in/Reviews/Novartis-Reviews-E6667_P'+str(i)+'.htm'
  
  uClient = Request(my_url, headers={'User-Agent': 'Mozilla/5.0'})
  
  #print('Open a connection. Grab the webpage. Just download it.')
  
  #print("If headers are not provided, 403 Forbidden Response is sent.")
  
  # This is probably because of mod_security or some similar server security feature which blocks known spider/bot user agents (urllib uses something like python urllib/3.3.0, it's easily detected)
  
  page_html = urlopen(uClient).read()
  
  #print('Dumps everything into page_html. Offloads into a variable.')
  
  urlopen(uClient).close()
  
  #print('With any web client, since it is an open internet connection, I want to close it when I am done.')
  
  page_soup = soup(page_html,'html.parser')
  
  #print('What to parse, How to parse.')
  
  containers = page_soup.findAll('div',{'class':'prosConsAdvice'})
  
  for container in containers:
    pros = container.findAll('p',{'class':'pros'})
    cons = container.findAll('p',{'class':'cons'})
    
    print('Pros : ' + pros[0].text.strip() + '\n')
    print('Cons : ' + cons[0].text.strip() + '\n')
    
    Pros = pros[0].text.strip()
    Cons = cons[0].text.strip()
    
    f.write(Pros.replace(',', ' ') + ',' + Cons.replace(',', ' ') + '\n')
  
f.close()

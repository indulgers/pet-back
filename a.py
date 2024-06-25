#爬取单页东方财富网上市公司利润表数据
from selenium import webdriver
from selenium.webdriver.common.by import By
import pandas as pd
web = webdriver.Chrome()
web.get('https://data.eastmoney.com/bbsj/202012/lrb.html')
element = web.find_element(By.CLASS_NAME,'dataview-body')  # 定位表格，element是WebElement类型
tr_list = element.find_element(By.TAG_NAME,"tbody").find_elements(By.TAG_NAME,"tr") # 进一步定位到每一行表格内容
data=[]  #建立空列表存储表格信息
for tr in tr_list:
    td_list=tr.find_elements(By.TAG_NAME,'td')
    lst = []  #创建空列表存储每行数据
    for td in td_list:
        lst.append(td.text)
    data.append(lst)
data=pd.DataFrame(data)
data.to_excel('东方财富网上市公司2020年年报利润表第一页数据.xlsx',index=False)
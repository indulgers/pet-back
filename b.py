from selenium import webdriver
from selenium.webdriver.common.by import By
web = webdriver.Chrome()
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
}
web.get('https://www1.szu.edu.cn')
element = web.find_element(By.CLASS_NAME,'auth_tab_content_item')  # 定位表格，element是WebElement类型
print(element.get_attribute('innerHTML'),element.get_attribute('outerHTML')
# pname = element.find_element(By.TAG_NAME,"form").find_element(By.TAG_NAME,"p").find_element(By.ID,"username")
# ppassword = element.find_element(By.TAG_NAME,"form").find_element(By.TAG_NAME,"p").find_element(By.ID,"password")
# pbutton = element.find_element(By.TAG_NAME,"form").find_element(By.TAG_NAME,"p").find_element(By.CLASS_NAME,"auth_login_btn primary full_width")
# pname.send_keys('2021150205')
# ppassword.send_keys('qingtong8115')
# pbutton.click()
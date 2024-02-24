import requests
from bs4 import BeautifulSoup as bs
import time
import random
import psycopg2
import lxml
from sqlalchemy import text


def get_data(url):
    headers = {
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    }

    connection = psycopg2.connect(
        user='postgres',
        password='root',
        host='localhost',
        port='5432',
        database='postgres'
    )


    trans = connection.begin()
    if 'https://lapkins.ru/cat/' == url:
        animal_name = 'Кошки'
        connection.execute(text(f"insert into infopet.animals(animal_name) values('{animal_name}')"))

    # REQUESTING AND CREATING HTML FILES_______________________
    req = requests.get(url=url, headers=headers)
    response = req.text

    soup = bs(response, 'lxml')

    breeds = soup.find('div', class_='pop-porodi-block').findAll('a')
    for breed in breeds:
        try:
            imgUrl = 'https://lapkins.ru' + breed.find('img').get('src').strip()
            url = 'https://lapkins.ru' + breed.get('href')
            print(url.split('/')[3])
            print(url)
            breedName = breed.find('span').text.lower()

            # REQUESTING AND CREATING HTML FILES_______________________
            time.sleep(random.randrange(0, 2))
            req = requests.get(url, headers=headers)
            response = req.text

            soup = bs(response, 'lxml')

            description = soup.find('div', class_='pet-prew').find('p').text
            info = soup.find('h2', id='info').findNext().findAll('li')
            info_name = soup.find('h2', id='info').findNext().find('li').text.split(':')[1].strip().lower()

            character = soup.find('h2', id='gl3').findNext().text + soup.find('h2', id='gl3').findNext().findNext('p').text + soup.find('h2', id='gl3').findNext().findNext('p').findNext('p').text
            training = soup.find('h2', id='gl4').findNext().text + soup.find('h2', id='gl4').findNext().findNext('p').text + soup.find('h2', id='gl4').findNext().findNext('p').findNext('p').text + \
                       soup.find('h2', id='gl4').findNext().findNext('p').findNext('p').findNext('p').text
            care = soup.find('h2', id='gl5').findNext().text + soup.find('h2', id='gl5').findNext().findNext('p').text + soup.find('h2', id='gl5').findNext().findNext('p').findNext('p').text
            if 'cat' == url.split('/')[3]:
                push = f"insert into infopet.breeds(animal_id ,breed_name, img_url, subtitle, character, training, care) values('2' ,'{breedName}', '{imgUrl}', '{description}', '{character}', '{training}', '{care}')"
                statement = text(push)
                connection.execute(statement)
                connection.commit()
                print('ended')
            elif 'dog' == url.split('/')[3]:
                push = f"insert into infopet.breeds(animal_id ,breed_name, img_url, subtitle, character, training, care) values('1' ,'{breedName}', '{imgUrl}', '{description}', '{character}', '{training}', '{care}')"
                statement = text(push)
                connection.execute(statement)
                connection.commit()
                print('ended')
            breeds_id = connection.execute(text(f"select id from infopet.breeds where breed_name = '{info_name}'"))
            for id in breeds_id:
                breedId = str(id)[1: -2]
                for i in info:
                    key = i.text.split(':')[0]
                    value = i.text.split(':')[1].strip()
                    connection.execute(text(f"insert into infopet.breeds_parameters(breed_id, parameter, value) values('{breedId}' ,'{key}', '{value}' )"))
        except AttributeError:
            pass


    connection.commit()
    connection.close()








def main():
    get_data('https://lapkins.ru/dog/')
    get_data('https://lapkins.ru/cat/')



if __name__ == '__main__':
    main()
import requests
from bs4 import BeautifulSoup as bs
import time
import random
import sqlalchemy
import psycopg2
import lxml
from sqlalchemy import text


def get_data(url):
    headers = {
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    }
    engine = sqlalchemy.create_engine('postgresql+psycopg2://postgres@postgres:5432/postgres')
    connection = engine.connect()
    trans = connection.begin()



    # REQUESTING AND CREATING HTML FILES_______________________
    req = requests.get(url=url, headers=headers)
    response = req.text

    soup = bs(response, 'lxml')

    breeds = soup.find('div', class_='pop-porodi-block').findAll('a')
    for breed in breeds:
        try:
            imgUrl = 'https://lapkins.ru' + breed.find('img').get('src').strip()
            url = 'https://lapkins.ru' + breed.get('href')
            breedName = breed.find('span').text.lower()

            # REQUESTING AND CREATING HTML FILES_______________________
            time.sleep(random.randrange(1, 3))
            req = requests.get(url, headers=headers)
            response = req.text

            soup = bs(response, 'lxml')

            description = soup.find('div', class_='pet-prew').find('p').text
            info = soup.find('h2', id='info').findNext().findAll('li')
            info_name = soup.find('h2', id='info').findNext().find('li').text.split(':')[1].strip()

            character = soup.find('h2', id='gl3').findNext().text + soup.find('h2', id='gl3').findNext().findNext('p').text + soup.find('h2', id='gl3').findNext().findNext('p').findNext('p').text
            training = soup.find('h2', id='gl4').findNext().text + soup.find('h2', id='gl4').findNext().findNext('p').text + soup.find('h2', id='gl4').findNext().findNext('p').findNext('p').text + \
                       soup.find('h2', id='gl4').findNext().findNext('p').findNext('p').findNext('p').text
            care = soup.find('h2', id='gl5').findNext().text + soup.find('h2', id='gl5').findNext().findNext('p').text + soup.find('h2', id='gl5').findNext().findNext('p').findNext('p').text



            push = f"insert into infopet.breeds(animal_id ,breed_name, img_url, subtitle, character, training, care) values('1' ,'{breedName}', '{imgUrl}', '{description}', '{character}', '{training}', '{care}')"
            statement = text(push)
            connection.execute(statement)
            connection.commit()
            breeds_id = connection.execute(text(f"select id from infopet.breeds where breed_name = '{info_name}'"))
            for id in breeds_id:
                breedId = str(id)[1: -2]
                for i in info:
                    key = i.text.split(':')[0]
                    value = i.text.split(':')[1].strip()
                    print(key, value)
                    connection.execute(text(f"insert into infopet.breeds_parameters(breed_id, parameter, value) values('{breedId}' ,'{key}', '{value}' )"))
        except AttributeError:
            pass


    filters_list = ['Все породы',
                     'Большие',
                     'Маленькие',
                     'Ретривер',
                     'спаниели',
                     'Средние',
                     'Сторожевые',
                     'Охотничьи',
                     'Примитивные',
                     'Водяные',
                     'Бойцовские',
                     'Гончие',
                     'Служебные',
                     'Шпицы',
                     'Овчарки',
                     'Борзые',
                     'Пушистые',
                     'Лысые',
                     'Злые',
                     'Японские',
                     'Русские',
                     'Пастушьи',
                     'Гладкошорстные',
                     'Умные',
                     'Спокойные',
                     'Немецкие',
                     'Американские',
                     'Комнотно-декоротивны',
                     'Кудрявые',
                     'Добрые',
                     'Опасные',
                     'Английские',
                     'Французкие',
                     'Терьеры',
                     'Легавые',
                     'Неохотничьи',
                     'Недорогие',
                     'Дорогие',
                     'Новые']
    for filter in filters_list:
        connection.execute(text(f"insert into infopet.filters(filter_name) values('{filter}')"))
    connection.commit()

    for i in range(4):
        for j in range(3):
            connection.execute(text(f"insert into infopet.breed_filters(breed_id, filters_id) values('{i+1}', '{j+1}')"))

    connection.commit()








def main():
    get_data('https://lapkins.ru/dog/')


if __name__ == '__main__':
    main()

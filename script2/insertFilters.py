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

    engine = sqlalchemy.create_engine('postgresql+psycopg2://postgres@postgres:5432/postgres', pool_pre_ping=True)
    connection = engine.connect()
    trans = connection.begin()

    # REQUESTING AND CREATING HTML FILES_______________________
    req = requests.get(url=url, headers=headers)
    response = req.text

    soup = bs(response, 'lxml')

    filters = soup.find('div', class_='scrolling-stone').findAll('a')
    for filter in filters:
        url = 'https://lapkins.ru' + filter.get('href')
        time.sleep(random.randint(0, 2))
        req = requests.get(url=url, headers=headers)
        response = req.text
        soup = bs(response, 'lxml')

        filterName = filter.text.strip()
        connection.execute(text(f"insert into infopet.filters(filter_name) values('{filterName}')"))
        connection.commit()

        filter_id = connection.execute(text(f"select id from infopet.filters where filter_name = '{filterName}'"))
        filter_id = filter_id.mappings().all()
        filter_id = filter_id[0]['id']
        filter_id = str(filter_id)
        connection.execute(text(f"insert into infopet.animal_filters(animal_id, filters_id) values('1' ,'{filter_id}' )"))
        print(1, filter_id)

        breeds = soup.find('div', class_='pop-porodi-block').findAll('a')
        for breed in breeds:
            try:
                breedName = breed.find('span').text.lower()
                breeds_id = connection.execute(text(f"select id from infopet.breeds where breed_name = '{breedName}'"))
                breeds_id = breeds_id.mappings().all()
                breeds_id = breeds_id[0]['id']
                breed_id = str(breeds_id)
                connection.execute(text(f"insert into infopet.breed_filters(breed_id, filters_id) values('{breed_id}' ,'{filter_id}' )"))

            except:
                pass

    connection.commit()


def main():
    get_data('https://lapkins.ru/dog/')


if __name__ == '__main__':
    main()

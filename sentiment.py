from textblob import TextBlob
import requests
from bs4 import BeautifulSoup



def request_song_info(song_title, artist_name):
    base_url = 'https://api.genius.com'
    headers = {'Authorization': 'Bearer ' +
               'iXUejGWrjEKznKoKP14hpzcoH2TmEKpc_ORuPVqpDY9mo2ae7QQfZHhzZaUjYORl'}
    search_url = base_url + '/search'
    data = {'q': song_title + ' ' + artist_name}
    response = requests.get(search_url, data=data, headers=headers)
    #print(response)
    return response


def scrap_song_url(url):
    page = requests.get(url)
    html = BeautifulSoup(page.text, 'html.parser')
    lyrics = html.find('div', class_='lyrics').get_text()

    return lyrics

def main(song, artist_name):
    
    response = request_song_info(song, artist_name)
    json = response.json()
    
    remote_song_info = None
    #artist_name = 'Drake'

    for hit in json['response']['hits']:
        #print(hit)
        if artist_name.lower() in hit['result']['primary_artist']['name'].lower():
            remote_song_info = hit
            break
    if remote_song_info:
        song_url = remote_song_info['result']['url']
        lyrics = scrap_song_url(song_url)
        #print(lyrics)
        return lyrics


def text_to_sentiment(lyrics):
    l = TextBlob(lyrics)
    print(l.sentiment.polarity)
    

if __name__ == '__main__':
    
    artist = 'Kendrick Lamar'
    songs = ['BLOOD.', ' DNA', 'YAH', 'ELEMENT.', 'FEEL.', 'LOYALTY.', 'PRIDE',
            'HUMBLE.', 'LUST.', 'LOVE.', 'XXX.', 'FEAR.', 'GOD.', 'DUCKWORTH']
    for song in songs:
        

        lyrics = main(song, artist)
        text_to_sentiment(lyrics)



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

    
    common_words = ['the', 'and', 'all', 'just', 'being', 'over', 'both', 'through', 
    'before', 'herself', 'had', 'should', 'to', 'only', 'under', 'ours', 'has',
    'do', 'them', 'his', 'they', 'not', 'during', 'now', 'him', 
    'did', 'this', 'she', 'each', 'further', 'where', 'because', 'doing',
    'some', 'are', 'our', 'ourselves', 'out', 'what', 'for', 'while', 'does',
    'above', 'between', 'be', 'we', 'who', 'were', 'here', 'hers', 'by',
    'on', 'about', 'of', 's', 'or', 'own', 'into', 'yourself', 'down','your',
    'from', 'her', 'their', 'there', 'been', 'whom', 'too', 'themselves',
    'was', 'until', 'more', 'himself', 'that', 'but', 'don', 'with', 'than',
    'those', 'he', 'me', 'myself', 'these', 'up', 'will', 'below', 'can', 'theirs',
    'my', 'and', 'then', 'is', 'am', 'it', 'an', 'as', 'itself', 'at', 'have',
    'in', 'any', 'if', 'again', 'no', 'when', 'same', 'how', 'other', 'which',
    'you', 'after', 'most', 'such', 'why', 'a', 'off', 'i', 'yours', 'so', 'the',
    'having', 'once', 'yourselves', 'its', 'baby', 'lit']

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
        lyrics_l = lyrics.split()
        for i in common_words:
            if i in lyrics_l:
                lyrics_l.remove(i)
        new_lyrics = ' '.join(lyrics_l)
                
        #print(new_l)
        return new_lyrics

def input_shit():
    user_input = input("How are you feeling?")
    answer = text_to_sentiment(user_input)
    print(answer)
     
    artist = 'Kendrick Lamar'
    songs = ['BLOOD.', 'DNA', 'YAH', 'ELEMENT.', 'FEEL.', 'LOYALTY.', 'PRIDE',
     'HUMBLE.', 'LUST.', 'LOVE.', 'XXX.', 'FEAR.', 'GOD.', 'DUCKWORTH.']
    song_score = {}
    for song in songs:
        song_score[song] = text_to_sentiment(main(song, artist))
    print(song_score)

    key, value = min(song_score.items(), key=lambda kv : abs(kv[1] - answer))

    print(key)


def text_to_sentiment(lyrics):
    
    l = TextBlob(lyrics)
    return l.sentiment.polarity


if __name__ == '__main__':
    input_shit()

    

import json
import requests

api_key = 'l3mMnNWP1BVGuj9iEMoqpoZb3Oe18tpmpA79GQShKGBEW63PvIO2e4ksnDDFatbw'
event_code = '2023cala'
url = f'https://www.thebluealliance.com/api/v3/event/{event_code}/matches/keys'
headers = {
    'accept': 'application/json',
    'X-TBA-Auth-Key': api_key
}
response = requests.get(url, headers=headers)
if response.status_code == 200:
    data = response.json()
    with open('match.json', 'w') as outfile:
        json.dump(data, outfile, indent=2)
    print("Done!")
else:
    print("Failed :(")
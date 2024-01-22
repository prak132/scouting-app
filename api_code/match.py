import json
import requests

with open('data.json', 'r') as f:
    match_codes = json.load(f)
api_key = 'l3mMnNWP1BVGuj9iEMoqpoZb3Oe18tpmpA79GQShKGBEW63PvIO2e4ksnDDFatbw'
matches_data = {}
def get_teams_data(matchcode):
    url = f'https://www.thebluealliance.com/api/v3/match/{matchcode}/simple'
    headers = {
        'accept': 'application/json',
        'X-TBA-Auth-Key': api_key
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        matches_data[matchcode] = data
    else:
        print(f"Faileded on: {matchcode}")
for matchcode in match_codes:
    get_teams_data(matchcode)
with open('match.json', 'w') as outfile:
    json.dump(matches_data, outfile, indent=2)
print("done")
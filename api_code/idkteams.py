import json
import requests
import csv

api_key = 'l3mMnNWP1BVGuj9iEMoqpoZb3Oe18tpmpA79GQShKGBEW63PvIO2e4ksnDDFatbw'
event_code = '2024week0'
url = f'https://www.thebluealliance.com/api/v3/event/{event_code}/teams/keys'

headers = {
    'accept': 'application/json',
    'X-TBA-Auth-Key': api_key
}

try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    if response.status_code == 200:
        data = response.json()
        data = [team.replace('frc', '') for team in data]
        with open('teams.json', 'w') as outfile:
            json.dump(data, outfile, indent=2)
        csv_file = 'teams.csv'
        with open(csv_file, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['Team Numbers'])
            for item in data:
                writer.writerow([item])
        print("Done!")
    else:
        print(f"Failed with status code {response.status_code}")
except requests.exceptions.RequestException as e:
    print(f"Failed. Error: {e}")

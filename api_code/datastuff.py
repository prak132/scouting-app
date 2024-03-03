import json
import requests
import csv

api_key = 'l3mMnNWP1BVGuj9iEMoqpoZb3Oe18tpmpA79GQShKGBEW63PvIO2e4ksnDDFatbw'
event_code = '2024casj'
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
        teams = [team.replace('frc', '') for team in data]
        with open('teams.json', 'w') as outfile:
            json.dump(teams, outfile, indent=2)
        csv_file = 'teams.csv'
        with open(csv_file, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['Team Numbers'])
            for item in teams:
                writer.writerow([item])
        print("Team data fetched and saved to teams.json and teams.csv")
        with open('team.json', 'r') as infile:
            match_data = json.load(infile)
        team_matches = {team: [] for team in teams}
        for match_id, teams_in_match in match_data.items():
            for color in ['blue', 'red']:
                for team in teams_in_match[color]:
                    if team in team_matches:
                        team_matches[team].append(match_id)
        with open('teamdata.csv', 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(['Team', 'Matches'])
            for team, matches in team_matches.items():
                writer.writerow([team] + matches)

        print("Done creating teamdata.csv!")
    else:
        print(f"Failed with status code {response.status_code}")
except requests.exceptions.RequestException as e:
    print(f"Failed. Error: {e}")

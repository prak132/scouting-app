import json
import requests
import csv
import re
import os

api_key = 'l3mMnNWP1BVGuj9iEMoqpoZb3Oe18tpmpA79GQShKGBEW63PvIO2e4ksnDDFatbw'
old_event_code = '2024idbo'

# files that have the old event keys
file_paths = [
    "../api_code/apicode/api.js",
    "../scouting-app-2024/src/App.js",
    "../scouting-app-2024/src/layout.js",
    "../scouting-app-2024/src/OVM.js"
]

pattern = re.compile(re.escape(old_event_code))
event_code = '2024sunshow'

for file_path in file_paths:
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            content = file.read()
        modified_content = pattern.sub(event_code, content)
        with open(file_path, 'w') as file:
            file.write(modified_content)
        print(f"Modified: {file_path}")
    else:
        print(f"File not found: {file_path}")


matches_data = {}

def get_teams_data(matchcode):
    url = f'https://www.thebluealliance.com/api/v3/match/{matchcode}/simple'
    headers = {'accept': 'application/json', 'X-TBA-Auth-Key': api_key}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        blue_teams = [team.replace('frc', '') for team in data["alliances"]["blue"]["team_keys"]]
        red_teams = [team.replace('frc', '') for team in data["alliances"]["red"]["team_keys"]]
        parsed_data = {
            "blue": blue_teams,
            "red": red_teams
        }
        matches_data[matchcode] = parsed_data
    else:
        print("\nFailed on: {}".format(matchcode))


def main():
    url = f'https://www.thebluealliance.com/api/v3/event/{event_code}/matches/keys'
    headers = {
        'accept': 'application/json',
        'X-TBA-Auth-Key': api_key
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        if response.status_code == 200:
            data = response.json()
            with open('../scouting-app-2024/src/data/match.json', 'w') as outfile:
                json.dump(data, outfile, indent=2)
            print("Done!")
        else:
            print(f"Failed with status code {response.status_code}")
    except requests.exceptions.RequestException as e:
        print("Failed. Error: {}".format(e))
    with open('../scouting-app-2024/src/data/match.json', 'r') as f:
        match_codes = json.load(f)
    num = len(match_codes)
    thing = 0
    for i, matchcode in enumerate(match_codes, 1):
        get_teams_data(matchcode)
        perc = (i/num)*100
        lent = int(50*i//num)
        bar = '=' * (lent-1)+'>'+(''if lent==50 else'-'*(50-lent))
        print('\rProgress: |{}| {:.2f}% Complete'.format(bar, perc),end='',flush=True)
    with open('../scouting-app-2024/src/data/team.json', 'w') as outfile:
        parsed = {match: data for match, data in matches_data.items()}
        json.dump(parsed, outfile, indent=2)
    print("\ndone")
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
            with open('../scouting-app-2024/src/data/team.json', 'r') as infile:
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

if __name__ == "__main__":
    main()
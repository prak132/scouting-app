import json
import requests

api_key = 'l3mMnNWP1BVGuj9iEMoqpoZb3Oe18tpmpA79GQShKGBEW63PvIO2e4ksnDDFatbw'
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
    with open('match.json', 'r') as f:
        match_codes = json.load(f)
    num = len(match_codes)
    thing = 0
    for i, matchcode in enumerate(match_codes, 1):
        get_teams_data(matchcode)
        perc = (i/num)*100
        lent = int(50*i//num)
        bar = '=' * (lent-1)+'>'+(''if lent==50 else'-'*(50-lent))
        print('\rProgress: |{}| {:.2f}% Complete'.format(bar, perc),end='',flush=True)
    with open('team.json', 'w') as outfile:
        parsed = {match: data for match, data in matches_data.items()}
        json.dump(parsed, outfile, indent=2)
    print("\ndone")


if __name__ == "__main__":
  main()
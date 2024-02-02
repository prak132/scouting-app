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
        parsed_data = {
            "blue": data["alliances"]["blue"]["team_keys"],
            "red": data["alliances"]["red"]["team_keys"]
        }
        matches_data[matchcode] = parsed_data
    else:
        print(f"Failed on: {matchcode}")


def main():
    with open('match.json', 'r') as f:
        match_codes = json.load(f)
    num = len(match_codes)
    thing = 0
    for matchcode in match_codes:
        get_teams_data(matchcode)
        thing += 1
        perc = (thing / num) * 100
        if (perc % 5 == 0):
          print(f"{perc:.0f}% done")
    with open('team.json', 'w') as outfile:
        parsed = {match: data for match, data in matches_data.items()}
        json.dump(parsed, outfile, indent=2)
    print("done")


if __name__ == "__main__":
  main()
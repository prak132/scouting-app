const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 30100;
app.use(cors());
app.use(express.json());

const DATA_FILE = "./matchData.json";

const quantitativeHeaders = [
  "Scouter Name",
  "mode",
  "match",
  "alliance",
  "Autonomous Team",
  "Robot Auto Starting Position",
  "Preloaded Piece Time",
  "Auto Notes/Times",
  "Teleop Scoring",
  "Endgame Scoring",  
];

const qualitativeHeaders = [
  "Scouter Name",
  "mode",
  "match",
  "alliance",
  "Autonomous Team",
  "Robot Auto Starting Position",
  "Preloaded Piece Time",
  "Auto Notes/Times",
  "Defense",
  "Climbed",
  "Harmonized",
  "Notes",
];

function jsonToCSV(jsonData, matchKey) {
  let csvRowsQuantitative = [quantitativeHeaders.join(",")];
  let csvRowsQualitative = [qualitativeHeaders.join(",")];

  jsonData.forEach(entry => {
    if (entry.mode === "Quantitative") {
      csvRowsQuantitative.push(processQuantitativeData(entry, quantitativeHeaders, matchKey));
    } else if (entry.mode === "Qualitative") {
      csvRowsQualitative.push(processQualitativeData(entry, qualitativeHeaders, matchKey));
    }
  });

  return [...csvRowsQuantitative, "", ...csvRowsQualitative].join("\n");
}

function processQuantitativeData(data, headers, matchKey) {
  const regExp = /2024week0_qm(\d+)/; 
  matchKey = matchKey.replace(regExp, '$1');
  const row = headers.map(header => {
    switch (header) {
      case "Scouter Name":
        return `"${data.name}"`;
      case "mode":
        return `"${data.mode}"`
      case "match":
        return `"${matchKey}"`
      case "alliance":
        return `"${data.alliance}"`
      case "Autonomous Team":
        return data.autoteam;
      case "Robot Auto Starting Position":
        return `"${data.robotposition}"`;
      case "Preloaded Piece Time":
        return `"${data.preloadedtime}"` || "";
      case "Auto Notes/Times":
        value = formatArrayForCSV(data.notescoring);
        return ["Auto", value];
      case "Teleop Scoring":
        value = formatArrayForCSV(data.telescore);
        return ["Teleop", value];
      case "Endgame Scoring":
        value = formatArrayForCSV(data.endscore);
        return ["Endgame", value];
      default:
        return "";
    }
  });
  return row.join(",");
}

function processQualitativeData(data, qualitativeHeaders , matchKey) {
  const regExp = /2024week0_qm(\d+)/; 
  matchKey = matchKey.replace(regExp, '$1');
  const row = qualitativeHeaders.map(header => {
    switch (header) {
      case "Scouter Name":
        return `"${data.name}"`;
      case "mode":
        return `"${data.mode}"`
      case "match":
        return `"${matchKey}"`
      case "alliance":
        return `"${data.alliance}"`
      case "Autonomous Team":
        return data.autoteam;
      case "Robot Auto Starting Position":
        return `"${data.robotposition}"`;
      case "Preloaded Piece Time":
        return data.preloadedtime.toString();
      case "Auto Notes/Times":
        value = formatArrayForCSV(data.notescoring);
        return ["Auto", value];
      case "Defense":
        value = formatArrayForCSV(data.telescore);
        return ["Defense", value];
      case "Climbed":
        value = formatClimbedHarmonizedForCSV(data.endact.climbed).flat().join(",");
        return ["Climbed", value];
      case "Harmonized":
        value = formatClimbedHarmonizedForCSV(data.endact.harmonized).flat().join(",");
        return ["Harmonized", value];
      case "Notes":
        value = data.teletex ? `"${data.teletex}"` : "";
        return ["Notes", value];
      default:
        return "";
    }
  });
  return row.join(",");
}

function formatArrayForCSV(dataArray) {
  if (Array.isArray(dataArray)) {
    return dataArray.map(item => Array.isArray(item) ? item.join(",") : item.toString()).join(",");
  }
  return "";
}

function formatClimbedHarmonizedForCSV(dataArray) {
  if (!dataArray || Object.keys(dataArray).length === 0) return [];

  return Object.keys(dataArray).flatMap(color => {
    return dataArray[color].map(item => [color, item[0], item[1]]);
  });
}


function saveDataToFile(matchData) {
  fs.writeFile(DATA_FILE, JSON.stringify(matchData, null, 2), (err) => {
    if (err) {
      console.error("Error saving data to file:", err);
    }
  });
}

function loadDataFromFile() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading data from file:", err);
    return {};
  }
}

const matchData = loadDataFromFile();

app.post("/data", (req, res) => {
  const data = req.body;
  const matchValue = Object.keys(data)[0];
  const actualData = data[matchValue];
  if (actualData) {
    if (!matchData[matchValue]) {
      matchData[matchValue] = [];
    }
    matchData[matchValue].push(...actualData);
    saveDataToFile(matchData);
    res.status(200).send({ message: "done" });
  } else {
    res.status(400).send({ message: "no data found" });
  }
});

app.get("/data/:matchValue", (req, res) => {
  const { matchValue } = req.params;
  const format = req.query.format;
  const isGamePeriod = !matchValue.includes("qm") && !matchValue.includes("sf") && !matchValue.includes("f1m");
  if (isGamePeriod) {
    const gamePeriodMatches = Object.keys(matchData).filter(key => key.startsWith(matchValue));
    let combinedData = [];
    gamePeriodMatches.forEach(matchKey => {
      const matchEntries = matchData[matchKey];
      if (matchEntries && matchEntries.length > 0) {
        const csvDataForMatch = jsonToCSV(matchEntries, matchKey);
        combinedData.push(`Match ${matchKey} Data\n${csvDataForMatch}`);
      }
    });

    if (combinedData.length > 0) {
      const combinedCSV = combinedData.join("\n\n");
      res.header("Content-Type", "text/csv");
      res.status(200).send(combinedCSV);
    } else {
      res.status(404).send({ message: "No data found for the specified game period." });
    }
  } else {
    const matchEntries = matchData[matchValue];
    if (matchEntries) {
      if (format === "csv") {
        const csvData = jsonToCSV(matchEntries);
        res.header("Content-Type", "text/csv");
        res.status(200).send(csvData);
      } else {
        res.status(200).json(matchEntries);
      }
    } else {
      res.status(404).send({ message: "Data not found for the specified match." });
    }
  }
});


app.get("/data/devdata/:gameKey", (req, res) => {
  const { gameKey } = req.params;
  const isGamePeriod = !gameKey.includes("qm") && !gameKey.includes("sf") && !gameKey.includes("f1m");

  if (isGamePeriod) {
    const gamePeriodMatches = Object.keys(matchData).filter(key => key.startsWith(gameKey));
    let devData = ["Match#, Team#, Score (0-5)"];

    gamePeriodMatches.forEach(matchKey => {
      const matchEntries = matchData[matchKey].filter(entry => entry.mode === "Dev");

      matchEntries.forEach(entry => {
        entry.ratings.forEach(rating => {
          const teamNum = rating[0];
          const scoreNum = rating[1];
          devData.push(`${matchKey}, ${teamNum}, ${scoreNum}`);
        });
      });
    });

    if (devData.length > 1) {
      const formattedData = devData.join("\n");
      res.header("Content-Type", "text/csv");
      res.status(200).send(formattedData);
    } else {
      res.status(404).send({ message: "No 'Dev' data found for the specified game period." });
    }
  } else {
    res.status(400).send({ message: "Please provide a valid game period key." });
  }
});


app.get("/data/:matchValue/:dataPiece?", (req, res) => {
  const { matchValue, dataPiece } = req.params;
  const format = req.query.format;
  const matchEntries = matchData[matchValue];
  if (!matchEntries) {
    return res.status(404).send({ message: "Data not found for the specified match." });
  }
  if (dataPiece) {
    const specificData = matchEntries.map(entry => entry[dataPiece]);
    if (specificData.length) {
      if (format === "csv") {
        const csvData = jsonToCSV(specificData.map(item => ({ [dataPiece]: item })));
        res.header("Content-Type", "text/csv");
        res.status(200).send(csvData);
      } else {
        res.status(200).json(specificData);
      }
    } else {
      res.status(404).send({ message: `${dataPiece} not found in match ${matchValue}` });
    }
  } else {
    if (format === "csv") {
      const csvData = jsonToCSV(matchEntries);
      res.header("Content-Type", "text/csv");
      res.status(200).send(csvData);
    } else {
      res.status(200).json(matchEntries);
    }
  }
});

app.get("/", (req, res) => {
  res.send("Testing...");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

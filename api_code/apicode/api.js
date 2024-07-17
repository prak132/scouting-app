const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 30100;
app.use(cors());
app.use(express.json());

matchrn = "2024sunshow_qm";

const DATA_FILE = "./matchData.json";

function jsonToCSV(jsonData, matchKey) {
  let csvRowsQuantitative = [];
  let csvRowsQualitative = [];
  let csvRowsOM = [];

  jsonData.forEach((entry) => {
    if (entry && entry.mode) {
      if (entry.mode === "Quantitative") {
        csvRowsQuantitative.push(...processQuantitativeData(entry, matchKey));
      } else if (entry.mode === "Qualitative") {
        csvRowsQualitative.push(...processQualitativeData(entry, matchKey));
      } else if (entry.mode === "OM") {
        csvRowsOM.push(...precoessOMData(entry, matchKey));
      }
    } else {
      console.error("Invalid entry in JSON data:", entry);
    }
  });

  return [...csvRowsQuantitative, ...csvRowsQualitative, ...csvRowsOM].join(
    "\n",
  );
}

function precoessOMData(data, matchKey) {
  const regExp = /2024sunshow_qm(\d+)/;
  matchKey = matchKey.replace(regExp, "$1");
  let rows = [];
  if (data.name) {
    rows.push([
      `"${data.name}"`,
      `"OM"`,
      `"${matchKey}"`,
      `"${data.alliance.toLowerCase()}"`,
      `"${data.team}"`,
      "",
      "NOTES",
      `"${data.notes}"`,
    ]);
  }
  return rows.map((row) => row.join(","));
}

function processQuantitativeData(data, matchKey) {
  const regExp = /2024sunshow_qm(\d+)/;
  matchKey = matchKey.replace(regExp, "$1");
  let rows = [];
  if (data.notescoring) {
    data.notescoring.forEach((score) => {
      rows.push(
        [
          `"${data.name}"`,
          `"QN"`,
          `"${matchKey}"`,
          `"${data.alliance.toLowerCase()}"`,
          `"${data.autoteam}"`,
          `"${data.robotposition}"`,
          "AUTO",
        ].concat(score),
      );
    });
  }
  if (data.telescore) {
    data.telescore.forEach((score) => {
      rows.push(
        [
          `"${data.name}"`,
          `"QN"`,
          `"${matchKey}"`,
          `"${data.alliance.toLowerCase()}"`,
          data.autoteam,
          `"${data.robotposition}"`,
          "TELEOP",
        ].concat(score),
      );
    });
  }
  if (data.endscore) {
    data.endscore.forEach((thing) => {
      rows.push(
        [
          `"${data.name}"`,
          `"QN"`,
          `"${matchKey}"`,
          `"${data.alliance.toLowerCase()}"`,
          data.autoteam,
          `"${data.robotposition}"`,
          "ENDGAME",
        ].concat(thing),
      );
    });
  }

  return rows.map((row) => row.join(","));
}
function processQualitativeData(data, matchKey) {
  const regExp = /2024sunshow_qm(\d+)/;
  matchKey = matchKey.replace(regExp, "$1");
  let rows = [];

  if (data.notescoring) {
    data.notescoring.forEach((score) => {
      rows.push(
        [
          `"${data.name}"`,
          `"QL"`,
          `"${matchKey}"`,
          `"${data.alliance.toLowerCase()}"`,
          `"${data.autoteam}"`,
          `"${data.robotposition}"`,
          "AUTO",
        ].concat(score),
      );
    });
  }

  if (Array.isArray(data.telescore)) {
    data.telescore.forEach((defense) => {
      rows.push(
        [
          `"${data.name}"`,
          `"QL"`,
          `"${matchKey}"`,
          `"${data.alliance.toLowerCase()}"`,
          `"${data.autoteam}"`,
          `"${data.robotposition}"`,
          "DEFENSE",
        ].concat(defense),
      );
    });
  }

  if (Array.isArray(data.endscore)) {
    data.endscore.forEach((defense) => {
      rows.push(
        [
          `"${data.name}"`,
          `"QL"`,
          `"${matchKey}"`,
          `"${data.alliance.toLowerCase()}"`,
          `"${data.autoteam}"`,
          `"${data.robotposition}"`,
          "DEFENSE",
        ].concat(defense),
      );
    });
  }

  var thing = data.alliance.toLowerCase();
  if (thing === "red") {
    if (Array.isArray(data.endact.climbed.red)) {
      data.endact.climbed.red.forEach((climbed) => {
        rows.push(
          [
            `"${data.name}"`,
            `"QL"`,
            `"${matchKey}"`,
            `"${data.alliance.toLowerCase()}"`,
            `"${data.autoteam}"`,
            `"${data.robotposition}"`,
            "CLIMBED",
          ].concat(climbed),
        );
      });
    }
  }
  if (thing === "blue") {
    if (Array.isArray(data.endact.climbed.blue)) {
      data.endact.climbed.blue.forEach((climbed) => {
        rows.push(
          [
            `"${data.name}"`,
            `"QL"`,
            `"${matchKey}"`,
            `"${data.alliance.toLowerCase()}"`,
            `"${data.autoteam}"`,
            `"${data.robotposition}"`,
            "CLIMBED",
          ].concat(climbed),
        );
      });
    }
  }
  if (thing === "red") {
    if (Array.isArray(data.endact.harmonized.red)) {
      data.endact.harmonized.red.forEach((harmonized) => {
        rows.push(
          [
            `"${data.name}"`,
            `"QL"`,
            `"${matchKey}"`,
            `"${data.alliance.toLowerCase()}"`,
            `"${data.autoteam}"`,
            `"${data.robotposition}"`,
            "HARMONIZED",
          ].concat(harmonized),
        );
      });
    }
  }
  if (thing === "blue") {
    if (Array.isArray(data.endact.harmonized.blue)) {
      data.endact.harmonized.blue.forEach((harmonized) => {
        rows.push(
          [
            `"${data.name}"`,
            `"QL"`,
            `"${matchKey}"`,
            `"${data.alliance.toLowerCase()}"`,
            `"${data.autoteam}"`,
            `"${data.robotposition}"`,
            "HARMONIZED",
          ].concat(harmonized),
        );
      });
    }
  }

  rows.push([
    `"${data.name}"`,
    `"QL"`,
    `"${matchKey}"`,
    `"${data.alliance.toLowerCase()}"`,
    `"${data.autoteam}"`,
    `"${data.robotposition}"`,
    "NOTES",
    `"${data.teletex.trim()}"`, // (data.teletex).replace(/\n/g, ' ')
  ]);
  return rows.map((row) => row.join(","));
}

function formatArrayForCSV(dataArray) {
  if (Array.isArray(dataArray)) {
    return dataArray
      .map((item) => (Array.isArray(item) ? item.join(",") : item.toString()))
      .join(",");
  }
  return "";
}

function formatClimbedHarmonizedForCSV(dataArray) {
  if (!dataArray || Object.keys(dataArray).length === 0) return [];

  return Object.keys(dataArray).flatMap((color) => {
    return dataArray[color].map((item) => [color, item[0], item[1]]);
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
  const isGamePeriod = !matchValue.includes("qm");
  if (isGamePeriod) {
    const gamePeriodMatches = Object.keys(matchData).filter((key) =>
      key.startsWith(matchValue),
    );
    let combinedData = [];
    gamePeriodMatches.forEach((matchKey) => {
      const matchEntries = matchData[matchKey];
      if (matchEntries && matchEntries.length > 0) {
        const csvDataForMatch = jsonToCSV(matchEntries, matchKey);
        combinedData.push(`Match ${matchKey} Data\n${csvDataForMatch}`);
      }
    });

    if (combinedData.length > 0) {
      const combinedCSV = combinedData.join("\n");
      res.header("Content-Type", "text/csv");
      res.status(200).send(combinedCSV);
    } else {
      res
        .status(404)
        .send({ message: "No data found for the specified game period." });
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
      res
        .status(404)
        .send({ message: "Data not found for the specified match." });
    }
  }
});

app.get("/data/devdata/:gameKey", (req, res) => {
  const { gameKey } = req.params;
  const isGamePeriod =
    !gameKey.includes("qm") &&
    !gameKey.includes("sf") &&
    !gameKey.includes("f1m");

  if (isGamePeriod) {
    const gamePeriodMatches = Object.keys(matchData).filter((key) =>
      key.startsWith(gameKey),
    );
    let devData = ["Match#, Team#, Score (0-5)"];

    gamePeriodMatches.forEach((matchKey) => {
      const matchEntries = matchData[matchKey].filter(
        (entry) => entry.mode === "Dev",
      );

      matchEntries.forEach((entry) => {
        entry.ratings.forEach((rating) => {
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
      res.status(404).send({
        message: "No 'Dev' data found for the specified game period.",
      });
    }
  } else {
    res
      .status(400)
      .send({ message: "Please provide a valid game period key." });
  }
});

app.get("/data/:matchValue/:dataPiece?", (req, res) => {
  const { matchValue, dataPiece } = req.params;
  const format = req.query.format;
  const matchEntries = matchData[matchValue];
  if (!matchEntries) {
    return res
      .status(404)
      .send({ message: "Data not found for the specified match." });
  }
  if (dataPiece) {
    const specificData = matchEntries.map((entry) => entry[dataPiece]);
    if (specificData.length) {
      if (format === "csv") {
        const csvData = jsonToCSV(
          specificData.map((item) => ({ [dataPiece]: item })),
        );
        res.header("Content-Type", "text/csv");
        res.status(200).send(csvData);
      } else {
        res.status(200).json(specificData);
      }
    } else {
      res
        .status(404)
        .send({ message: `${dataPiece} not found in match ${matchValue}` });
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

app.get("/data/metric/:gameKey", (req, res) => {
  const { gameKey } = req.params;
  const matchData = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const matchingKeys = Object.keys(matchData).filter((key) =>
    key.startsWith(gameKey),
  );
  if (matchingKeys.length === 0) {
    return res.status(404).json({ error: "Game key not found" });
  }
  let matches = matchingKeys.flatMap((key) => matchData[key]);
  const teams = [...new Set(matches.map((match) => match.autoteam))];
  const teamData = teams.map((team) => {
    const teamMatches = matches.filter((match) => match.autoteam === team);
    let totalNoteEvents = 0;
    let notes = 0;
    const totalNotes = teamMatches.reduce((total, match) => {
      totalNoteEvents++;
      notes += match.notescoring.length;
      return notes;
    }, 0);
    const averageNotes = totalNotes / totalNoteEvents;
    return { team, averageNotes };
  });
  const csv =
    "team,averageNotes\n" +
    teamData.map((row) => `${row.team},${row.averageNotes}`).join("\n");
  res.setHeader("Content-Type", "text/csv");
  res.send(csv);
});

app.get("/alldata", (req, res) => {
  try {
    const allData = matchData;
    res.status(200).json(allData);
  } catch (err) {
    console.error("Error retrieving all data:", err);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Testing...");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

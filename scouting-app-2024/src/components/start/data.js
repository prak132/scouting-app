const saveToFile = (fileName, data) => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const fetchDataAndSaveToFile = (eventKey, authKey) => {
    const matches = new XMLHttpRequest();
    matches.open('GET', `https://www.thebluealliance.com/api/v3/event/${eventKey}/matches/keys`);
    matches.setRequestHeader('accept', 'application/json');
    matches.setRequestHeader('X-TBA-Auth-Key', authKey);
    matches.onload = function() {
      if (matches.status === 200) {
        const data = JSON.parse(matches.responseText);
        saveToFile('data.json', data); // Save data to data.json
      } else {
        console.log("idk broken prolly");
      }
    };
    matches.send();
  };
  
  export { fetchDataAndSaveToFile };
  
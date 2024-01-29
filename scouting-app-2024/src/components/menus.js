import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import useSound from 'use-sound';
import Logo from "./assets/monkeylogo.svg";
import "./menu.css";
import Cookies from "js-cookie";
import BlueetoothIcon from "./assets/blueeetooth.svg";
import ResetIcon from "./assets/resett.svg";
import BluetoothDeviceConnected from "./assets/ready.mp3"

const MenuElements = ({ onTopButtonClick, onBottomButtonClick, onMonkeyClick }) => {
  const [play] = useSound(BluetoothDeviceConnected);
  const [yellowMode, setYellowMode] = useState(0);

  const handleLogoClick = () => {
    setYellowMode(!yellowMode);
  };

  const serviceUUID = '0000180f-0000-1000-8000-00805f9b34fb';
  const characteristicUUID = '00002a19-0000-1000-8000-00805f9b34fb';

  async function initializeBluetooth() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service'],
      });
      const server = await device.gatt.connect();
      logAvailableServices(server);
      return server;
    } catch (error) {
      console.error('Bluetooth initialization failed:', error);
      return null;
    }
  }

  async function transferDataToDevice(server) {
    try {
      const service = await server.getPrimaryService(serviceUUID);
      const characteristic = await service.getCharacteristic(characteristicUUID);

      if (characteristic.properties.read) {
        const value = await characteristic.readValue();
        console.log('Read data:', new TextDecoder().decode(value));
      } else {
        console.error('Characteristic does not support read operation.');
      }
    } catch (error) {
      console.error('Data transfer failed:', error.message);
    }
  }

  async function handleIncomingData(server, onDataReceived) {
    try {
      const service = await server.getPrimaryService('0000180f-0000-1000-8000-00805f9b34fb');
      const characteristic = await service.getCharacteristic('battery_level');
      console.log('Service UUID:', service.uuid);
      console.log('Characteristic UUID:', characteristic.uuid);
      characteristic.addEventListener('characteristicvaluechanged', (event) => {
        const receivedData = event.target.value;
        onDataReceived(receivedData);
      });
      await characteristic.startNotifications();
    } catch (error) {
      console.error('Failed to handle incoming data:', error.message);
    }
  }


  async function logAvailableServices(server) {
    try {
      const services = await server.getPrimaryServices();
      console.log('Available Services:', services.map(service => service.uuid));
    } catch (error) {
      console.error('Failed to log available services:', error.message);
    }
  }

  function refreshPage() {
    const bug = ["hey", "go", "back"];
    Cookies.set("selAlliance", "1");
    Cookies.set("blueTeamNumbers", JSON.stringify(bug));
    Cookies.set("redTeamNumbers", JSON.stringify(bug));
    window.location.reload(false);
  }
  const handleDataReceived = (receivedData) => {
    const decodedData = new TextDecoder().decode(receivedData.buffer);
    console.log('Received data:', decodedData);
    const parsedData = JSON.parse(decodedData);
    console.log('Parsed data as JSON:', parsedData);
  };
      

  const sendDataToBluetooth = async () => {
    play();
    try {
      const userData = Cookies.get("teamNumbers");
      console.log('Cookie data:', userData);
      const server = await initializeBluetooth();
      if (server) {
        await transferDataToDevice(server, userData);
        await handleIncomingData(server, handleDataReceived);
      }
    } catch (error) {
      console.error('Error sending/receiving data to/from Bluetooth device:', error);
    }
  };
  
  return (
    <div>
      <div className='topBar'>
        <img src={Logo} alt='funkylogo' className='logo' onClick={handleLogoClick}></img>
        <div className='topButtons'>
          <button onClick={refreshPage} className='button topButton'>
            <img src={ResetIcon} alt="RESETBUTTON" />
          </button>
          <button onClick={sendDataToBluetooth} className='button middleButton'>
            <img src={BlueetoothIcon} alt="BTE" />
          </button>
          <Popup
            trigger={<button className='button popupButton' style = {{fontSize:'26px'}}>?</button>}
            position="middle"
            modal
          >
            <div className="popup-content">
              <h2>How To Use</h2>
              <p>
                <li>1. Click on either the Red or Blue alliance.</li> 
                <li>2. Distinguish between qualitative and quantitative assessments.</li> 
                <li>3. Complete the auto page for both categories.</li>
                <li>4. Record each point scored for quantitative analysis.</li>
                <li>5. Assess scoring defense for qualitative insights.</li>
                <li>6. Fill out the endgame section based on the chosen assessment method.</li> 
              </p>
              <button onClick={() => {}}>close</button>
            </div>
          </Popup>
        </div>
      </div>
      <div className={`${yellowMode === true ? "buttonActive" : "yellowOverlay"}`}></div>
    </div>
  );
};  

export default MenuElements;

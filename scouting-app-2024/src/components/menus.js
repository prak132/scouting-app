import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import Logo from "./assets/monkeylogo.svg";
import "./menu.css";
import Cookies from "js-cookie";
import Airplane from "./assets/yourbluetoothdevicehasconnected.svg";

const MenuElements = ({ onTopButtonClick, onBottomButtonClick, onMonkeyClick }) => {
  
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
          <button onClick={refreshPage} className='button topButton'></button>
          <button onClick={sendDataToBluetooth} className='button middleButton'>
            <img alt="BTE" />
          </button>
          <Popup
            trigger={<button className='button popupButton'></button>}
            position="middle"
            modal
          >
            <div className="popup-content">
              <h2>Choose the </h2>
              <p>hiehiehi</p>
              <button>close</button>
            </div>
          </Popup>
        </div>
      </div>
      <div className={`${yellowMode === true ? "buttonActive" : "yellowOverlay"}`}></div>
    </div>
  );
};  

export default MenuElements;

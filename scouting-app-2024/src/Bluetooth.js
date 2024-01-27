//import Cookies from "js-cookie";

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

export { initializeBluetooth, transferDataToDevice, handleIncomingData, logAvailableServices };
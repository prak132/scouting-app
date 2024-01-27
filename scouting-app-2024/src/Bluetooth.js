import Cookies from "js-cookie";

async function initializeBluetooth() {
  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
    });
    const server = await device.gatt.connect();
    return server;
  } catch (error) {
    console.error('Bluetooth initialization failed:', error);
    return null;
  }
}

async function transferDataToDevice(server, data) {
  try {
    const service = await server.getPrimaryService('your-service-uuid');
    const characteristic = await service.getCharacteristic('your-characteristic-uuid');
    const cookieData = Cookies.get("teamNumbers");
    await characteristic.writeValue(cookieData);
  } catch (error) {
    console.error('Data transfer failed:', error);
  }
}


export { initializeBluetooth, transferDataToDevice };

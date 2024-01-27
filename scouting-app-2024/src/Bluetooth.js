import Cookies from "js-cookie";

async function initializeBluetooth() {
  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['00001234-0000-1000-8000-00805f9b34fb'],
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
    const service = await server.getPrimaryService('00001234-0000-1000-8000-00805f9b34fb');
    const characteristic = await service.getCharacteristic('00001234-0000-1000-8000-00805f9b34fb');
    const cookieData = Cookies.get("teamNumbers");
    await characteristic.writeValue(cookieData);
  } catch (error) {
    console.error('Data transfer failed:', error);
  }
}


export { initializeBluetooth, transferDataToDevice };

let uart;

async function connect() {
    const device = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: 'BBC micro:bit' }],
        optionalServices: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e']
    });
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e');
    uart = await service.getCharacteristic('6e400002-b5a3-f393-e0a9-e50e24dcca9e');
    document.getElementById('connect').innerText = "CONNECTED!";
}

function send(char) {
    if (uart) {
        let encoder = new TextEncoder();
        uart.writeValue(encoder.encode(char));
    }
}

document.getElementById('connect').addEventListener('click', connect);

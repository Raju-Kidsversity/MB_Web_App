let uartCharacteristic;

async function connect() {
    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ namePrefix: 'BBC micro:bit' }],
            optionalServices: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e']
        });
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e');
        uartCharacteristic = await service.getCharacteristic('6e400002-b5a3-f393-e0a9-e50e24dcca9e');
        document.getElementById('status').innerText = "Status: Connected!";
        document.getElementById('status').style.color = "#00ff88";
    } catch (e) { console.error(e); }
}

function send(command) {
    if (uartCharacteristic) {
        let encoder = new TextEncoder();
        // Adding '!' as a terminator helps the micro:bit know the message ended
        uartCharacteristic.writeValue(encoder.encode(command + "!"));
    }
}

function sendServo(prefix, value) {
    // Sends strings like "A90!" or "G180!"
    send(prefix + value);
}

document.getElementById('connectBtn').addEventListener('click', connect);

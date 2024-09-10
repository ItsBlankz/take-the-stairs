import { Html5Qrcode } from "html5-qrcode";

let cameraID;
let isScanning = false;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const devices = await Html5Qrcode.getCameras()
        if (devices && devices.length) {
            const cameraID = devices.find(device => device.label.toLowerCase().includes("rear") || device.label.toLowerCase().includes("back")).id
            // const cameraID = devices[0].id
            console.log(devices)
            const qrScanner = new Html5Qrcode("qrScanner")

            try {
                qrScanner.start(
                    cameraID,
                    {
                        fps: 10,
                        qrbox: 250,
                        aspectRatio: 1.0
                    },

                    async (qrCodeMessage) => {
                        if (isScanning) return;
                        isScanning = true;
                        try {
                            qrScanner.pause()
                            const response = await fetch(`https://take-the-stairs.vercel.app/api/addSteps/saveFloor/${qrCodeMessage}`, {
                                method: 'POST',
                                headers: {
                                    'Access-Control-Allow-Origin': "https://take-the-stairs.vercel.app"
                                }
                            })
                            const text = await response.text()
                            if (response.ok) {
                                alert(`Success: ${text}`)
                            } else {
                                alert(`Error ${response.status}: ${text}`);
                            }
                        } catch (e) {
                            console.error("Error fetching data:", e);
                            alert(`Fetch Error: ${e.message}`);
                        }

                        setTimeout(() => {
                            isScanning = false;
                            qrScanner.resume()
                        }, 2000);
                    },

                    errorMessage => {
                        console.log(errorMessage);
                    }
                )
            } catch (err) {
                alert("Error starting QR Scanner again");
                console.log(err)
            }
        } else {
            alert("Camera Permissions are Required")
        }
    } catch (err) {
        alert("Error getting cameras")
        console.log(err)
    }
})

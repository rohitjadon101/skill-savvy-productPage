const video = document.getElementById("video");
const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const output = document.getElementById("output");
const actionButton = document.getElementById("actionButton");
const errorDisplay = document.getElementById("error");

// Start video stream for scanning
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    video.srcObject = stream;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    setInterval(() => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

      if (qrCode) {
        output.value = qrCode.data;
        actionButton.disabled = false;
        actionButton.onclick = () => {
          if (qrCode.data.startsWith("http")) {
            window.open(qrCode.data, "_blank");
          } else {
            alert("No URL detected");
          }
        };
      }
    }, 500);
  } catch (err) {
    errorDisplay.textContent = "Error accessing camera: " + err.message;
  }
}

// Decode QR code from uploaded image
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

      if (qrCode) {
        output.value = qrCode.data;
        actionButton.disabled = false;
        actionButton.onclick = () => {
          if (qrCode.data.startsWith("http")) {
            window.open(qrCode.data, "_blank");
          } else {
            alert("No URL detected");
          }
        };
      } else {
        errorDisplay.textContent = "Unable to read QR code from image.";
      }
    };
  };
  reader.readAsDataURL(file);
});

uploadButton.addEventListener("click", () => fileInput.click());

// Initialize the app
startCamera();
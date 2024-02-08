const express = require("express")
const Stream = require("node-rtsp-stream")
const cors = require("cors")

const app = express()
const port = 3002
let stream = null

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.get("/stream", (req, res) => {
  const newRtspStreamUrl = req.query.rtsp;
  let currentRtspStreamUrl = "";

  // Create the WebSocket stream only if it doesn't exist or the RTSP URL has changed
  if (!stream || currentRtspStreamUrl !== newRtspStreamUrl) {
    if (stream || newRtspStreamUrl === "stop") {
      stream.stop();
    }
    stream = new Stream({
      name: "Camera Stream",
      streamUrl: newRtspStreamUrl,
      wsPort: 9999,
    });
    currentRtspStreamUrl = newRtspStreamUrl;
  }

  // Send a JSON response with the WebSocket URL
  res.json({ url: `ws://127.0.0.1:9999` });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
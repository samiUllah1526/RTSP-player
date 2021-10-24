// var player = new JSMpeg.Player("rtsp://user:user123@94.200.141.221:554/1/1");
const Stream = require("node-rtsp-stream");
const app = require("express")();

const streams = {};
const stream_configs = [
  {
    key: "clientCode",
    port: 9000,
    // url: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
    // url: "rtsp://user:user123@94.200.141.221:554/1/1",
    url: "http://77.243.103.105:8081/mjpg/video.mjpg",
  },
];

const startStream = (name, streamUrl, wsPort) => {
  const stream = new Stream({
    name,
    //   streamUrl: "rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov",
    streamUrl,
    wsPort,
    ffmpegOptions: {
      // options ffmpeg flags
      "-stats": "",
      "-r": 30,
    },
  });
  streams[wsPort] = stream;
};

app.get("start-steam", (req, res) => {
  const { streamUrl, wsPort, name = "stream" } = req.query;

  if (!url && !port) {
    return res.json({
      message: "bad input",
    });
  }

  if (streams[port]) {
    return res.json({
      message: `port ${port} is in use`,
    });
  }

  startStream(name, streamUrl, wsPort);
  res.json({
    message: "Started stream",
  });
});

app.listen(8000, () => {
  console.log("server running 8000");
  stream_configs.forEach((config) => {
    startStream(config.key, config.url, config.port);
  });
});

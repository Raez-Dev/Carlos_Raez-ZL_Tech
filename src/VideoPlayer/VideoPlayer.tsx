import React, { useRef, useEffect, useState } from "react";
// @ts-ignore
import { Player } from "video-react";
// @ts-ignore
import RecordRTC, {
  // @ts-ignore
  RecordRTCPromisesHandler
} from "recordrtc";
import { saveAs } from "file-saver";
import {
  FaStop,
  FaDownload,
  FaRecordVinyl,
  FaRegPauseCircle
} from "react-icons/fa";
import "video-react/dist/video-react.css";
import {
  Container,
  ContainerButtons,
  ButtonIcon,
  Video,
  VideoContainer,
  ButtonOptions,
  VideoCounter
} from "./VideoPlayer.style";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [grayScaleAble, setGrayScaleAble] = useState(false);
  const [counter, setCounter] = useState(0);
  const [customInterval, setCustomInterval] = useState(0);
  const [blurAble, setBlurAble] = useState(false);
  const [pauseAble, setPause] = useState(false);
  const [recorder, setRecorder] = useState<RecordRTC | null>();
  const [stream, setStream] = useState<MediaStream | null>();
  const [videoBlob, setVideoUrlBlob] = useState<Blob | null>();

  const startRecording = async () => {
    const mediaDevices = navigator.mediaDevices;
    const stream: MediaStream = await mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    const recorder: RecordRTC = new RecordRTCPromisesHandler(stream, {
      type: "video"
    });

    await recorder.startRecording();
    setRecorder(recorder);
    setStream(stream);
    setVideoUrlBlob(null);

    let timer = setInterval(() => {
      setCounter((prevCount) => prevCount + 1);
    }, 1000);
    setCustomInterval(timer);
  };

  const pauseRecording = async () => {
    if (recorder) {
      await recorder.pauseRecording();
      setPause(!pauseAble);
    }
  };

  const resumeRecording = async () => {
    if (recorder) {
      await recorder.resumeRecording();
      setPause(!pauseAble);
    }
  };

  const stopRecording = async () => {
    if (recorder) {
      await recorder.stopRecording();
      const blob: Blob = await recorder.getBlob();
      (stream as any).stop();
      setVideoUrlBlob(blob);
      setStream(null);
      setRecorder(null);
      clearInterval(customInterval);
    }
  };

  const downloadVideo = () => {
    if (videoBlob) {
      const mp4File = new File([videoBlob], "demo.mp4", { type: "video/mp4" });
      saveAs(mp4File, `Video-${Date.now()}.mp4`);
    }
  };

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 }
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ContainerButtons>
          <ButtonIcon onClick={startRecording}>
            <FaRecordVinyl style={{ height: "40px", width: "40px" }} />
          </ButtonIcon>

          <ButtonIcon
            onClick={pauseAble ? resumeRecording : pauseRecording}
            disabled={recorder ? false : true}
          >
            <FaRegPauseCircle style={{ height: "40px", width: "40px" }} />
          </ButtonIcon>

          <ButtonIcon
            onClick={stopRecording}
            disabled={recorder ? false : true}
          >
            <FaStop style={{ height: "40px", width: "40px" }} />
          </ButtonIcon>

          <ButtonIcon onClick={downloadVideo} disabled={!!!videoBlob}>
            <FaDownload style={{ height: "40px", width: "40px" }} />
          </ButtonIcon>
        </ContainerButtons>

        <VideoContainer>
          {!videoBlob && (
            <>
              <Video
                grayScaleAble={grayScaleAble}
                blurAble={blurAble}
                ref={videoRef}
              ></Video>
              <VideoCounter>{counter}</VideoCounter>
            </>
          )}

          {!!videoBlob && (
            <Player
              src={window.URL.createObjectURL(videoBlob)}
              style={{
                height: "50vh",
                width: "80%"
              }}
            />
          )}
        </VideoContainer>

        <ContainerButtons>
          <ButtonOptions
            onClick={() => {
              setGrayScaleAble(!grayScaleAble);
            }}
          >
            Gray Scale
          </ButtonOptions>
          <ButtonOptions
            onClick={() => {
              setBlurAble(!blurAble);
            }}
          >
            Blur
          </ButtonOptions>
        </ContainerButtons>
      </div>
    </Container>
  );
};

export { VideoPlayer };

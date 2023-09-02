import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p className="text-white">transcript: {transcript}</p>
      <p className="text-white">Microphone: {listening ? "on" : "off"}</p>
      <button
        className="bg-blue-200 p-2 m-2"
        onClick={SpeechRecognition.startListening}
      >
        Start
      </button>
      <button
        className="bg-blue-200 p-2 m-2"
        onClick={SpeechRecognition.stopListening}
      >
        Stop
      </button>
      <button className="bg-blue-200 p-2" onClick={resetTranscript}>
        Reset
      </button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;

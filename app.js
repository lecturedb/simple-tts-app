const textInput = document.querySelector("#tts-text");
const speakButton = document.querySelector("#speak-button");
const stopButton = document.querySelector("#stop-button");
const statusMessage = document.querySelector("#status-message");

const supportsSpeech =
  "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
let activeUtterance = null;

const setStatus = (message, type = "idle") => {
  statusMessage.textContent = message;
  statusMessage.dataset.status = type;
};

const setSpeakingState = (isSpeaking) => {
  stopButton.disabled = !isSpeaking;
  speakButton.textContent = isSpeaking ? "다시 읽기" : "읽기";
};

const cancelSpeech = () => {
  if (!supportsSpeech) {
    return false;
  }

  const hadActiveSpeech = activeUtterance !== null || window.speechSynthesis.speaking;

  if (activeUtterance) {
    activeUtterance.onstart = null;
    activeUtterance.onend = null;
    activeUtterance.onerror = null;
    activeUtterance = null;
  }

  window.speechSynthesis.cancel();
  setSpeakingState(false);
  return hadActiveSpeech;
};

const stopSpeech = () => {
  if (cancelSpeech()) {
    setStatus("읽기를 중지했습니다.", "idle");
  }
};

const speakText = () => {
  const text = textInput.value.trim();

  if (!text) {
    setStatus("읽을 문장을 입력해 주세요.", "warning");
    textInput.focus();
    return;
  }

  if (!supportsSpeech) {
    setStatus("이 브라우저는 음성 읽기 기능을 지원하지 않습니다.", "warning");
    return;
  }

  cancelSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  activeUtterance = utterance;

  utterance.onstart = () => {
    if (activeUtterance !== utterance) {
      return;
    }

    setStatus("문장을 읽는 중입니다.", "speaking");
    setSpeakingState(true);
  };

  utterance.onend = () => {
    if (activeUtterance !== utterance) {
      return;
    }

    activeUtterance = null;
    setStatus("읽기가 완료되었습니다.", "complete");
    setSpeakingState(false);
  };

  utterance.onerror = (event) => {
    if (activeUtterance !== utterance) {
      return;
    }

    activeUtterance = null;
    setSpeakingState(false);

    if (event.error === "canceled" || event.error === "interrupted") {
      setStatus("읽기를 중지했습니다.", "idle");
      return;
    }

    setStatus("문장을 읽는 중 문제가 발생했습니다. 다시 시도해 주세요.", "warning");
  };

  window.speechSynthesis.speak(utterance);
};

speakButton.addEventListener("click", speakText);
stopButton.addEventListener("click", stopSpeech);

if (!supportsSpeech) {
  speakButton.disabled = true;
  stopButton.disabled = true;
  setStatus("이 브라우저는 음성 읽기 기능을 지원하지 않습니다.", "warning");
} else {
  setSpeakingState(false);
}

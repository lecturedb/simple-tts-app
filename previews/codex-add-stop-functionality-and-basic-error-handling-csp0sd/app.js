const textInput = document.querySelector("#tts-text");
const speakButton = document.querySelector("#speak-button");
const statusMessage = document.querySelector("#status-message");

const setStatus = (message, type = "idle") => {
  statusMessage.textContent = message;
  statusMessage.dataset.status = type;
};

const speakText = () => {
  const text = textInput.value.trim();

  if (!text) {
    setStatus("읽을 문장을 입력해 주세요.", "warning");
    textInput.focus();
    return;
  }

  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    setStatus("이 브라우저는 음성 읽기 기능을 지원하지 않습니다.", "warning");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";

  utterance.onstart = () => {
    setStatus("문장을 읽는 중입니다.", "speaking");
    speakButton.disabled = true;
  };

  utterance.onend = () => {
    setStatus("읽기가 완료되었습니다.", "complete");
    speakButton.disabled = false;
  };

  utterance.onerror = () => {
    setStatus("문장을 읽는 중 문제가 발생했습니다.", "warning");
    speakButton.disabled = false;
  };

  window.speechSynthesis.speak(utterance);
};

speakButton.addEventListener("click", speakText);

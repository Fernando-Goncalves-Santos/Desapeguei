import bus from "../utils/bus";

export default function useFlashMessage() {
  function setFlashMessage(msg, type) {
    window.scrollTo({ top: 0 });
    bus.emit("flash", {
      message: msg,
      type: type,
    });
  }

  return { setFlashMessage };
}

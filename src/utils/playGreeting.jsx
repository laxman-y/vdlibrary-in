export function playGreeting(studentName, isEntry = true) {
  const now = new Date();
  const hour = now.getHours();

  let greeting = "Good morning";
  if (hour >= 12 && hour < 15) {
    greeting = "Good afternoon";
  } else if (hour >= 15) {
    greeting = "Good evening";
  }

  const action = isEntry ? "Please take care of your time" : "Thank you for spending your time wisely";
  const message = `${greeting} ${studentName}. ${action}. Do respect of mother, father, guru and cow. Thank you.`;

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.rate = 1; // Slightly slower speed
  utterance.pitch = 1;
  utterance.volume = 1;

  // Optional: Choose specific voice (Indian English, if available)
  const voices = window.speechSynthesis.getVoices();
  const indianVoice = voices.find(v => v.lang === "en-IN");
  if (indianVoice) {
    utterance.voice = indianVoice;
  }

  window.speechSynthesis.speak(utterance);
}

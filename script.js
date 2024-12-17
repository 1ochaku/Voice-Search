// utilising built in method of js
// for listening to user's voice

// Step 1: start listening
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition) // internal api
// console.log(recognition)

// Step 2: which language?
recognition.lang = "en-US"
// console.log(recognition)

// Step 3: making to listen on tapping button
const btn = document.querySelector("#btn")

btn.addEventListener("click", () => {

    // converting text to speech
    function speak(text) {
        const input = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(input);
    }
    
    speak("Hello, how can I help you?");

    // Start listening to user's voice after 2s
    setTimeout(() => {
        btn.innerHTML = "Listening...";
        recognition.start();
    }, 2000);

    // sending off the commands to be said aloud
    function handleCommands(command) {
        if (command.includes("open youtube")) {
            speak("Opening Youtube...");
            window.open("https://www.youtube.com", "_blank");
        } else if (command.includes("open google")) {
            speak("Opening Google...");
            window.open("https://www.google.com", "_blank");
        } else if (command.includes("open facebook")) {
            speak("Opening Facebook...");
            window.open("https://www.facebook.com", "_blank");
        } else if (command.includes("open instagram")) {
            speak("Opening Instagram...");
            window.open("https://www.instagram.com", "_blank");
        } else {
            speak("Searching in google...");
            window.open("https://www.google.com/search?q=" + command, "_blank");
        }
    }

    // listens to the command
    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        handleCommands(command);
    }

    // on end
    recognition.onend = () => {
        btn.innerHTML = "Search";
    }
});


let currentStep = 0;
let lives = 3;
const heartElements = [
    document.getElementById("heart1"),
    document.getElementById("heart2"),
    document.getElementById("heart3")
];
const startScreen = document.getElementById("start-screen");
const gameContainer = document.querySelector(".container");
const heartsDiv = document.querySelector(".hearts");
const gameContent = document.getElementById("game-content");
const storyBox = document.getElementById("story-box");
const storyText = document.getElementById("story-text"); // Get the story text element!
const optionsDiv = document.getElementById("options");
const feedbackDiv = document.getElementById("feedback");
const cutsceneDiv = document.getElementById("cutscene");
const cutsceneText = document.getElementById("cutscene-text");
const continueButton = document.getElementById("continue-button");
const storyImage = document.getElementById("story-image");
const restartButton = document.getElementById("restart-button");
const gameTitle = document.querySelector(".game-title"); // The smaller title

const storySteps = [
    {
        text: "You appear in a mysterious place. A shimmering portal stands before you. What do you do?",
        options: ["Enter MC Portal", "Don’t Enter", "Go Play Super Smash Bros"],
        correctAnswer: 0,
        feedback: ["You step through the shimmering portal...", "Maybe the portal leads to adventure!", "Sounds like fun, but the portal looks interesting..."],
        image: "images/Portal.png",
        cutsceneText: "The portal hums with an unknown energy... You feel... blocky.", // Added cutscene text
        cutsceneNumber: 1 // We can remove this now if we're not using it
    },
    {
        text: "Suddenly, a hissing sound! A Creeper is approaching!",
        options: ["Fight", "Jump Away", "Stare Blankly"],
        correctAnswer: 2,
        feedback: ["That was a close one!", "Quick thinking!", "The Creeper seems confused by your lack of reaction... and then explodes!"],
        image: "images/Creeper.png",
        cutsceneText: "BOOM! That was a close call! Luckily you confused it.", // Added cutscene text
        cutsceneNumber: 2 // We can remove this now if we're not using it
    },
    {
        text: "Oh no! A horde of Zombies is shambling towards you!",
        options: ["Run", "Fight", "Dig Underground"],
        correctAnswer: 0,
        feedback: ["Smart move! Gotta outrun 'em!", "That's brave, but are you strong enough?", "Maybe you'll find a safe spot down there."],
        image: "images/Zombie.png",
        cutsceneText: "The groaning echoes all around you... If only someone were here to save me!!!", // Added cutscene text
        cutsceneNumber: 3 // We can remove this now if we're not using it
    },
    {
        text: "Wait... is that... A Person!!!",
        options: ["Run from him", "Try to attack him", "I AM STEVE"],
        correctAnswer: 2,
        feedback: ["Probably a good idea to keep your distance.", "Are you sure about that?", "He seems just as confused as you are!"],
        image: "images/Steve.png",
        cutsceneText: "HE IS STEVE!!!", // Added cutscene text
        cutsceneNumber: 4 // We can remove this now if we're not using it
    },
    {
        text: "You stumble upon a peaceful Village. Steve is walking alongside you.",
        options: ["Walk with Steve", "Hit the Iron Golem", "Steal everything from the Village"],
        correctAnswer: 0,
        feedback: ["A friendly stroll through the village.", "That doesn't seem very nice!", "The villagers won't be happy about that!"],
        image: "images/Village.png",
        cutsceneText: "The villagers seem busy with their trades. One was hit by a car. Lmao.", // Added cutscene text
        cutsceneNumber: 5 // We can remove this now if we're not using it
    },
    {
        text: "Uh oh, a group of Piglins has spotted you! They look hostile.",
        options: ["Jump into a boat", "Use Elytra to fly away", "Use a Diamond Sword"],
        correctAnswer: 1,
        feedback: ["Will that work on land?", "Soaring through the air to safety!", "Hope you have some good enchantments!"],
        image: "images/Piglins.png",
        cutsceneText: "Still understanding? Neither am I.", // Added cutscene text
        cutsceneNumber: 6 // We can remove this now if we're not using it
    },
    {
        text: "You've found a spooky Woodland Mansion!",
        options: ["Explore but Get Captured", "Jazz Band", "BLOW IT UP!!!"],
        correctAnswer: 1,
        feedback: ["Looks like it was a trap!", "The Illagers seem to enjoy your musical performance!", "That's one way to deal with it!"],
        image: "images/Woodland_Mansion.png",
        cutsceneText: "Cause why not?", // Added cutscene text
        cutsceneNumber: 7 // We can remove this now if we're not using it
    },
    {
        text: "What's that clucking sound? A Chicken Jockey!",
        options: ["Attack It", "Pet it", "Stare at it. Then attack it"],
        correctAnswer: 2,
        feedback: ["That's a bold move!", "It doesn't seem to appreciate that.", "A moment of contemplation before the attack!"],
        image: "images/Chicken_Jockey.png",
        cutsceneText: "CHICKEN JOCKEY!", // Added cutscene text
        cutsceneNumber: 8 // We can remove this now if we're not using it
    },
    {
        text: "RUN!",
        options: ["Run", "Run", "Run"],
        correctAnswer: 0,
        feedback: ["You run as fast as you can!", "You run with all your might!", "You keep on running!"],
        image: "images/Running.png",
        cutsceneText: "Boom Boom Boom Boom", // Added cutscene text
        cutsceneNumber: 9 // We can remove this now if we're not using it
    },
    {
        text: "The Nether is in the Overworld! A fierce fight is about to begin!",
        options: ["Use Iron Golems", "Fight by yourself", "Use the Villagers as shields"],
        correctAnswer: 0,
        feedback: ["The Iron Golems charge into battle!", "Hope you're well-equipped!", "That's... not very heroic."],
        image: "images/Final_Fight.png",
        cutsceneText: "Why fight when a big strong man can?", // Added cutscene text
        cutsceneNumber: 10 // We can remove this now if we're not using it
    },
    {
        text: "VICTORY! You've overcome the challenges!",
        options: ["Return to the Real World", "Stay in Minecraft", "CHICKEN JOCKEY!!!"],
        correctAnswer: 0,
        feedback: ["You step back through the portal.", "Maybe you'll stay for another adventure!", "You suddenly feel an urge to ride a chicken..."],
        image: "images/Victroy.png",
        cutsceneText: "Congrats! You managed to not die! +100 Aura", // Added cutscene text for the end (optional)
        cutsceneNumber: 11 // We can remove this now if we're not using it
    }
];

let stepCounter = 0; // To track which set of options we are on

function startGame() {
    currentStep = 0;
    lives = 3;
    heartElements.forEach(heart => heart.classList.remove("faded"));
    feedbackDiv.innerText = "";
    restartButton.style.display = "none";
    storyBox.style.display = "block";
    optionsDiv.style.display = "flex";
    cutsceneDiv.style.display = "none";
    gameContainer.style.display = "block"; // Show the game container
    heartsDiv.style.display = "flex"; // Show the hearts
    startScreen.style.display = "none"; // Hide the start screen
    stepCounter = 0;
    loadStep();
}

function loadStep() {
    const current = storySteps[currentStep];
    storyText.innerText = current.text; // This line was missing! It sets the story text.
    optionsDiv.innerHTML = "";
    for (let i = 0; i < current.options.length; i++) {
        const button = document.createElement("button");
        button.innerText = current.options[i];
        button.onclick = () => checkAnswer(i);
        optionsDiv.appendChild(button);
    }
    storyImage.src = current.image;
}

function updateHearts() {
    for (let i = 0; i < heartElements.length; i++) {
        if (i < lives) {
            heartElements[i].classList.remove("faded");
        } else {
            heartElements[i].classList.add("faded");
        }
    }
}

function showCutscene() {
    storyBox.style.display = "none";
    optionsDiv.style.display = "none";
    feedbackDiv.innerText = "";
    cutsceneDiv.style.display = "block";
    cutsceneText.innerText = storySteps[currentStep - 1].cutsceneText; // Show the cutscene text!
}

function continueStory() {
    cutsceneDiv.style.display = "none";
    storyBox.style.display = "block";
    optionsDiv.style.display = "flex";
    loadStep();
}

function checkAnswer(selectedIndex) {
    const current = storySteps[currentStep];

    if (currentStep === 8) { // Check if it's the "RUN!" step (it's at index 8 in the array)
        feedbackDiv.innerText = current.feedback[selectedIndex];
        currentStep++;
        stepCounter++;
        if (currentStep < storySteps.length) {
            if (stepCounter % 1 === 0 && currentStep < storySteps.length) {
                showCutscene();
            } else {
                loadStep();
            }
        } else {
            feedbackDiv.innerText = "You've completed the Minecraft Movie Adventure!";
            optionsDiv.innerHTML = "";
            restartButton.style.display = "block";
        }
    } else if (selectedIndex === current.correctAnswer) {
        feedbackDiv.innerText = current.feedback[selectedIndex];
        currentStep++;
        stepCounter++;
        if (currentStep < storySteps.length) {
            if (stepCounter % 1 === 0 && currentStep < storySteps.length) {
                showCutscene();
            } else {
                loadStep();
            }
        } else {
            feedbackDiv.innerText = "You've completed the Minecraft Movie Adventure!";
            optionsDiv.innerHTML = "";
            restartButton.style.display = "block";
        }
    } else {
        lives--;
        updateHearts();
        feedbackDiv.innerText = `Wrong! ${current.feedback[selectedIndex]}`;
        if (lives <= 0) {
            feedbackDiv.innerText = "Game Over! You ran out of lives!";
            optionsDiv.innerHTML = "";
            restartButton.style.display = "block";
        }
    }
}

// Start the game when the page loads
startScreen.style.display = "block"; // Initially show the start screen
gameContainer.style.display = "none"; // Initially hide the game container
heartsDiv.style.display = "none"; // Initially hide the hearts
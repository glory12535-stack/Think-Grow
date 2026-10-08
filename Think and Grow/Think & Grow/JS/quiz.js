const mainNav = document.querySelector("#mainNav");

mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    bootstrap.Collapse.getInstance(mainNav)?.hide();
}));
// Keep the questions together here so they are easy to edit later.
const questions = [
    { topic: "Climate basics", question: "Which gas contributes most to global warming?", answers: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"], correct: 2 },
    { topic: "The science", question: "What is the greenhouse effect?", answers: ["Heat trapped by gases in the atmosphere", "A hole in the ozone layer", "A type of storm", "Heat from volcanoes only"], correct: 0 },
    { topic: "Geography", question: "Which is the largest ocean on Earth?", answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correct: 3 },
    { topic: "The causes", question: "Which activity releases carbon dioxide by burning fossil fuels?", answers: ["Solar power", "Driving a petrol car", "Planting trees", "Recycling paper"], correct: 1 },
    { topic: "The effects", question: "What can a warmer climate make more likely?", answers: ["More heatwaves", "Fewer seasons", "Less evaporation", "No changes to weather"], correct: 0 },
    { topic: "Geography", question: "Which region is most covered by permanent ice?", answers: ["The Sahara", "Antarctica", "The Amazon", "The Mediterranean"], correct: 1 },
    { topic: "Nature", question: "Why are forests important for the climate?", answers: ["They absorb carbon dioxide", "They create petrol", "They stop all floods", "They make oceans warmer"], correct: 0 },
    { topic: "Solutions", question: "Which is an example of climate adaptation?", answers: ["Building flood defences", "Burning more coal", "Cutting down trees", "Using more petrol"], correct: 0 },
    { topic: "Solutions", question: "Which travel choice usually creates fewer emissions?", answers: ["Flying alone", "Walking or cycling", "Driving a large car", "Leaving an engine running"], correct: 1 },
    { topic: "Your voice", question: "What is a useful way to talk about climate change?", answers: ["Share reliable evidence", "Repeat every claim online", "Ignore different experiences", "Say individual actions never matter"], correct: 0 }
];

let currentQuestion = 0;
let score = 0;
const questionNumber = document.querySelector("#questionNumber");
const questionTopic = document.querySelector("#questionTopic");
const progressBar = document.querySelector("#progressBar");
const quizTitle = document.querySelector("#quizTitle");
const answerList = document.querySelector("#answerList");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#nextButton");
const scoreText = document.querySelector("#score");
const scoreLabel = document.querySelector("#scoreLabel");

function showQuestion() {
    const item = questions[currentQuestion];
    questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionTopic.textContent = item.topic;
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    quizTitle.textContent = item.question;
    feedback.textContent = "";
    feedback.className = "feedback";
    nextButton.classList.add("hidden");
    answerList.innerHTML = item.answers.map((answer, index) => `<button class="answer" data-index="${index}"><span class="answer-letter">${String.fromCharCode(65 + index)}</span>${answer}</button>`).join("");
    answerList.querySelectorAll(".answer").forEach((answer) => answer.addEventListener("click", () => checkAnswer(answer)));
}

function checkAnswer(selectedAnswer) {
    const item = questions[currentQuestion];
    const selectedIndex = Number(selectedAnswer.dataset.index);
    answerList.querySelectorAll(".answer").forEach((answer) => { answer.disabled = true; });
    if (selectedIndex === item.correct) {
        selectedAnswer.classList.add("correct");
        feedback.textContent = "Correct. Great work.";
        feedback.classList.add("good");
        score += 1;
    } else {
        selectedAnswer.classList.add("incorrect");
        answerList.querySelectorAll(".answer")[item.correct].classList.add("correct");
        feedback.textContent = "Not quite. The green answer is correct.";
        feedback.classList.add("try");
    }
    scoreText.textContent = `${score} / ${questions.length}`;
    nextButton.textContent = currentQuestion === questions.length - 1 ? "See result  →" : "Next question  →";
    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    if (currentQuestion === questions.length - 1) {
        scoreLabel.textContent = score >= 8 ? "Climate Expert" : score >= 5 ? "Climate Explorer" : "Climate Starter";
        nextButton.classList.add("hidden");
        feedback.textContent = `Quiz complete. You scored ${score} out of ${questions.length}.`;
        feedback.className = "feedback good";
        return;
    }
    currentQuestion += 1;
    showQuestion();
});

showQuestion();

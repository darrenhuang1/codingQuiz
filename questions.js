var questions = [
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<javascript>", "<js>", "<script>", "<scripting>"],
        answer: "<script>"
    },
    {
        title: "What is the correct JavaScript syntax to write 'Hello World'?",
        choices: ["response.write('Hello World')", 'Hello World', "document.write('Hello World')", "('Hello World')"],
        answer: "document.write('Hello World')"
    },
    {
        title: "Where is the correct place to insert JavaScript?",
        choices: ["both <head> section and the <body> section are correct", "<body> section", "<head> section"],
        answer: "both the <head> section and the <body> section are correct"
    },
    {
        title: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choices: ["<script src='xxx.js'>", "<script name='xxx.js'>", "<script value='xxx.js'>"],
        answer: "<script src='xxx.js'"
    },
    {
        title: "An external JavaScript must contain the <script> tag",
        choices: ["True", "False"],
        answer: "False"
    },

];

var score = 0;
var questionIndex = 0;

var secondsRemain = 76;
var maintainInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

timer.addEventListener("click", function () {
    if (maintainInterval === 0) {
        maintainInterval = setInterval(function () {
            secondsRemain--;
            currentTime.textContent = "Time: " + secondsRemain;

            if (secondsRemain <= 0) {
                clearInterval(maintainInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {
            secondsRemain = secondsRemain - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    if (secondsRemain >= 0) {
        var timeRemaining = secondsRemain;
        var createP2 = document.createElement("p");
        clearInterval(maintainInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            window.location.replace("./HighScores.html");
        }
    });

}



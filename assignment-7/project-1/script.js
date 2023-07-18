(async () => {
    let url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple";

    let data = await fetch(url);

    let dataJson = await data.json();

    let questions = dataJson.results.map((value, idx) => {
        return {
            question: value.question,
            options: [value.correct_answer, ...value.incorrect_answers],
            correctAnswer: value.correct_answer,
            selectedAnswer: null,
            score: 0 // Initialize score for each question
        };
    });

    let currentQuestionIndex = 0; // Keep track of the current question index
    let selectedAnswer = null; // Keep track of the selected answer
    let totalScore = 0; // Keep track of the total score

    const questionElement = document.querySelector('.question');
    const optionsElement = document.querySelector('.options');
    const resultElement = document.querySelector('#result');
    const scoreElement = document.querySelector('.score');
    const submitButton = document.querySelector('.submit button');
    const nextButton = document.querySelector('.next button');
    const modalElement = document.querySelector('.modal');
    const scoreSpan = document.querySelector('#score');
    const closeModalButton = document.querySelector('.close-modal');

    // Function to display the current question and options
    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;

        optionsElement.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            const li = document.createElement('li');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.value = option;
            input.id = `option-${index}`;
            input.addEventListener('change', () => {
                selectedAnswer = option;
                nextButton.disabled = false; // Enable the "Next" button when an option is selected
            });

            const label = document.createElement('label');
            label.htmlFor = `option-${index}`;
            label.textContent = option;

            li.appendChild(input);
            li.appendChild(label);
            optionsElement.appendChild(li);
        });

        resultElement.value = 'select one option'; // Clear the result input
        scoreElement.textContent = `${currentQuestion.score}`; // Update the score display

        nextButton.disabled = true; // Disable the "Next" button initially
    }

    displayQuestion(); // Display the initial question


    let isQuestionSubmitted = false;
    // Event listener for the "Submit" button
    submitButton.addEventListener('click', () => {
        if (selectedAnswer === null) {
            resultElement.value = "select one option"
            console.log('No answer selected');
            return;
        } else {
            resultElement.value = "click to the next"
        }

        questions[currentQuestionIndex].selectedAnswer = selectedAnswer; // Save the selected answer

        if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
            questions[currentQuestionIndex].score = 2; // Set score as 2 for correct answer
        } else {
            questions[currentQuestionIndex].score = -1; // Set score as -1 for wrong answer
        }

        selectedAnswer = null; // Reset selected answer after submitting
        scoreElement.textContent = `${questions[currentQuestionIndex].score}`;
        isQuestionSubmitted = true;
    });

    // Event listener for the "Next" button
    nextButton.addEventListener('click', () => {
        if (!isQuestionSubmitted) {
            resultElement.value = "submit before moving to the next"
            console.log('Please submit your answer before moving to the next question');
            return;
        }

        if (currentQuestionIndex >= questions.length - 1) {
            // End of questions
            displayResult();
            return;
        }

        currentQuestionIndex++; // Increment the question index
        selectedAnswer = null; // Reset selected answer for the next question
        isQuestionSubmitted = false;
        displayQuestion(); // Display the next question
    });


    // Function to calculate the total score
    function calculateTotalScore() {
        totalScore = questions.reduce((acc, question) => {
            return acc + question.score;
        }, 0);
    }

    // Function to display the final result in a modal window
    function calculateResultStats() {
        let rightCount = 0;
        let wrongCount = 0;
        totalScore = questions.reduce((acc, question) => {
            if (question.score === 2) {
                rightCount++;
            } else if (question.score === -1) {
                wrongCount++;
            }
            return acc + question.score;
        }, 0);

        return { rightCount, wrongCount };
    }


    // Function to display the final result in a modal window
    function displayResult() {
        const resultStats = calculateResultStats();
        const { rightCount, wrongCount } = resultStats;

        const rightAnswersText = `Right Answers: ${rightCount}`;
        const wrongAnswersText = `Wrong Answers: ${wrongCount}`;

        const passFailText = (wrongCount <= 6) ? "Pass" : "Fail";
        const scoreText = `<span id="score">${totalScore}</span>`;
        const failMessage = (passFailText === "Fail" && totalScore <= 6) ? "Your score is less than 6. You need to improve." : "";

        document.querySelector('.modal-content .right').textContent = rightAnswersText;
        document.querySelector('.modal-content .wrong').textContent = wrongAnswersText;
        document.querySelector('.modal-content #score').innerHTML = scoreText;
        document.querySelector('.modal-content .pass-fail').textContent = `Result: ${passFailText}`;
        document.querySelector('.modal-content .fail-message').textContent = failMessage;

        modalElement.style.display = 'block';
    }


    closeModalButton.addEventListener('click', () => {
        modalElement.style.display = 'none';
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modalElement) {
            modalElement.style.display = 'none';
        }
    });
})();
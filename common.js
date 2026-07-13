// Array of SHA-256 hashes for your 10 answers
const answerHashes = [
    "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", // Placeholder Q1
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", // Placeholder Q2
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", // Placeholder Q3
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", // ... add others
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
];

// Get date in YYYY-MM-DD (local time)
function getTodayString() {
    return new Date().toLocaleDateString('en-CA');
}

// Logic: Check if the user is allowed to access this question index
function validateAccess(qIndex) {
    if (qIndex === 0) return; // Q1 is always open

    const prevFinished = localStorage.getItem(`q${qIndex - 1}_finished_date`);
    const today = getTodayString();

    if (!prevFinished) {
        window.location.href = "index.html"; // Back to start
    } else if (prevFinished === today) {
        document.body.innerHTML = `
            <div style="text-align:center; margin-top: 50px;">
                <h1>Come back later!</h1>
                <p>You've already completed the previous challenge today. The next one unlocks after midnight.</p>
                <button onclick="location.reload()">Check again</button>
            </div>`;
    }
}

// Security: Hash check
async function checkAnswer(qIndex, userInput) {
    const encoder = new TextEncoder();
    const data = encoder.encode(userInput.toLowerCase().trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashHex = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0')).join('');

    if (hashHex === answerHashes[qIndex]) {
        localStorage.setItem(`q${qIndex}_finished_date`, getTodayString());
        alert("Correct!");
        // Redirect to next question, or completion page if at the end
        if (qIndex < 9) {
            window.location.href = `question${qIndex + 2}.html`;
        } else {
            alert("Congratulations! You finished the quiz.");
        }
    } else {
        alert("Incorrect. Try again!");
    }
}
document.addEventListener("DOMContentLoaded", function () {
    // Get the form element
    const form = document.getElementById("predictionForm");

    // Listen for the form submission event
    form.addEventListener("submit", function (event) {
        // Prevent default form submission (page reload)
        event.preventDefault();

        // Collect form data
        const formData = {
            Age: document.getElementById("Age").value,
            Junk_Food: document.getElementById("Junk_Food").value,
            Salt: document.getElementById("Salt").value,
            Feel_Bad: document.getElementById("Feel_Bad").value,
            Feel_zeroInt: document.getElementById("Feel_zeroInt").value,
            Feel_Hopeless: document.getElementById("Feel_Hopeless").value,
            Smoke: document.getElementById("Smoke").value,
            Colestrol: document.getElementById("Colestrol").value,
            BP: document.getElementById("BP").value,
            Heartdisease_family: document.getElementById("Heartdisease_family").value,
            Animia: document.getElementById("Animia").value,
            Diabeties: document.getElementById("Diabeties").value,
            Hypertension: document.getElementById("Hypertension").value,
            Sleepapnea: document.getElementById("Sleepapnea").value,
            IrregularHeartRhythms: document.getElementById("IrregularHeartRhythms").value,
            CoronaryDisease: document.getElementById("CoronaryDisease").value,
            Angina: document.getElementById("Angina").value,
            Take_ColesterolMedication: document.getElementById("Take_ColesterolMedication").value,
            BMI: document.getElementById("BMI").value,
        };

        // Send data to the Flask backend API using Fetch API
        fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json()) // Parse the JSON response from the Flask API
            .then((data) => {
                // Get the prediction result from the API response
                const prediction = data.prediction === 1
                    ? "Risk of Cardiovascular Disease"
                    : "No Risk of Cardiovascular Disease";

                // Display the result in the result div
                const resultDiv = document.getElementById("predictionResult");
                resultDiv.innerHTML = `<b>Prediction: </b>${prediction}`;
            })
            .catch((error) => {
                console.error("Error:", error);
                const resultDiv = document.getElementById("predictionResult");
                resultDiv.innerHTML = "Error occurred. Please try again.";
            });
    });
});

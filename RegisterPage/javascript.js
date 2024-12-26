const form = document.querySelector("form");
const cancel = document.getElementById("cancel");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("pass");
const genderSelect = document.getElementById("gender");
const addressInput = document.getElementById("address");
const dobInput = document.getElementById("dob");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const gender = genderSelect.value;
    const address = addressInput.value.trim();
    const dob = dobInput.value.trim();

    if(!name || !email || !password || !gender || !address || !dob){
        alert("All Fields are required");
        return;
    }

    const FormData = {
        name,
        email,
        password,
        gender,
        address,
        dob,
    };
    alert("Form submitted successfully!");
    console.log("Form Submitted Successfully:", FormData);
    form.reset();
})

cancel.addEventListener("click", () => {
    form.reset();
})
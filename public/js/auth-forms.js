const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const userData = {
      email: document.getElementById("emailLoginInput").value,
      password: document.getElementById("passwordLoginInput").value
    };

    if (!userData.email || !userData.password) {
      console.log("Error: Fields cannot be blank");
      return;
    }

    loginUser(userData);
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", e => {
    e.preventDefault();

    const userData = {
      username: document.getElementById("usernameSignUpInput").value,
      email: document.getElementById("emailSignUpInput").value,
      password: document.getElementById("passwordSignUpInput").value,
      passwordConfirm: document.getElementById("passwordConfirmSignUpInput")
        .value
    };

    // Handle passwords being blank
    if (
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !userData.passwordConfirm
    ) {
      console.log("Error: Fields cannot be blank");
      return;
    }

    // Handle passwords not matching.
    if (userData.password !== userData.passwordConfirm) {
      console.log("Error: Passwords do not match");
      return;
    }

    signUpUser(userData);
  });
}

const loginUser = userData => {
  fetch("/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  }).then(response => {
    if (response.ok) {
      console.log("User successfully authenticated!");
      window.location = "/";
    } else {
      console.log("Could not log user in :(");
    }
  });
};

const signUpUser = userData => {
  fetch("/api/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  }).then(response => {
    if (response.ok) {
      console.log("User registered successfully.");
      window.location = "/";
    } else {
      console.log("Unable to register user.");
    }
  });
};

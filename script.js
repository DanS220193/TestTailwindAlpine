tailwind.config = {
  theme: {
    extend: {
      colors: {
        mainbg: "#36384d",
        blackfont: "#21233c",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
};

document.addEventListener("alpine:init", () => {
  Alpine.store("submittedStore", {
    status: false,

    toggle() {
      this.status = !this.status;
    },
  });
});

const submitEmail = async (email, store) => {
  //   store?.toggle();
  //   console.log("here", store);
  if (isValidEmail(email)) {
    let resp = await emailPost(email);

    if (resp?.subscribed === true) {
      store?.toggle();
    }
  }
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

const emailPost = async (email) => {
  const url = "https://65f0a58eda8c6584131c3474.mockapi.io/email";
  const body = { email: email };

  let resp = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      return { message: "You have subscribed!", subscribed: true };
    })
    .catch((error) => {
      return { message: "There was an error subscribing!", subscribed: false };
    });

  return resp;
};

const validateEmailInput = (email, emailInputRef) => {
  if (email?.length > 0) {
    if (isValidEmail(email)) {
      emailInputRef.classList.remove("border-red-400");
    } else {
      if (!emailInputRef.classList.contains("border-red-400")) {
        emailInputRef.classList.add("border-red-400");
      }
    }
  } else {
    if (!emailInputRef.classList.contains("border-red-400")) {
      emailInputRef.classList.remove("border-red-400");
    }
  }
};

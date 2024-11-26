import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconResolve from "../img/ok.svg";
import iconReject from "../img/error.svg";


const form = document.querySelector(".form");

iziToast.settings({
    timeout: 5000,
    position: 'topRight',
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
});

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const delayValue = event.target.elements.delay.value;
    const checkedInput = event.target.elements.state.value;
    form.reset()

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (checkedInput === "fulfilled") {
                resolve(delayValue);
            } else {
                reject(delayValue);
            }   
        }, delayValue)
    });

    promise
        .then((delay) =>iziToast.success({
            title: 'Ok',
            message: `Fulfilled promise in ${delay}ms`,
            iconUrl: iconResolve,
            titleColor: "#fff",
            titleSize: "16px",
            messageColor: "#fff",
            messageSize: "16px",
            backgroundColor: "#59a10d",
        }))
        .catch((error) => iziToast.error({
            title: 'Error',
            message: `Rejected promise in ${error}ms`,
            iconUrl: iconReject,
            titleColor: "#fff",
            titleSize: "16px",
            messageColor: "#fff",
            messageSize: "16px",
            backgroundColor: "#ef4040",
        }));
}


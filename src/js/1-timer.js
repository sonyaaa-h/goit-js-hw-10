import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconReject from "../img/error.svg";



const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const day = document.querySelector(".value[data-days]");
const hour = document.querySelector(".value[data-hours]");
const minute = document.querySelector(".value[data-minutes]");
const second = document.querySelector(".value[data-seconds]");

startBtn.disabled = true;
let userSelectedDate;
let timerId;

iziToast.settings({
    timeout: 5000,
    position: 'topRight',
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
});

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                iconUrl: iconReject,
                titleColor: "#fff",
                titleSize: "16px",
                messageColor: "#fff",
                messageSize: "16px",
                backgroundColor: "#ef4040",
            });
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
            userSelectedDate = selectedDates[0] - Date.now();
        }
    },
};

flatpickr(input, options);

startBtn.addEventListener("click", handleStart);

function handleStart() {
    startBtn.disabled = true;
    input.disabled = true;

    timerId = setInterval(() => {
        userSelectedDate -= 1000;
        if (userSelectedDate <= 0) {
            clearInterval(timerId);
            input.disabled = false;
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(userSelectedDate);
        day.textContent = `${days}`.padStart(2, "0");
        hour.textContent = `${hours}`.padStart(2, "0");
        minute.textContent = `${minutes}`.padStart(2, "0");
        second.textContent = `${seconds}`.padStart(2, "0");
    }, 1000);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}






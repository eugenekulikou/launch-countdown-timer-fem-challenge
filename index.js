// Constants for time units in milliseconds
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// Distance in days for the countdown
const COUNTDOWN_DISTANCE_DAYS = 9;

// Start and end dates for the countdown
const DATE_START = new Date();
const DATE_END = new Date(DATE_START);
DATE_END.setDate(DATE_START.getDate() + COUNTDOWN_DISTANCE_DAYS);

// Event listener to initialize the countdown timer when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => countdownTimer.init());

const countdownTimer = {
  // HTML elements to display countdown
  daysElement: document.getElementById("days"),
  hoursElement: document.getElementById("hours"),
  minutesElement: document.getElementById("minutes"),
  secondsElement: document.getElementById("seconds"),
  // Interval reference for updating countdown
  interval: null,

  /**
   * Initializes the countdown timer by starting the update interval.
   */
  init: function () {
    this.updateCountdown();
    this.interval = setInterval(() => this.updateCountdown(), 1000);
  },

  /**
   * Updates the countdown timer with the latest remaining time.
   */
  updateCountdown: function () {
    const currentDate = new Date();
    const timeUntilEnd = this.calculateTimeUntilEnd(currentDate);

    // Update HTML elements with formatted countdown values
    this.daysElement.innerText = formatToTwoDigits(timeUntilEnd.days);
    this.hoursElement.innerText = formatToTwoDigits(timeUntilEnd.hours);
    this.minutesElement.innerText = formatToTwoDigits(timeUntilEnd.minutes);
    this.secondsElement.innerText = formatToTwoDigits(timeUntilEnd.seconds);
  },

  /**
   * Calculates the time remaining until the end date.
   * @param {Date} currentDate - The current date.
   * @returns {Object} An object containing the remaining days, hours, minutes, and seconds.
   */
  calculateTimeUntilEnd: function (currentDate) {
    const timeDifference = DATE_END - currentDate;

    return {
      days: Math.floor(timeDifference / DAY),
      hours: Math.floor((timeDifference % DAY) / HOUR),
      minutes: Math.floor((timeDifference % HOUR) / MINUTE),
      seconds: Math.floor((timeDifference % MINUTE) / SECOND),
    };
  },
};

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

/**
 * Formats an integer to ensure it is displayed in two digits (e.g., 01, 02, 03).
 * If the integer is less than 10, it prefixes it with a zero.
 *
 * @param {number} value - The integer value to format.
 * @returns {string} The formatted integer as a string.
 */
const formatToTwoDigits = (value) => {
  return String(value).padStart(2, "0");
};

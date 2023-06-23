// const happy = document.querySelector('#mood1')
// const smile = document.querySelector('#mood2')
// const meh = document.querySelector('#mood3')
// const sad = document.querySelector('#mood4')
// const depressing = document.querySelector('#mood5')
// let fax = true
// console.log(happy)

// function happier(){
//     happy.style.boxShadow = fax ? "6px 6px 6px rgb(0, 255, 0)" : ""
//     if(smile.style && meh.style && sad.style && depressing.style){
//         fax = !fax
//     } else if(happy.style){
//         fax = !fax
//     } else if(){

//     }
//     fax = !fax
// }
// function smiley(){
//     smile.style.boxShadow = fax ? "6px 6px 6px rgb(3, 169, 3)" : ""
//     fax = !fax
// }
// function mehh(){
//     meh.style.boxShadow = fax ? "6px 6px 6px rgb(49, 80, 80)" : ""
//     fax = !fax
// }
// function sadd(){
//     sad.style.boxShadow = fax ? "6px 6px 6px rgb(36, 237, 255)" : ""
//     fax = !fax
// }
// function depress(){
//     depressing.style.boxShadow = fax ? "6px 6px 6px blue" : ""
//     fax = !fax
// }
// // happy.addEventListener('click',(e)=>{
// //     e.target.style.boxShadow = "2px 2px 2px blue"
// // })

const currentYear = 2019;
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octomber",
  "November",
  "December",
];
const colors = ["#2d6b5f", "#72e3a6", "#dff4c7", "#edbf98", "#ea3d36"];
const defaultColor = "#888";
let activeColor = "";

const calendar = document.getElementById("calendar");
const moods = document.querySelectorAll(".mood");
const randomize = document.querySelector("#randomize");
const clear = document.querySelector("#clear");

moods.forEach((mood) => {
  mood.addEventListener("click", () => {
    // if is already selected, deselect it
    if (mood.classList.contains("selected")) {
      mood.classList.remove("selected");
      activeColor = defaultColor;
    } else {
      moods.forEach((mood) => {
        mood.classList.remove("selected");
      });

      mood.classList.add("selected");
      activeColor = getComputedStyle(mood).getPropertyValue("color");
    }
  });
});

const getAllDays = (year) => {
  // First day of the year - 1st January
  const firstDay = new Date(`January 1 ${year}`);
  // Last day of the year - 31th December - used to stop adding days to the array
  const lastDay = new Date(`December 31 ${year}`);

  // Add first day
  const days = [firstDay];

  // Used to keep track of the day
  let lastDayInArray = firstDay;

  // Loop while there are new days to be added in the current year
  while (lastDayInArray.getTime() !== lastDay.getTime()) {
    days.push(addDays(lastDayInArray, 1));
    lastDayInArray = days[days.length - 1];
  }

  return days;
};

const dates = getAllDays(currentYear);

let monthsHTML = "";

// Loop over the months and create a div for each month
months.forEach((month, idx) => {
  monthsHTML += `<div class="months month_${idx}">
        <h3>${month}</h3>
        <div class="week_days_container">
            ${weekDays
              .map((day) => `<div class="week_days">${day}</div>`)
              .join("")}
        </div>
        <div class="days_container"></div>
    </div>`;
});

calendar.innerHTML = monthsHTML;

// Loop over each day and
dates.forEach((date) => {
  const month = date.getMonth();
  const monthEl = document.querySelector(`.month_${month} .days_container`);

  // create extra day slots if needed before day 1
  if (date.getDate() === 1 && date.getDay() !== 0) {
    for (let i = 0; i < date.getDay(); i++) {
      const emptySpot = createEmptySpot();

      monthEl.appendChild(emptySpot);
    }
  }

  const dateEl = createDateEl(date);

  monthEl.appendChild(dateEl);
});

// Add click event to all the .circles
const circles = document.querySelectorAll(".circle");
circles.forEach((circle) => {
  circle.addEventListener("click", () => {
    circle.style.backgroundColor = activeColor;
  });
});

// Randomize functionality
randomize.addEventListener("click", () => {
  circles.forEach((circle) => {
    circle.style.backgroundColor = getRandomColor();
  });
});

// Clear functionality
clear.addEventListener("click", () => {
  circles.forEach((circle) => {
    circle.style.backgroundColor = defaultColor;
  });
});

function getRandomColor() {
  return colors[Math.floor(Math.random() * 5)];
}

function createDateEl(date) {
  const day = date.getDate();
  const dateEl = document.createElement("div");
  dateEl.classList.add("days");
  dateEl.innerHTML = `<span class="circle">${day}</span>`;

  return dateEl;
}

function createEmptySpot() {
  const emptyEl = document.createElement("div");
  emptyEl.classList.add("days");

  return emptyEl;
}

// function from StackOverflow: https://stackoverflow.com/questions/563406/add-days-to-javascript-date
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 140);

function updateCountdown() {
  const currentDate = new Date();
  const timeDifference = targetDate - currentDate;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Update HTML elements with the calculated values

  if (document.getElementById("daysDrawer")){

    document.getElementById("daysDrawer").textContent = formatTime(days);
  }
  if (document.getElementById("hoursDrawer")){

    document.getElementById("hoursDrawer").textContent = formatTime(hours);
  }
  if (document.getElementById("minutesDrawer")){

    document.getElementById("minutesDrawer").textContent = formatTime(minutes);
  }
  if (document.getElementById("secondsDrawer")){
    
    document.getElementById("secondsDrawer").textContent = formatTime(seconds);
  }
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Initial update to avoid delay
updateCountdown();

// Function to set the radius of myCircle based on the screen size
function setCircleRadius() {
    const circle = document.getElementById("customDash");
    const mq768 = window.matchMedia("(max-width: 768px)");
    const mq320 = window.matchMedia("(max-width: 320px)");
  
    // Set the radius based on the screen size
    if (mq320.matches) {
      circle.setAttribute("r", "80px");
    } else if (mq768.matches) {
      circle.setAttribute("r", "130px");
    } else {
      circle.setAttribute("r", "150px");
    }
  }
  
  // Call the function initially to set the radius based on the current screen size
  setCircleRadius();
  
  // Add an event listener to handle screen size changes
  window.addEventListener("resize", setCircleRadius);
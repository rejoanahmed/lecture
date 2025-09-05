// Get the clock hands from the HTML
const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");

// Function to update the clock
function updateClock() {
	// Get current time
	const now = new Date();

	// Get hours, minutes, and seconds
	const hours = now.getHours();
	const minutes = now.getMinutes();
	const seconds = now.getSeconds();

	const hourAngle = (hours % 12) * 30 + minutes * 0.5; // Add minute offset for smooth hour movement
	const minuteAngle = minutes * 6 + seconds * 0.1; // Add second offset for smooth minute movement
	const secondAngle = seconds * 6;

	// Apply rotation to the hands
	hourHand.style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
	minuteHand.style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
	secondHand.style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;
}

// Update the clock immediately when page loads
updateClock();

// Update the clock every second (1000 milliseconds)
setInterval(updateClock, 1000);

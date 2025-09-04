class ColorGenerator {
	constructor() {
		this.colorHistory = [];
		this.maxHistoryLength = 12;
		this.initializeElements();
		this.attachEventListeners();
		this.generateRandomColor();
	}

	initializeElements() {
		this.colorBox = document.getElementById("colorBox");
		this.colorText = document.getElementById("colorText");
		this.copyBtn = document.getElementById("copyBtn");
		this.generateBtn = document.getElementById("generateBtn");
		this.historyGrid = document.getElementById("historyGrid");
	}

	attachEventListeners() {
		this.generateBtn.addEventListener("click", () =>
			this.generateRandomColor(),
		);
		this.copyBtn.addEventListener("click", () => this.copyToClipboard());
		this.colorBox.addEventListener("click", () => this.copyToClipboard());

		// Keyboard shortcuts
		document.addEventListener("keydown", (e) => {
			if (e.code === "Space") {
				e.preventDefault();
				this.generateRandomColor();
			} else if (e.ctrlKey && e.key === "c") {
				e.preventDefault();
				this.copyToClipboard();
			}
		});
	}

	generateRandomColor() {
		const color = this.getRandomHexColor();
		this.setCurrentColor(color);
		this.addToHistory(color);
		this.animateColorChange();
	}

	getRandomHexColor() {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	setCurrentColor(color) {
		this.colorBox.style.backgroundColor = color;
		this.colorText.textContent = color;

		// Update button colors to match the generated color
		this.copyBtn.style.backgroundColor = color;

		// Adjust text color based on brightness
		const brightness = this.getColorBrightness(color);
		this.copyBtn.style.color = brightness > 128 ? "#000" : "#fff";
	}

	getColorBrightness(hex) {
		// Convert hex to RGB
		const r = Number.parseInt(hex.slice(1, 3), 16);
		const g = Number.parseInt(hex.slice(3, 5), 16);
		const b = Number.parseInt(hex.slice(5, 7), 16);

		// Calculate brightness using luminance formula
		return (r * 299 + g * 587 + b * 114) / 1000;
	}

	addToHistory(color) {
		// Avoid duplicates
		if (this.colorHistory.includes(color)) {
			return;
		}

		this.colorHistory.unshift(color);

		// Limit history length
		if (this.colorHistory.length > this.maxHistoryLength) {
			this.colorHistory.pop();
		}

		this.updateHistoryDisplay();
	}

	updateHistoryDisplay() {
		this.historyGrid.innerHTML = "";

		this.colorHistory.forEach((color) => {
			const historyItem = document.createElement("div");
			historyItem.className = "history-color";
			historyItem.style.backgroundColor = color;
			historyItem.setAttribute("data-color", color);
			historyItem.title = `Click to use ${color}`;

			historyItem.addEventListener("click", () => {
				this.setCurrentColor(color);
				this.animateColorChange();
			});

			this.historyGrid.appendChild(historyItem);
		});
	}

	animateColorChange() {
		this.colorBox.style.transform = "scale(0.95)";
		setTimeout(() => {
			this.colorBox.style.transform = "scale(1)";
		}, 150);
	}

	async copyToClipboard() {
		const color = this.colorText.textContent;

		try {
			await navigator.clipboard.writeText(color);
			this.showToast(`Copied ${color} to clipboard!`);
		} catch (err) {
			// Fallback for older browsers
			this.fallbackCopyToClipboard(color);
		}
	}

	fallbackCopyToClipboard(text) {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style.position = "fixed";
		textArea.style.left = "-999999px";
		textArea.style.top = "-999999px";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			document.execCommand("copy");
			this.showToast(`Copied ${text} to clipboard!`);
		} catch (err) {
			this.showToast("Failed to copy color code");
		}

		document.body.removeChild(textArea);
	}

	showToast(message) {
		// Remove existing toast if any
		const existingToast = document.querySelector(".toast");
		if (existingToast) {
			existingToast.remove();
		}

		const toast = document.createElement("div");
		toast.className = "toast";
		toast.textContent = message;
		document.body.appendChild(toast);

		// Trigger animation
		setTimeout(() => toast.classList.add("show"), 100);

		// Remove toast after 3 seconds
		setTimeout(() => {
			toast.classList.remove("show");
			setTimeout(() => toast.remove(), 300);
		}, 3000);
	}

	// Additional color format methods
	hexToRgb(hex) {
		const r = Number.parseInt(hex.slice(1, 3), 16);
		const g = Number.parseInt(hex.slice(3, 5), 16);
		const b = Number.parseInt(hex.slice(5, 7), 16);
		return { r, g, b };
	}

	hexToHsl(hex) {
		const { r, g, b } = this.hexToRgb(hex);
		const rNorm = r / 255;
		const gNorm = g / 255;
		const bNorm = b / 255;

		const max = Math.max(rNorm, gNorm, bNorm);
		const min = Math.min(rNorm, gNorm, bNorm);
		let h,
			s,
			l = (max + min) / 2;

		if (max === min) {
			h = s = 0; // achromatic
		} else {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case rNorm:
					h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
					break;
				case gNorm:
					h = (bNorm - rNorm) / d + 2;
					break;
				case bNorm:
					h = (rNorm - gNorm) / d + 4;
					break;
			}
			h /= 6;
		}

		return {
			h: Math.round(h * 360),
			s: Math.round(s * 100),
			l: Math.round(l * 100),
		};
	}
}

// Initialize the color generator when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	new ColorGenerator();
});

// Add some fun easter eggs
document.addEventListener("keydown", (e) => {
	// Konami code easter egg (up, up, down, down, left, right, left, right, b, a)
	if (!window.konamiSequence) {
		window.konamiSequence = [];
		window.konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
	}

	window.konamiSequence.push(e.keyCode);

	if (window.konamiSequence.length > window.konamiCode.length) {
		window.konamiSequence.shift();
	}

	if (window.konamiSequence.join(",") === window.konamiCode.join(",")) {
		document.body.style.animation = "rainbow 2s infinite";
		setTimeout(() => {
			document.body.style.animation = "";
		}, 10000);
	}
});

// Add rainbow animation CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

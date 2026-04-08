document.querySelectorAll('a[href^="#"]').forEach((link) => {
	link.addEventListener("click", (event) => {
		const targetId = link.getAttribute("href");

		if (!targetId || targetId === "#") {
			return;
		}

		const target = document.querySelector(targetId);
		if (!target) {
			return;
		}

		event.preventDefault();
		target.scrollIntoView({ behavior: "smooth", block: "start" });
	});
});

const revealItems = document.querySelectorAll(".hero-copy, .hero-visual, .product-card, .about-grid > div, .certificate-card, .footer-meta-card");

if ("IntersectionObserver" in window && revealItems.length) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = "1";
					entry.target.style.transform = "translateY(0) scale(1)";
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.14 }
	);

	revealItems.forEach((item, index) => {
		item.style.opacity = "0";
		item.style.transform = "translateY(22px) scale(0.985)";
		item.style.transition = `opacity 0.55s ease ${Math.min(index * 0.05, 0.35)}s, transform 0.55s ease ${Math.min(index * 0.05, 0.35)}s`;
		observer.observe(item);
	});
}

document.querySelectorAll(".product-card").forEach((card) => {
	card.addEventListener("mousemove", (event) => {
		const bounds = card.getBoundingClientRect();
		const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 6;
		const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 6;
		card.style.transform = `translateY(-4px) rotateX(${-y}deg) rotateY(${x}deg)`;
	});

	card.addEventListener("mouseleave", () => {
		card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
	});
});




const enquiryForm = document.getElementById("enquiry-form");

if (enquiryForm) {
	const phoneInput = document.getElementById("phone");
	const requirementsInput = document.getElementById("requirements");
	const contactNameInput = document.getElementById("contact-name");
	const cityInput = document.getElementById("city");

	if (phoneInput) {
		phoneInput.addEventListener("input", () => {
			phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
			phoneInput.setCustomValidity("");
		});
	}

	[contactNameInput, cityInput].forEach((input) => {
		if (!input) {
			return;
		}

		input.addEventListener("input", () => {
			input.setCustomValidity("");
		});
	});

	if (requirementsInput) {
		requirementsInput.addEventListener("input", () => {
			requirementsInput.setCustomValidity("");
		});
	}

	enquiryForm.addEventListener("submit", (event) => {
		const phoneValue = phoneInput ? phoneInput.value.trim() : "";
		const requirementsValue = requirementsInput ? requirementsInput.value.trim() : "";
		const nameValue = contactNameInput ? contactNameInput.value.trim() : "";
		const cityValue = cityInput ? cityInput.value.trim() : "";

		if (phoneInput && !/^\d{10}$/.test(phoneValue)) {
			phoneInput.setCustomValidity("Phone number must be exactly 10 digits.");
			phoneInput.reportValidity();
			event.preventDefault();
			return;
		}

		if (contactNameInput && !/^[A-Za-z][A-Za-z\s.'-]{1,49}$/.test(nameValue)) {
			contactNameInput.setCustomValidity("Enter a valid name using letters only.");
			contactNameInput.reportValidity();
			event.preventDefault();
			return;
		}

		if (cityInput && !/^[A-Za-z][A-Za-z\s.-]{1,49}$/.test(cityValue)) {
			cityInput.setCustomValidity("Enter a valid city name using letters only.");
			cityInput.reportValidity();
			event.preventDefault();
			return;
		}

		if (requirementsInput && requirementsValue.length < 10) {
			requirementsInput.setCustomValidity("Requirements must be at least 10 characters.");
			requirementsInput.reportValidity();
			event.preventDefault();
		}
	});
}


	// js for google sheet 

	const form = document.getElementById("enquiry-form");
	const btn = document.querySelector(".btn-submit");

	form.addEventListener("submit", async (e) => {
	e.preventDefault();

	// Check validation
	if (!form.checkValidity()) {
		form.reportValidity();
		return;
	}

	const formData = {
		firmName: document.getElementById("firm-name").value,
		contactName: document.getElementById("contact-name").value,
		email: document.getElementById("email").value,
		phone: document.getElementById("phone").value,
		city: document.getElementById("city").value,
		requirements: document.getElementById("requirements").value,
	};

	try {
		// 🔄 Loading state
		btn.innerText = "Submitting...";
		btn.disabled = true;

		await fetch("https://script.google.com/macros/s/AKfycbyx0AKML_8y6mR_rjCGFRwo0JrC68jRWPWrjVPd4UtdpwHK9ghCe-6Tm0gJzMZtQohCSg/exec", {
		method: "POST",
		body: JSON.stringify(formData),
		mode: "no-cors",
		});

		// ✅ Success UI
		btn.innerText = "Submitted ✅";
		form.reset();

		setTimeout(() => {
		btn.innerText = "Get Quote";
		btn.disabled = false;
		}, 2000);

	} catch (error) {
		console.error(error);

		// ❌ Error UI
		btn.innerText = "Try Again ❌";

		setTimeout(() => {
		btn.innerText = "Get Quote";
		btn.disabled = false;
		}, 2000);
	}
	});
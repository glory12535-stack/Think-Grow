const mainNav = document.querySelector("#mainNav");

mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        bootstrap.Collapse.getInstance(mainNav)?.hide();
    });
});

const actionDetails = {
    travel: ["Plan one car-free journey this week.", "Walk, cycle, use public transport or share a lift for one journey. Invite someone to join you."],
    energy: ["Choose one energy habit today.", "Turn off lights when you leave a room, take a shorter shower or switch devices off instead of leaving them on standby."],
    school: ["Find one way to act together.", "Ask about joining an eco-club, starting a recycling drive or helping your school plant and care for trees."],
    voice: ["Share one reliable climate fact.", "Use a trusted source, challenge a myth kindly and support ideas that make your community healthier and greener."]
};

const actionTip = document.querySelector("#actionTip");

// Selecting a card changes the practical suggestion underneath it.
document.querySelectorAll(".action-card").forEach((card) => {
    card.addEventListener("click", () => {
        document.querySelectorAll(".action-card").forEach((item) => {
            item.classList.remove("selected");
            item.setAttribute("aria-pressed", "false");
        });
        card.classList.add("selected");
        card.setAttribute("aria-pressed", "true");

        const [title, description] = actionDetails[card.dataset.action];
        actionTip.querySelector("h3").textContent = title;
        actionTip.querySelector("p:last-child").textContent = description;
    });
});

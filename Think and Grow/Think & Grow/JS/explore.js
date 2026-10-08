const mainNav = document.querySelector("#mainNav");

mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        bootstrap.Collapse.getInstance(mainNav)?.hide();
    });
});

const filterButtons = document.querySelectorAll(".filter-button");
const videoCards = document.querySelectorAll(".video-card");
const videoCount = document.querySelector("#videoCount");

// Show only cards that match the selected topic.
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;
        let visibleVideos = 0;
        videoCards.forEach((card) => {
            const shouldShow = filter === "all" || card.dataset.topic === filter;
            card.hidden = !shouldShow;
            if (shouldShow) visibleVideos += 1;
        });
        videoCount.textContent = `${visibleVideos} ${visibleVideos === 1 ? "video" : "videos"}`;
    });
});

const featuredTitle = document.querySelector("#featuredTitle");
const featuredTopic = document.querySelector("#featuredTopic");
const featuredDescription = document.querySelector("#featuredDescription");
const featuredFrame = document.querySelector(".video-embed iframe");

// Update the large lesson area when a student selects a video card.
videoCards.forEach((card) => {
    const videoSelector = card.querySelector(".video-select");
    videoSelector.addEventListener("click", () => {
        featuredTitle.textContent = card.dataset.title;
        featuredTopic.textContent = card.dataset.label;
        featuredDescription.textContent = card.dataset.description;
        if (card.dataset.videoUrl) {
            featuredFrame.src = card.dataset.videoUrl;
        }
        document.querySelector("#featuredVideo").scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

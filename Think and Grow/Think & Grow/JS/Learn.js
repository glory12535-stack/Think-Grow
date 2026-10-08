const mainNav = document.querySelector("#mainNav");

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    bootstrap.Collapse.getInstance(mainNav)?.hide();
  });
});

// These are rounded grouped estimates.
// They total 100%, making the chart easy to read and compare.
const categories = {
  energy: {
    label: "Energy",
    icon: "▥",
    title: "Energy production burns fossil fuels.",
    description: "Burning coal, oil and gas to make electricity and heat releases large amounts of carbon dioxide into the atmosphere.",
    percent: 34,
    summary: "The biggest share in this learning model."
  },
  transport: {
    label: "Transport",
    icon: "↗",
    title: "Transport burns fuel to move people and goods.",
    description: "Cars, lorries, ships and planes mostly use petrol, diesel or other fossil fuels, releasing carbon dioxide as they travel.",
    percent: 24,
    summary: "Travel choices and transport systems both matter."
  },
  agriculture: {
    label: "Agriculture",
    icon: "♧",
    title: "Farming releases more than carbon dioxide.",
    description: "Livestock produce methane, fertilisers release nitrous oxide, and farming uses energy and land to grow and move food.",
    percent: 22,
    summary: "Food systems create several greenhouse gases."
  },
  deforestation: {
    label: "Deforestation",
    icon: "⌁",
    title: "Losing trees removes a natural carbon store.",
    description: "Trees absorb carbon dioxide as they grow. When forests are cut or burned, stored carbon is released and less carbon can be removed from the air.",
    percent: 20,
    summary: "Land-use change affects both carbon and biodiversity."
  }
};

const tabs = document.querySelectorAll(".category-tab");
const overviewPanel = document.querySelector("#overviewPanel");
const categoryPanel = document.querySelector("#categoryPanel");
const categoryIcon = document.querySelector("#categoryIcon");
const categoryLabel = document.querySelector("#categoryLabel");
const categoryTitle = document.querySelector("#categoryTitle");
const categoryDescription = document.querySelector("#categoryDescription");
const categoryDonut = document.querySelector("#categoryDonut");
const categoryPercent = document.querySelector("#categoryPercent");
const chartTitle = document.querySelector("#chartTitle");
const chartSummary = document.querySelector("#chartSummary");
const categoryBar = document.querySelector("#categoryBar");

function showCategory(categoryName) {
  if (categoryName === "overview") {
    overviewPanel.classList.remove("hidden");
    categoryPanel.classList.add("hidden");
    return;
  }

  const category = categories[categoryName];
  overviewPanel.classList.add("hidden");
  categoryPanel.classList.remove("hidden");
  categoryPanel.setAttribute("aria-labelledby", `${categoryName}Tab`);
  categoryIcon.textContent = category.icon;
  categoryLabel.textContent = category.label;
  categoryTitle.textContent = category.title;
  categoryDescription.textContent = category.description;
  categoryPercent.innerHTML = `${category.percent}%<small>of emissions</small>`;
  chartTitle.textContent = category.label;
  chartSummary.textContent = category.summary;
  categoryBar.style.width = `${category.percent}%`;
  categoryDonut.style.setProperty("--category-value", `${category.percent}%`);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    showCategory(tab.dataset.category);
  });
});

document.querySelector(".learn-more").addEventListener("click", () => {
  window.open(
    "https://www.bbc.co.uk/bitesize/articles/zvnm2v4#zgfsn9q",
    "_blank"
  );
});
document.querySelector("#nextFact").addEventListener("click", () => {
  const current = document.querySelector(".category-tab.active").dataset.category;
  const names = Object.keys(categories);
  const nextName = names[(names.indexOf(current) + 1) % names.length];
  document.querySelector(`[data-category="${nextName}"]`).click();
});


const mainNav = document.querySelector("#mainNav");

// Bootstrap handles opening the menu; this closes it after navigation.
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    bootstrap.Collapse.getInstance(mainNav)?.hide();
  });
});


const filters = document.querySelectorAll(".filter");
const cards = [...document.querySelectorAll(".article-card")];
const count = document.getElementById("articleCount");
const noResults = document.getElementById("noResults");
const searchToggle = document.getElementById("searchToggle");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");
const searchClose = document.getElementById("searchClose");
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".desktop-nav");

let activeFilter = "all";

function renderArticles() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach(card => {
    const category = card.dataset.category;
    const text = card.dataset.search.toLowerCase();
    const categoryMatch = activeFilter === "all" || category === activeFilter;
    const searchMatch = !term || text.includes(term);

    if (categoryMatch && searchMatch) {
      card.classList.remove("hidden");
      visible++;
    } else {
      card.classList.add("hidden");
    }
  });

  count.textContent = `${visible} लेख`;
  noResults.classList.toggle("show", visible === 0);
}

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    filter.classList.add("active");
    activeFilter = filter.dataset.filter;
    renderArticles();
  });
});

document.querySelectorAll(".category").forEach(category => {
  category.addEventListener("click", () => {
    const selected = category.dataset.category;
    const matchingFilter = [...filters].find(f => f.dataset.filter === selected);
    if (matchingFilter) matchingFilter.click();
    document.querySelector("#articles").scrollIntoView({ behavior: "smooth" });
  });
});

searchToggle.addEventListener("click", () => {
  searchPanel.classList.toggle("open");
  if (searchPanel.classList.contains("open")) searchInput.focus();
});

searchClose.addEventListener("click", () => {
  searchPanel.classList.remove("open");
  searchInput.value = "";
  renderArticles();
});

searchInput.addEventListener("input", renderArticles);

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".desktop-nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".mobile-nav a").forEach(x => x.classList.remove("active"));
    link.classList.add("active");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
renderArticles();

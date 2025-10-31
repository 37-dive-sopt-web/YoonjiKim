import { getLocalStorage } from "./localStorage.js";

const searchForm = document.querySelector(".search-form");
let currentFilteredData = [];

const initializeFilter = () => {
  searchForm.addEventListener("submit", handleFilterSubmit);
  searchForm.addEventListener("reset", handleFilterReset);
};

const handleFilterSubmit = (e) => {
  e.preventDefault();

  const allMembers = getLocalStorage();
  const filteredData = searchFilter(allMembers);

  currentFilteredData = filteredData;

  // Todo: 표 렌더링 추가
};

const handleFilterReset = () => {
  setTimeout(() => {
    const allMembers = getLocalStorage();
    currentFilteredData = allMembers;

    // Todo: 표 렌더링 추가
  }, 0);
};

const searchFilter = (data) => {
  const nameFilter = document.getElementById("search-name");
  const engNameFilter = document.getElementById("search-eng-name");
  const githubFilter = document.getElementById("search-github-id");
  const genderFilter = document.getElementById("search-gender");
  const roleFilter = document.getElementById("search-role");
  const groupFilter = document.getElementById("search-code-review-team");
  const ageFilter = document.getElementById("search-age");

  const name = (nameFilter?.value || "").trim().toLowerCase();
  const engName = (engNameFilter?.value || "").trim().toLowerCase();
  const github = (githubFilter?.value || "").trim().toLowerCase();
  const gender = genderFilter?.value || "";
  const role = roleFilter?.value || "";
  const codeReviewGroup = parseInt(groupFilter?.value || "", 10);
  const age = parseInt(ageFilter?.value || "", 10);

  return data.filter((member) => {
    const matchName = !name || member.name.toLowerCase().includes(name);
    const matchEngName =
      !engName || member.englishName.toLowerCase().includes(engName);
    const matchGithub = !github || member.github.toLowerCase().includes(github);
    const matchGender = !gender || gender === member.gender;
    const matchRole = !role || role === member.role;
    const matchGroup =
      !Number.isFinite(codeReviewGroup) ||
      member.codeReviewGroup === codeReviewGroup;
    const matchAge = !Number.isFinite(age) || member.age === age;

    return (
      matchName &&
      matchEngName &&
      matchGithub &&
      matchGender &&
      matchRole &&
      matchGroup &&
      matchAge
    );
  });
};

const getCurrentFilteredData = () => {
  return currentFilteredData;
};

const setCurrentFilteredData = (data) => {
  currentFilteredData = data;
};


export { initializeFilter, setCurrentFilteredData, getCurrentFilteredData };

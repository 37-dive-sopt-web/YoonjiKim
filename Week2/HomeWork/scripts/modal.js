import { getLocalStorage, setLocalStorage } from "./localStorage.js";
import { renderTable } from "./render-table.js";
import { searchFilter } from "./filter.js";

const modal = document.getElementById("add-modal");
const addBtn = document.querySelector(".add-btn");
const closeBtn = document.querySelector(".modal-close-btn");
const backdrop = document.querySelector(".modal-backdrop");
const modalForm = document.querySelector(".modal-form");
const tbody = document.getElementById("member-table-body");

const nameInput = document.getElementById("modal-name");
const engNameInput = document.getElementById("modal-eng-name");
const githubInput = document.getElementById("modal-github-id");
const genderInput = document.getElementById("modal-gender");
const roleInput = document.getElementById("modal-role");
const codeReviewGroupInput = document.getElementById("modal-code-review-team");
const ageInput = document.getElementById("modal-age");

const initializeModal = () => {
  addBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  modalForm.addEventListener("submit", handleSubmit);
};

const openModal = () => {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = ""; // 스크롤 복원
  resetForm();
};

const resetForm = () => {
  modalForm.reset();
};

const handleSubmit = (e) => {
  e.preventDefault();

  // 유효성 검사
  if (
    !nameInput.value.trim() ||
    !engNameInput.value.trim() ||
    !githubInput.value.trim() ||
    !genderInput.value ||
    !roleInput.value ||
    !codeReviewGroupInput.value.trim() ||
    !ageInput.value.trim()
  ) {
    alert("모든 입력 항목을 입력해주세요");
    return;
  }

  const codeReviewGroup = Number(codeReviewGroupInput.value);
  const age = Number(ageInput.value);

  if (codeReviewGroup < 1 || codeReviewGroup > 9) {
    alert("금잔디조는 1부터 9 사이의 숫자를 입력해주세요!");
    return;
  }

  if (age < 0) {
    alert("올바른 나이를 입력해주세요!");
    return;
  }

  const allMembers = getLocalStorage();

  const newMember = {
    id: Date.now(),
    name: nameInput.value.trim(),
    englishName: engNameInput.value.trim(),
    github: githubInput.value.trim(),
    gender: genderInput.value,
    role: roleInput.value,
    codeReviewGroup,
    age,
  };

  allMembers.push(newMember);
  setLocalStorage(allMembers);

  // 현재 필터 조건 재적용해서 렌더링
  const filteredData = searchFilter(allMembers);
  renderTable(filteredData, tbody);

  closeModal();
};

export { initializeModal };

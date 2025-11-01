import { getLocalStorage, setLocalStorage } from "./localStorage.js";
import { renderTable } from "./render-table.js";
import { searchFilter } from "./filter.js";

const selectAllCheckbox = document.getElementById("select-all");
const deleteBtn = document.querySelector(".delete-btn");
const tbody = document.getElementById("member-table-body");

const initializeCheckbox = () => {
  selectAllCheckbox.addEventListener("change", handleSelectAll);
  tbody.addEventListener("change", handleIndividualCheckbox);
  deleteBtn.addEventListener("click", handleDeleteSelected);
};

const handleSelectAll = (e) => {
  const isChecked = e.target.checked;
  const memberCheckboxes = document.querySelectorAll(".member-checkbox");

  memberCheckboxes.forEach((checkbox) => {
    checkbox.checked = isChecked;
  });
};

const handleIndividualCheckbox = (e) => {
  if (e.target.classList.contains("member-checkbox")) {
    updateSelectAllCheckbox();
  }
};

const updateSelectAllCheckbox = () => {
  const memberCheckboxes = document.querySelectorAll(".member-checkbox");
  const checkedCheckboxes = document.querySelectorAll(
    ".member-checkbox:checked"
  );

  if (memberCheckboxes.length === 0) {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = false;
    return;
  }

  if (checkedCheckboxes.length === 0) {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = false;
  } else if (checkedCheckboxes.length === memberCheckboxes.length) {
    selectAllCheckbox.checked = true;
    selectAllCheckbox.indeterminate = false;
  } else {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = true;
  }
};

const handleDeleteSelected = () => {
  const checkedCheckboxes = document.querySelectorAll(
    ".member-checkbox:checked"
  );

  if (checkedCheckboxes.length === 0) {
    alert("삭제할 항목을 선택해주세요.");
    return;
  }

  const confirmDelete = confirm("삭제하시겠습니까?");

  if (!confirmDelete) return;

  const selectedIds = Array.from(checkedCheckboxes).map((checkbox) =>
    parseInt(checkbox.dataset.id)
  );

  const selectedIdsSet = new Set(selectedIds);

  const allMembers = getLocalStorage();
  const updatedMembers = allMembers.filter(
    (member) => !selectedIdsSet.has(member.id)
  );
  setLocalStorage(updatedMembers);

  // 현재 필터 조건 재적용해서 렌더링
  const filteredData = searchFilter(updatedMembers);
  renderTable(filteredData, tbody);

  selectAllCheckbox.checked = false;
  selectAllCheckbox.indeterminate = false;
};

const updateCheckboxState = () => {
  selectAllCheckbox.checked = false;
  selectAllCheckbox.indeterminate = false;
};

export { initializeCheckbox, updateCheckboxState };

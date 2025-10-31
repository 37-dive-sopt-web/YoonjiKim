const memberTableBody = document.getElementById("member-table-body");

const renderTable = (data) => {

  const tableHTML = data
    .map(
      ({
        id,
        name,
        engName,
        github,
        gender,
        role,
        codeReviewGroup,
        age,
      }) => `
        <tr>
          <td><input type="checkbox" class="member-checkbox" data-id="${id}"/></td>
          <td>${name}</td>
          <td>${engName}</td>
          <td>
            <a href="https://github.com/${github}" target="_blank" rel="noopener noreferrer">
              ${github}
            </a>
          </td>
          <td>${gender === "male" ? "남성" : "여성"}</td>
          <td>${role}</td>
          <td>${codeReviewGroup}</td>
          <td>${age}</td>
        </tr>
      `
    )
    .join("");

  memberTableBody.innerHTML = tableHTML;
};

export { renderTable };
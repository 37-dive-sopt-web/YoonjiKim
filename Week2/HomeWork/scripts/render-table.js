const renderTable = (data, tbody) => {
  const tableHTML = data
    .map(
      ({
        id,
        name,
        englishName,
        github,
        gender,
        role,
        codeReviewGroup,
        age,
      }) => `
        <tr>
          <td><input type="checkbox" class="member-checkbox" data-id="${id}"/></td>
          <td>${name}</td>
          <td>${englishName}</td>
          <td>
            <a href="https://github.com/${github}" target="_blank" rel="noopener noreferrer">
              ${github}
            </a>
          </td>
          <td>${gender === "male" ? "남자" : "여자"}</td>
          <td>${role}</td>
          <td>${codeReviewGroup}</td>
          <td>${age}세</td>
        </tr>
      `
    )
    .join("");

  tbody.innerHTML = tableHTML;
};

export { renderTable };

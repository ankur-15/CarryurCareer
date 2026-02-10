async function predict() {
  const rank = document.getElementById("rank").value;
  const category = document.getElementById("category").value;

  const response = await fetch(
    `http://127.0.0.1:8000/predict?rank=${rank}&category=${category}`
  );

  const data = await response.json();
  console.log(data);

  const tbody = document.querySelector("#resultTable tbody");
  tbody.innerHTML = "";

  data.results.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.college}</td>
      <td>${item.branch}</td>
      <td>${item.closing_rank}</td>
      <td>${item.chance}</td>
    `;
    tbody.appendChild(row);
  });
}

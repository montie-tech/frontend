document.getElementById("imageForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById("imageInput");
  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  const response = await fetch("/upload_image", {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  const container = document.getElementById("imageResult");
  container.innerHTML = `
    <h3>Detected Ingredients</h3>
    <p>${data.ingredients}</p>
    <h3>Suggested Recipes</h3>
    ${data.recipes.map(r => `
      <div class="card">
        <h4>${r.title}</h4>
        <p><strong>Ingredients:</strong> ${r.ingredients}</p>
        <p><strong>Instructions:</strong> ${r.instructions}</p>
      </div>
    `).join("")}
  `;
});

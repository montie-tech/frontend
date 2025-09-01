const backendURL = "https://backi-2.onrender.com"; // Replace with your Render link

// Search Recipes
document.getElementById("getRecipesBtn").addEventListener("click", async () => {
    const ingredients = document.getElementById("ingredients").value;
    if (!ingredients) return alert("Please enter ingredients!");

    try {
        const res = await fetch(`${backendURL}/recipes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients })
        });
        const data = await res.json();
        displayRecipes(data.recipes);
    } catch (err) {
        console.error(err);
        alert("Error fetching recipes!");
    }
});

// Detect Ingredients from Image
document.getElementById("imageForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const imageInput = document.getElementById("imageInput").files[0];
    if (!imageInput) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("image", imageInput);

    try {
        const res = await fetch(`${backendURL}/detect-ingredients`, {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        document.getElementById("imageResult").innerHTML = `<p><strong>Detected Ingredients:</strong> ${data.ingredients.join(", ")}</p>`;
    } catch (err) {
        console.error(err);
        alert("Error detecting ingredients!");
    }
});

// Display Recipes
function displayRecipes(recipes) {
    const container = document.getElementById("recipes");
    container.innerHTML = "";

    if (!recipes.length) {
        container.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    recipes.forEach(r => {
        const div = document.createElement("div");
        div.className = "recipe-card";
        div.innerHTML = `
            <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" alt="${r.title}">
            <div class="card-content">
                <h3>${r.title}</h3>
                <p>${r.description}</p>
                <button>Save Recipe</button>
            </div>
        `;
        container.appendChild(div);
    });
}


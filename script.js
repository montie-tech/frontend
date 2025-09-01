const backendURL = "https://backi-3.onrender.com"; // Replace with your Render backend link

// Search Recipes
document.getElementById("getRecipesBtn").addEventListener("click", async () => {
    const ingredients = document.getElementById("ingredients").value.trim();
    if (!ingredients) return alert("Please enter ingredients!");

    try {
        const res = await fetch(`${backendURL}/recipes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients })
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();

        // Check if recipes exist
        if (!data.recipes) {
            alert("No recipes found!");
            return;
        }

        displayRecipes(data.recipes);

    } catch (err) {
        console.error("Error fetching recipes:", err);
        alert("Error fetching recipes! Please check your backend or CORS settings.");
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

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();

        if (!data.ingredients) {
            alert("No ingredients detected!");
            return;
        }

        document.getElementById("imageResult").innerHTML = `<p><strong>Detected Ingredients:</strong> ${data.ingredients.join(", ")}</p>`;
    } catch (err) {
        console.error("Error detecting ingredients:", err);
        alert("Error detecting ingredients! Check your backend or CORS.");
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
            <img src="${r.image || 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092'}" alt="${r.title}">
            <div class="card-content">
                <h3>${r.title}</h3>
                <p>${r.description || 'No description available.'}</p>
                <button onclick="saveRecipe('${r.title}')">Save Recipe</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// Optional: Save recipe handler
function saveRecipe(title) {
    alert(`Recipe "${title}" saved!`);
}

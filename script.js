function addEducation() {
  const container = document.getElementById("educationInputs");
  const row = document.createElement("div");
  row.className = "row g-2 mb-2";
  row.innerHTML = `
    <div class="col">
      <input type="text" class="form-control education-field" placeholder="Qualification & Institution" required>
    </div>
    <div class="col">
      <input type="text" class="form-control percentage-field" placeholder="Percentage/Grade" required>
    </div>`;
  container.appendChild(row);
}

// Add new experience textarea
function addExperience() {
  const container = document.getElementById("experienceInputs");
  const textarea = document.createElement("textarea");
  textarea.className = "form-control experience-field mb-2";
  textarea.placeholder = "Your experience...";
  container.appendChild(textarea);
}

// Handle form submission
document.getElementById("resumeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Fill preview fields
  document.getElementById("cvName").textContent = document.getElementById("fullName").value;
  document.getElementById("cvEmail").textContent = document.getElementById("email").value;
  document.getElementById("cvPhone").textContent = document.getElementById("phone").value;

  // Handle photo
  const photoInput = document.getElementById("photoInput");
  const photo = document.getElementById("cvPhoto");
  if (photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photo.src = e.target.result;
    };
    reader.readAsDataURL(photoInput.files[0]);
  }

  // Education
  const eduFields = document.querySelectorAll(".education-field");
  const percFields = document.querySelectorAll(".percentage-field");
  const eduTable = document.querySelector("#cvEducationTable tbody");
  eduTable.innerHTML = "";
  eduFields.forEach((field, index) => {
    const row = `<tr><td>${field.value}</td><td>${percFields[index].value}</td></tr>`;
    eduTable.innerHTML += row;
  });

  // Experience
  const experiences = document.querySelectorAll(".experience-field");
  const expList = document.getElementById("cvExperienceList");
  expList.innerHTML = "";
  experiences.forEach(exp => {
    if (exp.value.trim()) {
      const li = document.createElement("li");
      li.textContent = exp.value;
      expList.appendChild(li);
    }
  });

  // Skills
  const skills = document.getElementById("skills").value.split(",");
  const skillList = document.getElementById("cvSkills");
  skillList.innerHTML = "";
  skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill.trim();
    skillList.appendChild(li);
  });

  // Projects & Hobbies
  document.getElementById("cvProjects").textContent = document.getElementById("projects").value;
  document.getElementById("cvHobbies").textContent = document.getElementById("hobbies").value;

  // Show the preview section
  document.getElementById("cvPreview").classList.remove("d-none");
});
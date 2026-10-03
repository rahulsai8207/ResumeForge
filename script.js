// ================= PAGE NAVIGATION =================

function startBuilder() {
    document.getElementById("landing").classList.remove("active");
    document.getElementById("builder").classList.add("active");

    window.scrollTo(0, 0);
}

function goHome() {
    document.getElementById("builder").classList.remove("active");
    document.getElementById("landing").classList.add("active");

    window.scrollTo(0, 0);
}

function showTemplates() {
    document.getElementById("templates")?.scrollIntoView({
        behavior: "smooth"
    });
}


// ================= RESUME UPDATE =================

function getValue(id, fallback) {
    const element = document.getElementById(id);

    if (!element || !element.value.trim()) {
        return fallback;
    }

    return element.value.trim();
}


function updateResume() {

    document.getElementById("previewName").textContent =
        getValue("name", "Your Name");

    document.getElementById("previewRole").textContent =
        getValue("role", "Professional Title");

    document.getElementById("previewEmail").textContent =
        getValue("email", "email@example.com");

    document.getElementById("previewPhone").textContent =
        getValue("phone", "+91 XXXXX XXXXX");

    document.getElementById("previewLocation").textContent =
        getValue("location", "India");

    document.getElementById("previewSummary").textContent =
        getValue(
            "summary",
            "Your professional summary will appear here."
        );

    document.getElementById("previewDegree").textContent =
        getValue(
            "degree",
            "Degree / Course"
        );

    document.getElementById("previewCollege").textContent =
        getValue(
            "college",
            "College / University"
        );

    document.getElementById("previewYear").textContent =
        getValue(
            "year",
            "Year"
        );


    // ================= SKILLS =================

    const skills = getValue(
        "skills",
        "HTML,CSS,JavaScript"
    );

    const skillArray = skills
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== "");

    const skillContainer =
        document.getElementById("previewSkills");

    skillContainer.innerHTML = "";

    skillArray.forEach(skill => {

        const span = document.createElement("span");

        span.textContent = skill;

        skillContainer.appendChild(span);

    });


    // ================= PROJECT =================

    document.getElementById("previewProject").textContent =
        getValue(
            "projectName",
            "Your Project"
        );

    document.getElementById("previewProjectDescription").textContent =
        getValue(
            "projectDescription",
            "Your project description."
        );


    // ================= EXPERIENCE =================

    document.getElementById("previewPosition").textContent =
        getValue(
            "position",
            "Position"
        );

    document.getElementById("previewCompany").textContent =
        getValue(
            "company",
            "Company"
        );

    document.getElementById("previewExperience").textContent =
        getValue(
            "experience",
            "Your experience."
        );


    calculateCompletion();

    saveData();
}


// ================= COMPLETION =================

function calculateCompletion() {

    const fields = [
        "name",
        "role",
        "email",
        "phone",
        "location",
        "summary",
        "degree",
        "college",
        "year",
        "skills",
        "projectName",
        "projectDescription"
    ];

    let completed = 0;

    fields.forEach(id => {

        const element = document.getElementById(id);

        if (element && element.value.trim() !== "") {
            completed++;
        }

    });

    const percentage =
        Math.round((completed / fields.length) * 100);

    document.getElementById("completion")
        .textContent = percentage + "%";

    document.getElementById("progressBar")
        .style.width = percentage + "%";
}


// ================= LOCAL STORAGE =================

function saveData() {

    const inputs = document.querySelectorAll(
        "#builder input, #builder textarea"
    );

    const data = {};

    inputs.forEach(input => {
        data[input.id] = input.value;
    });

    localStorage.setItem(
        "resumeForgeData",
        JSON.stringify(data)
    );
}


function loadData() {

    const saved =
        localStorage.getItem("resumeForgeData");

    if (!saved) return;

    const data = JSON.parse(saved);

    Object.keys(data).forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.value = data[id];
        }

    });

    updateResume();
}


// ================= ATS =================

function showATS() {

    const fields = [
        "name",
        "role",
        "email",
        "phone",
        "summary",
        "degree",
        "college",
        "skills",
        "projectName",
        "projectDescription"
    ];

    let completed = 0;

    fields.forEach(id => {

        const element =
            document.getElementById(id);

        if (element && element.value.trim()) {
            completed++;
        }

    });

    let score =
        Math.round((completed / fields.length) * 100);

    // Give a little bonus for strong resume sections

    if (
        document.getElementById("experience").value.trim()
    ) {
        score += 5;
    }

    if (
        document.getElementById("linkedin").value.trim()
    ) {
        score += 5;
    }

    score = Math.min(score, 100);

    document.getElementById("atsScore")
        .textContent = score + "%";


    let message;

    if (score >= 85) {

        message =
            "Strong structure. Your resume is ready for further polishing.";

    } else if (score >= 60) {

        message =
            "Good start. Add more details and measurable achievements.";

    } else {

        message =
            "Your resume needs more information before applying.";

    }

    document.getElementById("atsMessage")
        .textContent = message;

    document.getElementById("atsModal")
        .classList.add("show");
}


function closeATS() {

    document.getElementById("atsModal")
        .classList.remove("show");
}


// ================= TEMPLATE =================

function changeTemplate() {

    const template =
        document.getElementById("template").value;

    const paper =
        document.getElementById("resumePaper");

    if (template === "minimal") {

        paper.style.boxShadow = "none";

        paper.style.border = "1px solid #ddd";

    } else {

        paper.style.boxShadow =
            "0 10px 40px rgba(0,0,0,.08)";

        paper.style.border = "none";
    }
}


// ================= START =================

document.addEventListener(
    "DOMContentLoaded",
    loadData
);
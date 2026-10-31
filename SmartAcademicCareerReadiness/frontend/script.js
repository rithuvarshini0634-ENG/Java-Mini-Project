/* =========================================================
   SMART ACADEMIC & CAREER READINESS ANALYTICS
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   GLOBAL DATA
   ========================================================= */

let studentId = null;

let studentData = {};

let academicData = {};

let skillsData = [];

let careerData = {};

let analysisData = {};





/* =========================================================
   JAVA BACKEND CONNECTION
   ========================================================= */

const API = {

    students:
        "http://localhost:8080/api/students",

    academic:
        "http://localhost:8081/api/academic",

    skills:
        "http://localhost:8082/api/skills",

    careerReadiness:
        "http://localhost:8083/api/career-readiness",

    analysis:
        "http://localhost:8084/api/analysis"

};


async function postToBackend(url, data) {

    const response =
        await fetch(
            url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

    const responseText =
        await response.text();

    let result = {};

    try {
        result = responseText
            ? JSON.parse(responseText)
            : {};
    } catch (error) {
        result = { message: responseText };
    }

    if (!response.ok) {
        throw new Error(
            result.message ||
            result.error ||
            "Backend request failed."
        );
    }

    return result;
}


function requireStudentId() {

    if (!studentId) {
        throw new Error(
            "Please save Student Profile first."
        );
    }
}

/* =========================================================
   CAREER REQUIREMENTS
   ========================================================= */

const careerRequirements = {

    "Software Developer": {

        "Java": 80,
        "Python": 70,
        "SQL": 70,
        "DSA": 80,
        "Git": 70

    },


    "Full Stack Developer": {

        "HTML/CSS": 85,
        "JavaScript": 85,
        "React": 80,
        "Node.js": 75,
        "SQL": 70,
        "Git": 70

    },


    "Web Developer": {

        "HTML/CSS": 85,
        "JavaScript": 85,
        "React": 75,
        "SQL": 60,
        "Git": 70

    },


    "Mobile App Developer": {

        "Java": 75,
        "Kotlin": 80,
        "Android": 80,
        "SQL": 65,
        "Git": 70

    },


    "Data Scientist": {

        "Python": 85,
        "SQL": 75,
        "Statistics": 80,
        "Machine Learning": 85,
        "Data Visualization": 70

    },


    "Data Analyst": {

        "Python": 70,
        "SQL": 85,
        "Excel": 80,
        "Statistics": 75,
        "Data Visualization": 80

    },


    "AI/ML Engineer": {

        "Python": 90,
        "Machine Learning": 85,
        "Deep Learning": 80,
        "Mathematics": 75,
        "SQL": 60

    },


    "Cloud Engineer": {

        "Linux": 80,
        "Networking": 85,
        "AWS/Azure": 85,
        "Docker": 75,
        "Python": 65

    },


    "DevOps Engineer": {

        "Linux": 85,
        "Git": 85,
        "Docker": 80,
        "Kubernetes": 75,
        "CI/CD": 80

    },


    "Cybersecurity Analyst": {

        "Networking": 85,
        "Linux": 75,
        "Python": 70,
        "Cybersecurity": 90,
        "Cryptography": 65

    },


    "Database Administrator": {

        "SQL": 90,
        "Database Management": 85,
        "Linux": 70,
        "Backup & Recovery": 75,
        "Networking": 65

    },


    "UI/UX Designer": {

        "UI Design": 90,
        "UX Design": 90,
        "Figma": 85,
        "Prototyping": 80,
        "User Research": 75

    },


    "Software Tester": {

        "Software Testing": 90,
        "Selenium": 80,
        "Java": 65,
        "SQL": 65,
        "API Testing": 80

    },


    "Business Analyst": {

        "Business Analysis": 85,
        "SQL": 70,
        "Excel": 80,
        "Communication": 85,
        "Data Visualization": 70

    },


    "Network Engineer": {

        "Networking": 90,
        "Linux": 75,
        "Network Security": 80,
        "Routing & Switching": 85,
        "Python": 60

    }

};



/* =========================================================
   SKILL IMPROVEMENT GUIDE
   ========================================================= */

const improvementTips = {


    "Java": {

        focus: "Strengthen Java programming fundamentals and object-oriented programming.",

        actions: [
            "Practice classes, objects, inheritance and interfaces.",
            "Build small Java console or web applications.",
            "Practice exception handling and collections.",
            "Solve programming problems using Java.",
            "Review your code and improve its structure."
        ]

    },


    "Python": {

        focus: "Improve Python programming and problem-solving ability.",

        actions: [
            "Practice Python syntax and functions.",
            "Work with lists, dictionaries and sets.",
            "Solve coding problems regularly.",
            "Build small automation or data projects.",
            "Practice writing clean and reusable functions."
        ]

    },


    "SQL": {

        focus: "Improve database querying and data manipulation skills.",

        actions: [
            "Practice SELECT, WHERE and ORDER BY.",
            "Learn INNER JOIN, LEFT JOIN and RIGHT JOIN.",
            "Practice GROUP BY and aggregate functions.",
            "Learn subqueries and nested queries.",
            "Build a small database project using MySQL."
        ]

    },


    "DSA": {

        focus: "Develop stronger algorithmic thinking and problem-solving skills.",

        actions: [
            "Start with arrays and strings.",
            "Practice linked lists, stacks and queues.",
            "Learn searching and sorting algorithms.",
            "Solve 2–3 coding problems regularly.",
            "Review mistakes after every problem."
        ]

    },


    "Git": {

        focus: "Develop practical version-control skills.",

        actions: [
            "Learn git init, clone, add and commit.",
            "Practice creating and switching branches.",
            "Learn merge and pull requests.",
            "Create projects on GitHub.",
            "Maintain meaningful commit messages."
        ]

    },


    "HTML/CSS": {

        focus: "Improve web structure, styling and responsive design.",

        actions: [
            "Practice semantic HTML.",
            "Learn Flexbox and CSS Grid.",
            "Create responsive layouts.",
            "Practice forms and accessible UI.",
            "Build complete webpages from scratch."
        ]

    },


    "JavaScript": {

        focus: "Improve frontend programming and interactive web development.",

        actions: [
            "Practice variables, functions and arrays.",
            "Learn DOM manipulation.",
            "Work with events and forms.",
            "Practice fetch API and JSON.",
            "Build interactive web applications."
        ]

    },


    "React": {

        focus: "Develop component-based frontend development skills.",

        actions: [
            "Learn components and JSX.",
            "Practice props and state.",
            "Learn useEffect and event handling.",
            "Build reusable UI components.",
            "Create a small React project."
        ]

    },


    "Node.js": {

        focus: "Improve backend JavaScript development.",

        actions: [
            "Learn Node.js fundamentals.",
            "Practice creating HTTP servers.",
            "Learn REST API development.",
            "Work with Express.",
            "Connect a Node.js application to a database."
        ]

    },


    "Kotlin": {

        focus: "Develop Kotlin programming skills for Android development.",

        actions: [
            "Learn Kotlin syntax and functions.",
            "Practice classes and objects.",
            "Learn null safety.",
            "Build simple Android screens.",
            "Create a small Android application."
        ]

    },


    "Android": {

        focus: "Strengthen Android application development skills.",

        actions: [
            "Learn Android project structure.",
            "Practice activities and layouts.",
            "Learn navigation between screens.",
            "Work with APIs and local storage.",
            "Build a small Android application."
        ]

    },


    "Statistics": {

        focus: "Strengthen statistical reasoning for data analysis.",

        actions: [
            "Review mean, median and mode.",
            "Practice variance and standard deviation.",
            "Learn probability fundamentals.",
            "Study correlation and regression.",
            "Apply statistics to real datasets."
        ]

    },


    "Machine Learning": {

        focus: "Build practical machine-learning knowledge.",

        actions: [
            "Learn supervised and unsupervised learning.",
            "Practice data preprocessing.",
            "Understand classification and regression.",
            "Build small machine-learning projects.",
            "Evaluate models using appropriate metrics."
        ]

    },


    "Deep Learning": {

        focus: "Develop knowledge of neural networks and deep learning.",

        actions: [
            "Learn neural-network fundamentals.",
            "Study activation functions.",
            "Practice with TensorFlow or PyTorch.",
            "Build a small image or text model.",
            "Understand training and validation."
        ]

    },


    "Mathematics": {

        focus: "Strengthen mathematical foundations required for AI and data-related careers.",

        actions: [
            "Review algebra and functions.",
            "Practice probability.",
            "Study vectors and matrices.",
            "Review basic calculus.",
            "Apply mathematical concepts to ML problems."
        ]

    },


    "Data Visualization": {

        focus: "Improve your ability to communicate data visually.",

        actions: [
            "Learn charts and visualization principles.",
            "Practice with Excel or Power BI.",
            "Learn Python visualization libraries.",
            "Create dashboards from real datasets.",
            "Focus on clear and meaningful visual storytelling."
        ]

    },


    "Excel": {

        focus: "Develop practical spreadsheet and analytical skills.",

        actions: [
            "Practice formulas and functions.",
            "Learn VLOOKUP or XLOOKUP.",
            "Use Pivot Tables.",
            "Create charts and dashboards.",
            "Analyze real-world datasets."
        ]

    },


    "Linux": {

        focus: "Build confidence working with Linux systems.",

        actions: [
            "Practice basic Linux commands.",
            "Learn file and directory management.",
            "Understand permissions.",
            "Practice shell commands.",
            "Set up a Linux virtual machine for practice."
        ]

    },


    "Networking": {

        focus: "Strengthen computer networking fundamentals.",

        actions: [
            "Study OSI and TCP/IP models.",
            "Learn IP addressing.",
            "Understand DNS and DHCP.",
            "Practice subnetting.",
            "Study routing and network troubleshooting."
        ]

    },


    "AWS/Azure": {

        focus: "Develop practical cloud-platform knowledge.",

        actions: [
            "Learn cloud computing fundamentals.",
            "Explore compute and storage services.",
            "Learn identity and access management.",
            "Deploy a simple application.",
            "Practice using cloud free-tier resources."
        ]

    },


    "Docker": {

        focus: "Learn containerization and application deployment.",

        actions: [
            "Understand containers and images.",
            "Learn basic Docker commands.",
            "Create a Dockerfile.",
            "Containerize a simple application.",
            "Practice Docker Compose."
        ]

    },


    "Kubernetes": {

        focus: "Develop container orchestration fundamentals.",

        actions: [
            "Learn pods and deployments.",
            "Understand services.",
            "Practice YAML configuration.",
            "Deploy a small containerized application.",
            "Learn basic scaling concepts."
        ]

    },


    "CI/CD": {

        focus: "Understand automated software build and deployment pipelines.",

        actions: [
            "Learn continuous integration concepts.",
            "Understand automated testing.",
            "Create a simple GitHub Actions workflow.",
            "Practice automated builds.",
            "Learn deployment pipeline fundamentals."
        ]

    },


    "Cybersecurity": {

        focus: "Strengthen cybersecurity concepts and defensive practices.",

        actions: [
            "Study common security threats.",
            "Learn authentication and authorization.",
            "Understand secure coding practices.",
            "Practice basic network security.",
            "Work through legal cybersecurity labs."
        ]

    },


    "Cryptography": {

        focus: "Develop foundational knowledge of cryptographic concepts.",

        actions: [
            "Learn encryption and decryption concepts.",
            "Study symmetric and asymmetric encryption.",
            "Understand hashing.",
            "Learn digital signatures.",
            "Practice cryptography concepts with small examples."
        ]

    },


    "Database Management": {

        focus: "Improve database design and administration skills.",

        actions: [
            "Study normalization.",
            "Practice database design.",
            "Learn indexes.",
            "Understand transactions.",
            "Practice database backup and maintenance."
        ]

    },


    "Backup & Recovery": {

        focus: "Develop database backup and recovery knowledge.",

        actions: [
            "Understand backup strategies.",
            "Practice database exports.",
            "Learn recovery concepts.",
            "Study transaction logs.",
            "Test restoring a sample database."
        ]

    },


    "UI Design": {

        focus: "Improve visual interface design skills.",

        actions: [
            "Study layout and spacing.",
            "Practice typography.",
            "Learn color and contrast principles.",
            "Create interface mockups.",
            "Recreate professional interfaces for practice."
        ]

    },


    "UX Design": {

        focus: "Develop user-centered design thinking.",

        actions: [
            "Study user journeys.",
            "Create user personas.",
            "Practice wireframing.",
            "Analyze usability problems.",
            "Conduct simple usability tests."
        ]

    },


    "Figma": {

        focus: "Improve interface prototyping and design workflow.",

        actions: [
            "Learn frames and components.",
            "Practice auto layout.",
            "Create reusable design components.",
            "Build interactive prototypes.",
            "Recreate existing application screens."
        ]

    },


    "Prototyping": {

        focus: "Develop practical prototyping skills.",

        actions: [
            "Create low-fidelity wireframes.",
            "Convert wireframes into high-fidelity designs.",
            "Add interactions.",
            "Test the user flow.",
            "Iterate based on feedback."
        ]

    },


    "User Research": {

        focus: "Improve understanding of user needs and behavior.",

        actions: [
            "Learn basic interview techniques.",
            "Create user surveys.",
            "Identify user pain points.",
            "Analyze feedback.",
            "Convert findings into design improvements."
        ]

    },


    "Software Testing": {

        focus: "Develop systematic software testing skills.",

        actions: [
            "Learn test cases and test scenarios.",
            "Practice functional testing.",
            "Understand regression testing.",
            "Learn defect reporting.",
            "Test your own projects systematically."
        ]

    },


    "Selenium": {

        focus: "Develop browser automation and UI testing skills.",

        actions: [
            "Learn Selenium fundamentals.",
            "Practice locating web elements.",
            "Automate form interactions.",
            "Create simple automated test cases.",
            "Learn test execution and reporting."
        ]

    },


    "API Testing": {

        focus: "Improve REST API testing skills.",

        actions: [
            "Understand HTTP methods.",
            "Learn request and response structures.",
            "Practice APIs using Postman.",
            "Test status codes.",
            "Create API test collections."
        ]

    },


    "Business Analysis": {

        focus: "Develop requirements analysis and business problem-solving skills.",

        actions: [
            "Learn requirement gathering.",
            "Practice use-case analysis.",
            "Create process diagrams.",
            "Study stakeholder management.",
            "Analyze real business problems."
        ]

    },


    "Communication": {

        focus: "Improve verbal, written and professional communication.",

        actions: [
            "Practice speaking for a few minutes every day.",
            "Participate in discussions.",
            "Practice explaining technical concepts simply.",
            "Improve professional writing.",
            "Record yourself and review your communication."
        ]

    },


    "Network Security": {

        focus: "Strengthen network protection and security concepts.",

        actions: [
            "Study firewalls and secure protocols.",
            "Learn common network attacks.",
            "Understand VPN concepts.",
            "Practice network monitoring.",
            "Study basic intrusion detection."
        ]

    },


    "Routing & Switching": {

        focus: "Develop practical routing and switching knowledge.",

        actions: [
            "Study routing fundamentals.",
            "Practice subnetting.",
            "Learn switching concepts.",
            "Study VLANs.",
            "Practice network configuration in a simulator."
        ]

    }

};



 /* =========================================================
   LOGIN SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();
        event.stopImmediatePropagation();

        const email =
            document.getElementById("loginEmail")
                ?.value
                .trim();

        const password =
            document.getElementById("loginPassword")
                ?.value
                .trim();

        const loginMessage =
            document.getElementById("loginMessage");

        if (!email || !password) {

            if (loginMessage) {
                loginMessage.textContent =
                    "Please enter your email and password.";
            }

            return;
        }

        try {

            if (loginMessage) {
                loginMessage.textContent =
                    "Checking your account...";
            }

            const response =
                await fetch(
                    "http://localhost:8080/api/students/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    }
                );

            const result =
                await response.json();

            console.log(
                "LOGIN RESPONSE:",
                result
            );

            if (!response.ok || !result.success) {

                throw new Error(
                    result.message ||
                    "Invalid email or password."
                );
            }

            /* =========================================
               STORE STUDENT INFORMATION
               ========================================= */

            studentId =
                Number(result.studentId);

            studentData = {
                name: result.name,
                email: result.email,
                department: result.department,
                year: Number(result.year)
            };


            /* =========================================
               SAVE SESSION
               ========================================= */

            localStorage.setItem(
                "loggedIn",
                "true"
            );

            localStorage.setItem(
                "studentId",
                String(studentId)
            );

            // Keep the identifier compatible with the separate learning pages.
            localStorage.setItem("currentStudentId", String(studentId));

            localStorage.setItem(
                "studentData",
                JSON.stringify(studentData)
            );

            localStorage.setItem(
                "userEmail",
                result.email
            );


            /* =========================================
               UPDATE DASHBOARD
               ========================================= */

            const name =
                document.getElementById(
                    "dashboardStudentName"
                );

            if (name) {
                name.textContent =
                    result.name;
            }


            const nameInfo =
                document.getElementById(
                    "dashboardStudentNameInfo"
                );

            if (nameInfo) {
                nameInfo.textContent =
                    result.name;
            }


            const emailInfo =
                document.getElementById(
                    "dashboardStudentEmail"
                );

            if (emailInfo) {
                emailInfo.textContent =
                    result.email;
            }


            const department =
                document.getElementById(
                    "dashboardStudentDepartment"
                );

            if (department) {
                department.textContent =
                    result.department;
            }


            const year =
                document.getElementById(
                    "dashboardStudentYear"
                );

            if (year) {

                const yearNames = {
                    1: "First Year",
                    2: "Second Year",
                    3: "Third Year",
                    4: "Fourth Year"
                };

                year.textContent =
                    yearNames[
                        Number(result.year)
                    ] ||
                    "Year " + result.year;
            }


            const profileStatus =
                document.getElementById(
                    "dashboardProfileStatus"
                );

            if (profileStatus) {
                profileStatus.textContent =
                    "Completed";
            }


            const studentStatus =
                document.getElementById(
                    "dashboardStudentStatus"
                );

            if (studentStatus) {
                studentStatus.textContent =
                    "✓ Completed";
            }


            /* =========================================
               SHOW DASHBOARD
               ========================================= */

            const loginPage =
                document.getElementById(
                    "loginPage"
                );

            const app =
                document.getElementById(
                    "app"
                );

            if (loginPage) {

                loginPage.classList.add(
                    "hidden"
                );
            }

            if (app) {

                app.classList.remove(
                    "hidden"
                );
            }


            /* =========================================
               UPDATE DASHBOARD
               ========================================= */

            if (
                typeof updateDashboard ===
                "function"
            ) {

                updateDashboard();
            }


            if (
                typeof showDashboard ===
                "function"
            ) {

                showDashboard();

            } else if (
                typeof showSection ===
                "function"
            ) {

                showSection("dashboard");
            }


            if (loginMessage) {

                loginMessage.textContent =
                    "Login successful!";
            }


            console.log(
                "Logged in student:",
                studentData
            );

        }

        catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );

            if (loginMessage) {

                loginMessage.textContent =
                    error.message;
            }
        }

    });

});

/* =========================================================
   SECTION NAVIGATION
   ========================================================= */

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(".section");


    sections.forEach(function (section) {

        section.classList.add("hidden");

    });


    const selectedSection =
        document.getElementById(sectionId);


    if (selectedSection) {

        selectedSection.classList.remove("hidden");

    }


    const navButtons =
        document.querySelectorAll(".navbar button[data-section]");


    navButtons.forEach(function (button) {

        button.classList.remove("active");

    });


    const activeButton =
        document.querySelector(
            '.navbar button[data-section="' +
            sectionId +
            '"]'
        );


    if (activeButton) {

        activeButton.classList.add("active");

    }


    if (sectionId === "dashboard") {

        updateDashboard();

    }


    if (sectionId === "analysis") {

        generateAnalysis();

    }

}



/* =========================================================
   STUDENT PROFILE
   ========================================================= */

const studentForm =
    document.getElementById("studentForm");


if (studentForm) {

    studentForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const message =
                document.getElementById("studentMessage");

            studentData = {

                name:
                    document.getElementById("studentName").value.trim(),

                email:
                    document.getElementById("studentEmail").value.trim(),

                department:
                    document.getElementById("studentDepartment").value.trim(),

                year:
                    Number(document.getElementById("studentYear").value)
            };

            try {

                if (message) {
                    message.innerHTML =
                        "Saving student profile...";
                }

                if (
                    !studentData.name ||
                    !studentData.email ||
                    !studentData.department ||
                    !studentData.year
                ) {
                    throw new Error(
                        "Please fill in all student details."
                    );
                }

                const result =
                    await postToBackend(
                        API.students,
                        studentData
                    );

                studentId =
                    Number(result.studentId);

                if (!studentId) {
                    throw new Error(
                        "Student ID was not returned by the backend."
                    );
                }

                if (message) {
                    message.innerHTML =
                        "Student profile saved successfully! Student ID: " +
                        studentId;
                }

                updateDashboard();

            } catch (error) {

                console.error(
                    "Student backend error:",
                    error
                );

                if (message) {
                    message.innerHTML =
                        "Unable to save student profile. " +
                        error.message;
                }
            }
        }
    );
}



/* =========================================================
   ACADEMIC DATA
   ========================================================= */

const academicForm =
    document.getElementById("academicForm");


if (academicForm) {

    academicForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const message =
                document.getElementById("academicMessage");

            try {

                requireStudentId();

                academicData = {

                    semester:
                        Number(document.getElementById("semester").value),

                    cgpa:
                        Number(document.getElementById("cgpa").value),

                    attendance:
                        Number(document.getElementById("attendance").value),

                    backlogs:
                        Number(document.getElementById("backlogs").value)
                };

                if (
                    !academicData.semester ||
                    Number.isNaN(academicData.cgpa) ||
                    Number.isNaN(academicData.attendance) ||
                    Number.isNaN(academicData.backlogs)
                ) {
                    throw new Error(
                        "Please enter all academic details."
                    );
                }

                await postToBackend(
                    API.academic,
                    {
                        studentId:
                            Number(studentId),

                        semester:
                            Number(academicData.semester),

                        cgpa:
                            Number(academicData.cgpa),

                        attendance:
                            Number(academicData.attendance),

                        backlogs:
                            Number(academicData.backlogs)
                    }
                );

                if (message) {
                    message.innerHTML =
                        "Academic performance saved successfully!";
                }

                updateDashboard();

            } catch (error) {

                console.error(
                    "Academic backend error:",
                    error
                );

                if (message) {
                    message.innerHTML =
                        "Unable to save academic performance. " +
                        error.message;
                }
            }
        }
    );
}



/* =========================================================
   CAREER SELECTION
   ========================================================= */

const targetCareer =
    document.getElementById("targetCareer");


if (targetCareer) {

    targetCareer.addEventListener("change", function () {

        const career =
            this.value;


        displayRequiredSkills(career);

        updateDashboard();

    });

}



/* =========================================================
   DISPLAY REQUIRED SKILLS
   ========================================================= */

function displayRequiredSkills(career) {

    const requiredSkills =
        document.getElementById("requiredSkills");


    if (!requiredSkills) {
        return;
    }


    if (!career || !careerRequirements[career]) {

        requiredSkills.innerHTML =
            "<p class='info-text'>Select a target career to view the required skills.</p>";

        return;

    }


    const requirements =
        careerRequirements[career];


    let html = "";


    Object.entries(requirements).forEach(function ([skill, required]) {

        html += `

            <div class="required-skill">

                <span>
                    ${skill}
                </span>

                <strong>
                    ${required}%
                </strong>

            </div>

        `;

    });


    requiredSkills.innerHTML = html;

}



/* =========================================================
   INITIALIZE SKILLS
   ========================================================= */

function initializeSkills() {

    const container =
        document.getElementById("skillsContainer");


    if (!container) {
        return;
    }


    if (container.children.length === 0) {

        addSkillRow();

    }

}



/* =========================================================
   ADD SKILL ROW
   ========================================================= */

function addSkillRow() {

    const container =
        document.getElementById("skillsContainer");


    if (!container) {
        return;
    }


    const row =
        document.createElement("div");


    row.className =
        "skill-row";


    row.innerHTML = `

        <input
            type="text"
            class="skill-name"
            placeholder="Example: Java">


        <input
            type="number"
            class="skill-proficiency"
            min="0"
            max="100"
            placeholder="Proficiency %">


        <button
            type="button"
            class="remove-skill"
            onclick="this.parentElement.remove()">

            Remove

        </button>

    `;


    container.appendChild(row);

}



/* =========================================================
   ANALYZE SKILLS
   ========================================================= */

async function analyzeSkills() {

    const careerElement =
        document.getElementById("targetCareer");

    if (!careerElement) {
        return;
    }

    const career =
        careerElement.value;

    if (!career) {
        alert("Please select a target career first.");
        return;
    }

    const rows =
        document.querySelectorAll(".skill-row");

    skillsData = [];

    rows.forEach(function (row) {

        const name =
            row.querySelector(".skill-name")
                .value
                .trim();

        const proficiency =
            Number(
                row.querySelector(".skill-proficiency").value
            );

        if (name && !Number.isNaN(proficiency)) {

            skillsData.push({
                name: name,
                proficiency: proficiency
            });
        }
    });

    if (skillsData.length === 0) {
        alert("Please add at least one skill.");
        return;
    }

    calculateSkillAnalysis();

    try {

        requireStudentId();

        for (const skill of skillsData) {

            await postToBackend(
                API.skills,
                {
                    studentId:
                        Number(studentId),

                    skillName:
                        skill.name,

                    proficiency:
                        Number(skill.proficiency)
                }
            );
        }

        const skillGapContent =
            document.getElementById("skillGapContent");

        if (skillGapContent) {
            skillGapContent.setAttribute(
                "data-backend-status",
                "saved"
            );
        }

        updateDashboard();

    } catch (error) {

        console.error(
            "Skills backend error:",
            error
        );

        alert(
            "Unable to save skills. " +
            error.message
        );
    }
}



/* =========================================================
   CALCULATE SKILL ANALYSIS
   ========================================================= */

function calculateSkillAnalysis() {

    const career =
        document.getElementById("targetCareer").value;


    const requirements =
        careerRequirements[career];


    const currentSkills = {};


    skillsData.forEach(function (skill) {

        currentSkills[
            skill.name.toLowerCase()
        ] = skill.proficiency;

    });


    let totalRequired = 0;

    let totalAchieved = 0;


    let html = "";


    Object.entries(requirements).forEach(
        function ([skill, required]) {


            totalRequired += required;


            const current =
                currentSkills[
                    skill.toLowerCase()
                ] || 0;


            const percentage =
                Math.min(
                    current / required,
                    1
                ) * 100;


            totalAchieved +=
                percentage;


            const gap =
                Math.max(
                    required - current,
                    0
                );


            let status;


            if (current >= required) {

                status = "Strong";

            }

            else if (gap >= 30) {

                status = "High Gap";

            }

            else if (gap >= 15) {

                status = "Medium Gap";

            }

            else {

                status = "Small Gap";

            }


            html += `

                <div class="skill-gap-item">

                    <div>

                        <strong>
                            ${skill}
                        </strong>

                        <span>
                            Current: ${current}%
                        </span>

                    </div>


                    <div>

                        <span>
                            Required: ${required}%
                        </span>

                        <span>
                            Gap: ${gap}%
                        </span>

                    </div>


                    <strong>
                        ${status}
                    </strong>

                </div>

            `;

        }
    );


    const skillReadiness =
        totalRequired === 0
            ? 0
            : (totalAchieved /
               Object.keys(requirements).length);


    analysisData.skillReadiness =
        Math.round(skillReadiness * 100) / 100;


    analysisData.skillGaps =
        calculateSkillGaps(
            requirements,
            currentSkills
        );

    try { localStorage.setItem("careerSkillGaps", JSON.stringify(analysisData.skillGaps)); } catch (storageError) { console.warn("Could not save skill gaps", storageError); }


    const skillGapContent =
        document.getElementById("skillGapContent");


    const skillReadinessElement =
        document.getElementById("skillReadiness");


    if (skillGapContent) {

        skillGapContent.innerHTML = html;

    }


    if (skillReadinessElement) {

        skillReadinessElement.innerHTML =

            `Skill Readiness: <strong>
                ${analysisData.skillReadiness.toFixed(1)}%
            </strong>`;

    }


    updateDashboard();

}



/* =========================================================
   CALCULATE SKILL GAPS
   ========================================================= */

function calculateSkillGaps(
    requirements,
    currentSkills
) {

    const gaps = [];


    Object.entries(requirements).forEach(
        function ([skill, required]) {


            const current =
                currentSkills[
                    skill.toLowerCase()
                ] || 0;


            const gap =
                Math.max(
                    required - current,
                    0
                );


            gaps.push({

                skill: skill,

                required: required,

                current: current,

                gap: gap

            });

        }
    );


    gaps.sort(function (a, b) {

        return b.gap - a.gap;

    });


    return gaps;

}



/* =========================================================
   CAREER READINESS
   ========================================================= */

const careerForm =
    document.getElementById("careerForm");


if (careerForm) {

    careerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            try {

                requireStudentId();

                const communication =
                    Number(document.getElementById("communicationScore").value);

                const technical =
                    Number(document.getElementById("technicalScore").value);

                const aptitude =
                    Number(document.getElementById("aptitudeScore").value);

                const interview =
                    Number(document.getElementById("interviewScore").value);

                if (
                    Number.isNaN(communication) ||
                    Number.isNaN(technical) ||
                    Number.isNaN(aptitude) ||
                    Number.isNaN(interview)
                ) {
                    throw new Error(
                        "Please enter all career readiness scores."
                    );
                }

                if (
                    communication < 0 || communication > 100 ||
                    technical < 0 || technical > 100 ||
                    aptitude < 0 || aptitude > 100 ||
                    interview < 0 || interview > 100
                ) {
                    throw new Error(
                        "Scores must be between 0 and 100."
                    );
                }

                const score =
                    (
                        communication +
                        technical +
                        aptitude +
                        interview
                    ) / 4;

                careerData = {
                    communication: communication,
                    technical: technical,
                    aptitude: aptitude,
                    interview: interview,
                    score: score
                };

                await postToBackend(
                    API.careerReadiness,
                    {
                        studentId:
                            Number(studentId),

                        communicationScore:
                            communication,

                        technicalScore:
                            technical,

                        aptitudeScore:
                            aptitude,

                        interviewScore:
                            interview
                    }
                );

                document.getElementById(
                    "careerReadinessPercentage"
                ).innerText =
                    score.toFixed(1) + "%";

                document.getElementById(
                    "displayCommunication"
                ).innerText =
                    communication + "%";

                document.getElementById(
                    "displayTechnical"
                ).innerText =
                    technical + "%";

                document.getElementById(
                    "displayAptitude"
                ).innerText =
                    aptitude + "%";

                document.getElementById(
                    "displayInterview"
                ).innerText =
                    interview + "%";

                document.getElementById(
                    "careerReadinessResult"
                ).classList.remove("hidden");

                updateDashboard();

            } catch (error) {

                console.error(
                    "Career readiness backend error:",
                    error
                );

                const result =
                    document.getElementById(
                        "careerReadinessResult"
                    );

                if (result) {
                    result.classList.remove("hidden");
                }

                alert(
                    "Unable to save career readiness. " +
                    error.message
                );
            }
        }
    );
}



/* =========================================================
   ACADEMIC SCORE
   ========================================================= */

function calculateAcademicScore() {

    if (
        !academicData.cgpa &&
        academicData.cgpa !== 0
    ) {

        return 0;

    }


    const cgpaScore =
        Math.min(
            academicData.cgpa / 10,
            1
        ) * 100;


    const attendanceScore =
        academicData.attendance;


    const backlogScore =
        Math.max(
            0,
            100 -
            (academicData.backlogs * 10)
        );


    return (

        cgpaScore +
        attendanceScore +
        backlogScore

    ) / 3;

}



/* =========================================================
   OVERALL READINESS
   ========================================================= */

function calculateOverallScore() {

    const academicScore =
        calculateAcademicScore();


    const skillScore =
        analysisData.skillReadiness || 0;


    const careerScore =
        careerData.score || 0;


    const overall =

        (
            academicScore * 0.30
        ) +

        (
            skillScore * 0.45
        ) +

        (
            careerScore * 0.25
        );


    return overall;

}



/* =========================================================
   READINESS LEVEL
   ========================================================= */

function getReadinessLevel(score) {

    if (score >= 80) {

        return "Highly Ready";

    }


    if (score >= 60) {

        return "Moderately Ready";

    }


    if (score >= 40) {

        return "Needs Improvement";

    }


    return "Requires Significant Improvement";

}



/* =========================================================
   GENERATE ANALYSIS
   ========================================================= */

async function generateAnalysis() {

    const academicScore =
        calculateAcademicScore();

    const skillScore =
        analysisData.skillReadiness || 0;

    const careerScore =
        careerData.score || 0;

    const overallScore =
        calculateOverallScore();

    const academicElement =
        document.getElementById("analysisAcademic");

    const skillsElement =
        document.getElementById("analysisSkills");

    const careerElement =
        document.getElementById("analysisCareer");

    const overallElement =
        document.getElementById("analysisOverall");

    const overallScoreElement =
        document.getElementById("overallScore");

    const readinessElement =
        document.getElementById("readinessLevel");

    if (academicElement) {
        academicElement.innerText =
            academicScore.toFixed(1) + "%";
    }

    if (skillsElement) {
        skillsElement.innerText =
            skillScore.toFixed(1) + "%";
    }

    if (careerElement) {
        careerElement.innerText =
            careerScore.toFixed(1) + "%";
    }

    if (overallElement) {
        overallElement.innerText =
            overallScore.toFixed(1) + "%";
    }

    if (overallScoreElement) {
        overallScoreElement.innerText =
            overallScore.toFixed(1) + "%";
    }

    const readinessLevel =
        getReadinessLevel(overallScore);

    if (readinessElement) {
        readinessElement.innerText =
            readinessLevel;
    }

    generateStrengths();

    generateWeaknesses();

    generateSkillGapAnalysis();

    generateImprovementGuide();

    generateImprovementRoadmap();

    generateRecommendations();

    /*
       Save to Java/MySQL only when the required
       assessment pieces have actually been completed.
    */

    if (
        !studentId ||
        academicData.cgpa === undefined ||
        !analysisData.skillGaps ||
        analysisData.skillGaps.length === 0 ||
        careerData.score === undefined
    ) {
        return;
    }

    const strengthsElement =
        document.getElementById("strengthsList");

    const weaknessesElement =
        document.getElementById("weaknessesList");

    const strengths =
        strengthsElement
            ? Array.from(
                strengthsElement.querySelectorAll("li")
              )
              .map(function (item) {
                  return item.innerText.trim();
              })
              .filter(Boolean)
              .join(", ")
            : "";

    const weaknesses =
        weaknessesElement
            ? Array.from(
                weaknessesElement.querySelectorAll("li")
              )
              .map(function (item) {
                  return item.innerText.trim();
              })
              .filter(Boolean)
              .join(", ")
            : "";

    const payload = {

        studentId:
            Number(studentId),

        academicScore:
            Number(academicScore.toFixed(2)),

        skillScore:
            Number(skillScore.toFixed(2)),

        careerReadinessScore:
            Number(careerScore.toFixed(2)),

        overallScore:
            Number(overallScore.toFixed(2)),

        readinessLevel:
            readinessLevel,

        strengths:
            strengths,

        weaknesses:
            weaknesses
    };

    try {

        const result =
            await postToBackend(
                API.analysis,
                payload
            );

        analysisData.overallScore =
            payload.overallScore;

        analysisData.readinessLevel =
            payload.readinessLevel;

        analysisData.strengths =
            payload.strengths;

        analysisData.weaknesses =
            payload.weaknesses;

        console.log(
            "Analysis saved successfully:",
            result
        );

    } catch (error) {

        console.error(
            "Analysis backend error:",
            error
        );

        /* Keep the already calculated frontend analysis visible. */
    }
}



/* =========================================================
   GENERATE STRENGTHS
   ========================================================= */

function generateStrengths() {

    const list =
        document.getElementById("strengthsList");


    if (!list) {
        return;
    }


    let strengths = [];


    if (
        academicData.cgpa &&
        calculateAcademicScore() >= 75
    ) {

        strengths.push(
            "Strong academic performance"
        );

    }


    if (
        analysisData.skillGaps
    ) {

        analysisData.skillGaps
            .filter(function (item) {

                return item.gap === 0;

            })
            .forEach(function (item) {

                strengths.push(
                    item.skill +
                    " proficiency meets the career requirement"
                );

            });

    }


    if (
        careerData.communication >= 75
    ) {

        strengths.push(
            "Good communication skills"
        );

    }


    if (
        careerData.technical >= 75
    ) {

        strengths.push(
            "Strong technical knowledge"
        );

    }


    if (
        careerData.aptitude >= 75
    ) {

        strengths.push(
            "Good aptitude performance"
        );

    }


    if (
        careerData.interview >= 75
    ) {

        strengths.push(
            "Good interview readiness"
        );

    }


    if (strengths.length === 0) {

        strengths.push(
            "Continue completing assessments to identify your strongest areas."
        );

    }


    list.innerHTML = "";


    strengths.forEach(function (strength) {

        const li =
            document.createElement("li");


        li.innerText =
            strength;


        list.appendChild(li);

    });

}



/* =========================================================
   GENERATE WEAKNESSES
   ========================================================= */

function generateWeaknesses() {

    const list =
        document.getElementById("weaknessesList");


    if (!list) {
        return;
    }


    let weaknesses = [];


    if (
        academicData.cgpa &&
        calculateAcademicScore() < 60
    ) {

        weaknesses.push(
            "Academic performance needs improvement"
        );

    }


    if (
        analysisData.skillGaps
    ) {

        analysisData.skillGaps
            .filter(function (item) {

                return item.gap > 0;

            })
            .forEach(function (item) {

                weaknesses.push(

                    item.skill +
                    " requires " +
                    item.gap +
                    "% improvement"

                );

            });

    }


    if (
        careerData.communication !== undefined &&
        careerData.communication < 60
    ) {

        weaknesses.push(
            "Communication skills need improvement"
        );

    }


    if (
        careerData.technical !== undefined &&
        careerData.technical < 60
    ) {

        weaknesses.push(
            "Technical knowledge needs improvement"
        );

    }


    if (
        careerData.aptitude !== undefined &&
        careerData.aptitude < 60
    ) {

        weaknesses.push(
            "Aptitude performance needs improvement"
        );

    }


    if (
        careerData.interview !== undefined &&
        careerData.interview < 60
    ) {

        weaknesses.push(
            "Interview readiness needs improvement"
        );

    }


    if (weaknesses.length === 0) {

        weaknesses.push(
            "No major weaknesses detected from the current assessment."
        );

    }


    list.innerHTML = "";


    weaknesses.forEach(function (weakness) {

        const li =
            document.createElement("li");


        li.innerText =
            weakness;


        list.appendChild(li);

    });

}



/* =========================================================
   SKILL GAP ANALYSIS
   ========================================================= */

function generateSkillGapAnalysis() {

    const container =
        document.getElementById(
            "analysisSkillGap"
        );


    if (!container) {
        return;
    }


    if (
        !analysisData.skillGaps ||
        analysisData.skillGaps.length === 0
    ) {

        container.innerHTML = `

            <p class="info-text">

                Complete the Skills & Career
                assessment to view detailed
                skill gaps.

            </p>

        `;

        return;

    }


    let html = "";


    analysisData.skillGaps.forEach(function (item) {


        let priority = "Maintain";


        if (item.gap >= 30) {

            priority = "High Priority";

        }

        else if (item.gap >= 15) {

            priority = "Medium Priority";

        }

        else if (item.gap > 0) {

            priority = "Low Priority";

        }


        html += `

            <div class="analysis-skill-item">

                <div>

                    <strong>
                        ${item.skill}
                    </strong>

                    <p>
                        Current: ${item.current}%
                        &nbsp; | &nbsp;
                        Required: ${item.required}%
                    </p>

                </div>


                <div>

                    <strong>
                        ${item.gap}%
                    </strong>

                    <span>
                        ${priority}
                    </span>

                </div>

            </div>

        `;

    });


    container.innerHTML =
        html;

}



/* =========================================================
   PERSONALIZED IMPROVEMENT GUIDE
   ========================================================= */

function generateImprovementGuide() {

    const container =
        document.getElementById(
            "improvementGuide"
        );


    if (!container) {
        return;
    }


    if (
        !analysisData.skillGaps ||
        analysisData.skillGaps.length === 0
    ) {

        container.innerHTML = `

            <div class="improvement-item">

                <strong>
                    Complete your skill assessment
                </strong>

                <p>

                    Select your target career and
                    enter your current skill levels.
                    Your personalized improvement
                    guide will appear here.

                </p>

            </div>

        `;

        return;

    }


    const gaps =
        analysisData.skillGaps
            .filter(function (item) {

                return item.gap > 0;

            })
            .slice(0, 5);


    if (gaps.length === 0) {

        container.innerHTML = `

            <div class="improvement-item">

                <strong>
                    Excellent skill alignment!
                </strong>

                <p>

                    Your current skills meet the
                    selected career requirements.
                    Focus on advanced learning and
                    practical projects.

                </p>

            </div>

        `;

        return;

    }


    let html = "";


    gaps.forEach(function (item) {


        const guide =
            improvementTips[item.skill];


        if (guide) {

            html += `

                <div class="improvement-item">

                    <div class="improvement-header">

                        <strong>
                            ${item.skill}
                        </strong>

                        <span>
                            ${item.gap}% gap
                        </span>

                    </div>


                    <p>

                        ${guide.focus}

                    </p>


                    <ul>

            `;


            guide.actions.forEach(function (action) {

                html += `

                        <li>
                            ${action}
                        </li>

                `;

            });


            html += `

                    </ul>

                </div>

            `;

        }

        else {

            html += `

                <div class="improvement-item">

                    <div class="improvement-header">

                        <strong>
                            ${item.skill}
                        </strong>

                        <span>
                            ${item.gap}% gap
                        </span>

                    </div>


                    <p>

                        Focus on improving your
                        ${item.skill} proficiency
                        through structured learning
                        and practical projects.

                    </p>


                    <ul>

                        <li>
                            Study the fundamentals.
                        </li>

                        <li>
                            Practice regularly.
                        </li>

                        <li>
                            Build a small practical project.
                        </li>

                        <li>
                            Review your mistakes and
                            measure your progress.
                        </li>

                    </ul>

                </div>

            `;

        }

    });


    container.innerHTML =
        html;

}



/* =========================================================
   IMPROVEMENT ROADMAP
   ========================================================= */

function generateImprovementRoadmap() {

    const container =
        document.getElementById(
            "improvementRoadmap"
        );


    if (!container) {
        return;
    }


    if (
        !analysisData.skillGaps ||
        analysisData.skillGaps.length === 0
    ) {

        container.innerHTML = `

            <div class="roadmap-item">

                <span class="roadmap-number">
                    1
                </span>


                <div>

                    <strong>
                        Complete Skill Assessment
                    </strong>

                    <p>

                        Your personalized learning
                        roadmap will be generated
                        after skill analysis.

                    </p>

                </div>

            </div>

        `;

        return;

    }


    const gaps =
        analysisData.skillGaps
            .filter(function (item) {

                return item.gap > 0;

            })
            .slice(0, 5);


    let html = "";


    gaps.forEach(function (item, index) {


        let priority =
            "Low Priority";


        let action =
            "Continue practicing this skill."


        if (item.gap >= 30) {

            priority =
                "HIGH PRIORITY";


            action =
                "Focus on this skill first and practice it consistently.";

        }

        else if (item.gap >= 15) {

            priority =
                "MEDIUM PRIORITY";


            action =
                "Include this skill regularly in your learning plan.";

        }


        html += `

            <div class="roadmap-item">

                <span class="roadmap-number">

                    ${index + 1}

                </span>


                <div class="roadmap-content">


                    <div class="roadmap-title">

                        <strong>
                            ${item.skill}
                        </strong>

                        <span>
                            ${priority}
                        </span>

                    </div>


                    <p>

                        Current:
                        ${item.current}%

                        &nbsp; → &nbsp;

                        Target:
                        ${item.required}%

                    </p>


                    <p>

                        Gap:
                        ${item.gap}%

                        —
                        ${action}

                    </p>


                </div>

            </div>

        `;

    });


    if (gaps.length === 0) {

        html = `

            <div class="roadmap-item">

                <span class="roadmap-number">
                    ✓
                </span>


                <div>

                    <strong>
                        Maintain Your Current Level
                    </strong>

                    <p>

                        Your current skills already
                        meet the selected career
                        requirements.

                    </p>

                </div>

            </div>

        `;

    }


    container.innerHTML =
        html;

}



/* =========================================================
   PERSONALIZED RECOMMENDATIONS
   ========================================================= */

function generateRecommendations() {

    const container =
        document.getElementById(
            "recommendationsList"
        );


    if (!container) {
        return;
    }


    let recommendations = [];


    const academicScore =
        calculateAcademicScore();


    const careerScore =
        careerData.score || 0;


    if (academicScore < 60) {

        recommendations.push(

            "Create a consistent academic study schedule and focus on improving your CGPA, attendance and pending subjects."

        );

    }


    if (analysisData.skillGaps) {

        analysisData.skillGaps
            .filter(function (item) {

                return item.gap >= 30;

            })
            .slice(0, 3)
            .forEach(function (item) {

                recommendations.push(

                    `Give high priority to ${item.skill}. Your current proficiency is ${item.current}% while the target is ${item.required}%.`

                );

            });

    }


    if (careerScore < 60) {

        recommendations.push(

            "Practice communication, technical questions, aptitude and interview questions regularly."

        );

    }


    if (
        careerData.communication !== undefined &&
        careerData.communication < 60
    ) {

        recommendations.push(

            "Practice speaking, presentations and explaining technical concepts clearly."

        );

    }


    if (
        careerData.technical !== undefined &&
        careerData.technical < 60
    ) {

        recommendations.push(

            "Strengthen technical fundamentals and apply them through practical projects."

        );

    }


    if (
        careerData.aptitude !== undefined &&
        careerData.aptitude < 60
    ) {

        recommendations.push(

            "Practice quantitative, logical and verbal aptitude questions under time limits."

        );

    }


    if (
        careerData.interview !== undefined &&
        careerData.interview < 60
    ) {

        recommendations.push(

            "Practice mock interviews and prepare explanations for your projects and technical skills."

        );

    }


    recommendations.push(

        "Build practical projects related to your selected career and document them in your portfolio."

    );


    recommendations.push(

        "Reassess your skills periodically to track improvement toward your target career."

    );


    container.innerHTML = "";


    recommendations.forEach(function (recommendation) {

        const item =
            document.createElement("div");


        item.className =
            "recommendation-item";


        item.innerText =
            recommendation;


        container.appendChild(item);

    });

}



/* =========================================================
   DASHBOARD UPDATE
   ========================================================= */

function updateDashboard() {

    const name =
        studentData.name || "Student";


    const nameElement =
        document.getElementById(
            "dashboardStudentName"
        );


    if (nameElement) {

        nameElement.innerText =
            name;

    }


    const nameInfo =
        document.getElementById(
            "dashboardStudentNameInfo"
        );


    if (nameInfo) {

        nameInfo.innerText =
            studentData.name || "Not entered";

    }


    const email =
        document.getElementById(
            "dashboardStudentEmail"
        );


    if (email) {

        email.innerText =
            studentData.email || "Not entered";

    }


    const department =
        document.getElementById(
            "dashboardStudentDepartment"
        );


    if (department) {

        department.innerText =
            studentData.department || "Not entered";

    }


    const year =
        document.getElementById(
            "dashboardStudentYear"
        );


    if (year) {

        const yearNames = {

            "1": "First Year",

            "2": "Second Year",

            "3": "Third Year",

            "4": "Fourth Year"

        };


        year.innerText =
            yearNames[
                studentData.year
            ] || "Not entered";

    }


    const careerElement =
        document.getElementById(
            "dashboardTargetCareer"
        );


    const selectedCareer =
        document.getElementById(
            "targetCareer"
        );


    if (careerElement && selectedCareer) {

        careerElement.innerText =
            selectedCareer.value ||
            "Not selected";

    }


    const profileStatus =
        document.getElementById(
            "dashboardProfileStatus"
        );


    if (profileStatus) {

        if (
            studentData.name &&
            studentData.email &&
            studentData.department &&
            studentData.year
        ) {

            profileStatus.innerText =
                "Completed";

        }

        else {

            profileStatus.innerText =
                "Incomplete";

        }

    }


    const studentStatus =
        document.getElementById(
            "dashboardStudentStatus"
        );


    if (studentStatus) {

        studentStatus.innerText =

            studentData.name
                ? "✓ Completed"
                : "Pending";

    }


    const academicStatus =
        document.getElementById(
            "dashboardAcademicStatus"
        );


    if (academicStatus) {

        academicStatus.innerText =

            academicData.cgpa !== undefined
                ? "✓ Completed"
                : "Pending";

    }


    const skillsStatus =
        document.getElementById(
            "dashboardSkillsStatus"
        );


    if (skillsStatus) {

        skillsStatus.innerText =

            (
                document.getElementById(
                    "targetCareer"
                )?.value &&
                skillsData.length > 0
            )

                ? "✓ Completed"

                : "Pending";

    }


    const careerStatus =
        document.getElementById(
            "dashboardCareerStatus"
        );


    if (careerStatus) {

        careerStatus.innerText =

            careerData.score !== undefined
                ? "✓ Completed"
                : "Pending";

    }

}



/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    studentData = {};

    academicData = {};

    skillsData = [];

    careerData = {};

    analysisData = {};


    document.getElementById("app")
        .classList.add("hidden");


    document.getElementById("loginPage")
        .classList.remove("hidden");


    const loginMessage =
        document.getElementById(
            "loginMessage"
        );


    if (loginMessage) {

        loginMessage.innerHTML = "";

    }


    showSection("dashboard");

}

/* =========================================================
   PERSONALIZED LEARNING HUB
   Added without replacing the existing login, backend, or analysis logic.
   ========================================================= */

(function initializeLearningHub() {
    "use strict";

    const learningResourceMap = {
        "Java": { query: "Java programming tutorial for beginners", assignment: "Build a Java student record manager", quiz: "Java" },
        "Python": { query: "Python programming tutorial for beginners", assignment: "Write a Python number analysis program", quiz: "Python" },
        "SQL": { query: "SQL tutorial SELECT JOIN GROUP BY MySQL", assignment: "Create and query a student database", quiz: "SQL" },
        "DSA": { query: "data structures and algorithms beginner tutorial", assignment: "Implement searching and sorting", quiz: "Java" },
        "Git": { query: "Git and GitHub beginner tutorial", assignment: "Upload a project to GitHub using Git", quiz: "Java" },
        "HTML/CSS": { query: "HTML CSS responsive web design tutorial", assignment: "Build a responsive portfolio webpage", quiz: "Web Development" },
        "JavaScript": { query: "JavaScript DOM events beginner tutorial", assignment: "Build an interactive task list", quiz: "JavaScript" },
        "React": { query: "React JS beginner tutorial components state", assignment: "Build a reusable React component page", quiz: "JavaScript" },
        "Node.js": { query: "Node.js REST API beginner tutorial", assignment: "Create a simple REST API", quiz: "JavaScript" },
        "Kotlin": { query: "Kotlin programming beginner tutorial", assignment: "Create a Kotlin grade calculator", quiz: "Java" },
        "Android": { query: "Android development beginner tutorial", assignment: "Design a simple Android screen", quiz: "Java" },
        "Statistics": { query: "statistics mean median mode variance tutorial", assignment: "Analyze a small dataset using statistics", quiz: "Aptitude" },
        "Machine Learning": { query: "machine learning basics beginner tutorial", assignment: "Train a basic classification model", quiz: "Python" },
        "Deep Learning": { query: "neural networks deep learning beginner tutorial", assignment: "Build a simple neural network demo", quiz: "Python" },
        "Mathematics": { query: "linear algebra probability for machine learning tutorial", assignment: "Solve probability and matrix exercises", quiz: "Aptitude" },
        "Data Visualization": { query: "data visualization dashboard tutorial", assignment: "Create a dashboard from a sample dataset", quiz: "SQL" },
        "Excel": { query: "Microsoft Excel formulas pivot tables tutorial", assignment: "Analyze a spreadsheet with formulas and charts", quiz: "Aptitude" },
        "Linux": { query: "Linux command line beginner tutorial", assignment: "Complete basic file and permission commands", quiz: "Java" },
        "Networking": { query: "computer networking OSI TCP IP beginner tutorial", assignment: "Draw and explain a small network", quiz: "Aptitude" },
        "AWS/Azure": { query: "cloud computing AWS Azure fundamentals tutorial", assignment: "Plan a basic cloud deployment", quiz: "Java" },
        "Docker": { query: "Docker containers Dockerfile beginner tutorial", assignment: "Containerize a sample application", quiz: "Java" },
        "Kubernetes": { query: "Kubernetes pods deployments beginner tutorial", assignment: "Write a basic deployment YAML", quiz: "Java" },
        "CI/CD": { query: "GitHub Actions CI CD pipeline beginner tutorial", assignment: "Create a basic build workflow", quiz: "Java" },
        "Cybersecurity": { query: "cybersecurity fundamentals defensive security tutorial", assignment: "Prepare a safe security checklist for a demo app", quiz: "Java" },
        "Cryptography": { query: "cryptography hashing encryption fundamentals tutorial", assignment: "Compare hashing and encryption with examples", quiz: "Java" },
        "Database Management": { query: "database design normalization indexes tutorial", assignment: "Design normalized tables for a library", quiz: "SQL" },
        "Backup & Recovery": { query: "MySQL database backup restore tutorial", assignment: "Back up and restore a sample database", quiz: "SQL" },
        "UI Design": { query: "UI design principles layout typography tutorial", assignment: "Redesign a simple dashboard screen", quiz: "Web Development" },
        "UX Design": { query: "UX design user journey wireframing tutorial", assignment: "Map a user journey and identify pain points", quiz: "Web Development" },
        "Figma": { query: "Figma beginner tutorial components auto layout", assignment: "Create a clickable Figma prototype", quiz: "Web Development" },
        "Prototyping": { query: "interactive prototype design tutorial", assignment: "Prototype a three-screen application flow", quiz: "Web Development" },
        "User Research": { query: "user research interview survey usability tutorial", assignment: "Write five user interview questions", quiz: "Web Development" },
        "Software Testing": { query: "software testing test cases beginner tutorial", assignment: "Write test cases for a login form", quiz: "Java" },
        "Selenium": { query: "Selenium WebDriver beginner tutorial", assignment: "Automate a simple web form test", quiz: "Java" },
        "API Testing": { query: "Postman REST API testing beginner tutorial", assignment: "Test GET and POST requests in Postman", quiz: "Java" },
        "Business Analysis": { query: "business analysis requirements use cases tutorial", assignment: "Write requirements for a small app", quiz: "Communication" },
        "Communication": { query: "professional communication presentation skills tutorial", assignment: "Prepare a two-minute project explanation", quiz: "Communication" },
        "Network Security": { query: "network security firewall VPN fundamentals tutorial", assignment: "Create a network security checklist", quiz: "Java" },
        "Routing & Switching": { query: "routing switching subnetting beginner tutorial", assignment: "Plan IP addresses for a small network", quiz: "Aptitude" }
    };

    function escapeHTML(value) {
        return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
            return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch];
        });
    }

    function currentLearnerId() {
        return localStorage.getItem("studentId") || localStorage.getItem("currentStudentId") || "guest";
    }

    function progressStorageKey() {
        return "learningHubProgress_" + currentLearnerId();
    }

    function readLearningProgress() {
        try {
            return JSON.parse(localStorage.getItem(progressStorageKey()) || "{}");
        } catch (error) {
            console.warn("Could not read learning progress:", error);
            return {};
        }
    }

    function saveLearningProgress(progress) {
        try {
            localStorage.setItem(progressStorageKey(), JSON.stringify(progress));
            // Also keep a generic key for older learning-page versions if they use it.
            localStorage.setItem("currentStudentId", currentLearnerId());
            return true;
        } catch (error) {
            console.error("Could not save learning progress:", error);
            return false;
        }
    }

    function getPriorityGaps() {
        const gaps = Array.isArray(analysisData.skillGaps) ? analysisData.skillGaps : [];
        return gaps.slice().sort(function (a, b) { return Number(b.gap || 0) - Number(a.gap || 0); });
    }

    function getResource(skill) {
        if (learningResourceMap[skill]) return learningResourceMap[skill];
        return {
            query: skill + " beginner tutorial",
            assignment: "Complete a practical " + skill + " exercise",
            quiz: "Java"
        };
    }

    function renderLearningHub() {
        const gaps = getPriorityGaps();
        renderPrioritySkills(gaps);
        renderLearningVideos(gaps);
        renderLearningPortalSuggestions(gaps);
        renderLearningProgress();
    }

    function renderPrioritySkills(gaps) {
        const container = document.getElementById("learningSkillGaps");
        if (!container) return;

        if (!gaps.length) {
            container.innerHTML = '<p class="info-text">Complete your Skills &amp; Career analysis first to identify your priority skills.</p>';
            return;
        }

        container.innerHTML = gaps.slice(0, 5).map(function (item, index) {
            const gap = Number(item.gap || 0);
            const priority = gap >= 30 ? "High priority" : gap >= 15 ? "Medium priority" : gap > 0 ? "Low priority" : "Maintain";
            return '<div class="learning-skill-item" style="padding:12px 0;border-bottom:1px solid #e5e7eb">' +
                '<strong>' + (index + 1) + '. ' + escapeHTML(item.skill) + '</strong>' +
                '<p>Current: ' + Number(item.current || 0) + '% · Target: ' + Number(item.required || 0) + '% · Gap: ' + gap + '%</p>' +
                '<span>' + priority + '</span></div>';
        }).join("");
    }

    function renderLearningVideos(gaps) {
        const container = document.getElementById("learningVideos");
        if (!container) return;

        if (!gaps.length) {
            container.innerHTML = '<p class="info-text">Videos will appear after you complete skill analysis.</p>';
            return;
        }

        const recommendations = gaps.filter(function (item) { return Number(item.gap || 0) > 0; }).slice(0, 5);
        if (!recommendations.length) {
            container.innerHTML = '<p>Your current skills meet the selected career requirements. Explore advanced tutorials or build a portfolio project.</p>';
            return;
        }

        container.innerHTML = recommendations.map(function (item) {
            const resource = getResource(item.skill);
            const searchURL = "https://www.youtube.com/results?search_query=" + encodeURIComponent(resource.query);
            return '<div class="learning-video-item" style="padding:14px;margin:10px 0;border:1px solid #e5e7eb;border-radius:10px">' +
                '<h4>' + escapeHTML(item.skill) + ' tutorial</h4>' +
                '<p>Your current proficiency is ' + Number(item.current || 0) + '%, with a target of ' + Number(item.required || 0) + '%.</p>' +
                '<a href="' + searchURL + '" target="_blank" rel="noopener noreferrer">Find learning videos on YouTube ↗</a>' +
                '</div>';
        }).join("");
    }

    function renderLearningPortalSuggestions(gaps) {
        const assignments = document.getElementById("learningAssignments");
        const quizzes = document.getElementById("learningQuiz");
        const topGaps = gaps.filter(function (item) { return Number(item.gap || 0) > 0; }).slice(0, 3);

        if (assignments) {
            if (!topGaps.length) {
                assignments.innerHTML = '<p>Complete skill analysis to receive assignment suggestions.</p>';
            } else {
                assignments.innerHTML = '<p>Start with practical work for your largest skill gaps:</p><ul>' + topGaps.map(function (item) {
                    return '<li><strong>' + escapeHTML(item.skill) + ':</strong> ' + escapeHTML(getResource(item.skill).assignment) + '</li>';
                }).join("") + '</ul><a href="assignments.html">Open Assignments Portal →</a>';
            }
        }

        if (quizzes) {
            if (!topGaps.length) {
                quizzes.innerHTML = '<p>Complete skill analysis to receive quiz suggestions.</p>';
            } else {
                quizzes.innerHTML = '<p>Review the topics you need to strengthen, then test your understanding.</p><ul>' + topGaps.map(function (item) {
                    return '<li>' + escapeHTML(item.skill) + ' practice questions</li>';
                }).join("") + '</ul><a href="quizzes.html">Open Quiz Centre →</a>';
            }
        }
    }

    function renderLearningProgress() {
        const container = document.getElementById("learningProgress");
        if (!container) return;

        const progress = readLearningProgress();
        const values = Object.values(progress);
        const completed = values.filter(function (value) {
            return value === true || (value && (value.completed === true || value.status === "completed"));
        }).length;
        const total = values.length;
        const percent = total ? Math.round((completed / total) * 100) : 0;

        container.innerHTML = '<div style="margin:10px 0">' +
            '<p><strong>' + completed + '</strong> completed learning activities</p>' +
            '<div style="height:10px;background:#e5e7eb;border-radius:999px;overflow:hidden">' +
            '<div style="height:100%;width:' + percent + '%;background:#2563eb;border-radius:999px"></div></div>' +
            '<p>' + percent + '% of tracked activities completed</p>' +
            '<p class="info-text">Progress is currently saved in this browser. It is not yet stored in MySQL.</p>' +
            '</div>';
    }

    // A small shared interface that other frontend pages can use.
    window.LearningProgress = {
        getAll: readLearningProgress,
        get: function (key) { return readLearningProgress()[key]; },
        set: function (key, value) {
            const progress = readLearningProgress();
            progress[key] = value;
            const saved = saveLearningProgress(progress);
            renderLearningProgress();
            return saved;
        },
        toggle: function (key) {
            const progress = readLearningProgress();
            progress[key] = !progress[key];
            const saved = saveLearningProgress(progress);
            renderLearningProgress();
            return saved ? progress[key] : false;
        },
        reset: function () {
            localStorage.removeItem(progressStorageKey());
            renderLearningProgress();
            return true;
        },
        getStudentId: currentLearnerId
    };

    // Update learning content whenever a career analysis is recalculated.
    const originalCalculateSkillAnalysis = window.calculateSkillAnalysis;
    if (typeof originalCalculateSkillAnalysis === "function") {
        window.calculateSkillAnalysis = function () {
            const result = originalCalculateSkillAnalysis.apply(this, arguments);
            renderLearningHub();
            return result;
        };
    }

    // Run after DOM parsing and after login/student state is restored.
    document.addEventListener("DOMContentLoaded", function () {
        renderLearningHub();
        const learningButton = document.querySelector('.navbar button[data-section="learning"]');
        if (learningButton) {
            learningButton.addEventListener("click", renderLearningHub);
        }
    });

    // Existing global navigation calls this function after switching sections.
    const originalShowSection = window.showSection;
    if (typeof originalShowSection === "function") {
        window.showSection = function (sectionId) {
            const result = originalShowSection.apply(this, arguments);
            if (sectionId === "learning") renderLearningHub();
            return result;
        };
    }

    // Expose refresh for assignment/quiz pages or future integrations.
    window.refreshLearningHub = renderLearningHub;
})();


/* =========================================================
   SESSION + RETURN NAVIGATION PATCH
   Keeps a signed-in student signed in between index, assignments and quizzes.
   ========================================================= */
(function () {
    "use strict";

    function safeJSON(key, fallback) {
        try { return JSON.parse(localStorage.getItem(key) || "null") || fallback; }
        catch (error) { return fallback; }
    }

    function restoreStudentSession() {
        if (localStorage.getItem("loggedIn") !== "true") return;
        studentId = Number(localStorage.getItem("studentId") || localStorage.getItem("currentStudentId") || 0) || null;
        studentData = safeJSON("studentData", {});
        academicData = safeJSON("academicData", {});
        skillsData = safeJSON("skillsData", []);
        careerData = safeJSON("careerData", {});
        analysisData = safeJSON("analysisData", {});
        if (!Array.isArray(analysisData.skillGaps) || !analysisData.skillGaps.length) {
            const savedGaps = safeJSON("careerSkillGaps", []);
            if (Array.isArray(savedGaps) && savedGaps.length) analysisData.skillGaps = savedGaps;
        }

        const loginPage = document.getElementById("loginPage");
        const app = document.getElementById("app");
        if (loginPage) loginPage.classList.add("hidden");
        if (app) app.classList.remove("hidden");

        const put = (id, value) => { const el = document.getElementById(id); if (el && value !== undefined && value !== null && value !== "") el.textContent = value; };
        put("dashboardStudentName", studentData.name || "Student");
        put("dashboardStudentNameInfo", studentData.name || "Not entered");
        put("dashboardStudentEmail", studentData.email || localStorage.getItem("userEmail") || "Not entered");
        put("dashboardStudentDepartment", studentData.department || "Not entered");
        put("dashboardStudentYear", studentData.year || "Not entered");
        if (typeof updateDashboard === "function") { try { updateDashboard(); } catch (e) { console.warn(e); } }

        const section = (window.location.hash || "").replace(/^#/, "");
        if (section && document.getElementById(section) && typeof showSection === "function") {
            showSection(section);
        } else if (typeof showSection === "function") {
            showSection("dashboard");
        }
        if (typeof window.refreshLearningHub === "function") window.refreshLearningHub();
    }

    // Save assessment state whenever key app data changes in the main flow.
    const originalLogout = window.logout;
    window.logout = function () {
        ["loggedIn", "studentId", "currentStudentId", "studentData", "userEmail", "academicData", "skillsData", "careerData", "analysisData", "careerSkillGaps"].forEach(key => localStorage.removeItem(key));
        if (typeof originalLogout === "function") return originalLogout.apply(this, arguments);
    };

    document.addEventListener("DOMContentLoaded", restoreStudentSession);
    window.addEventListener("pagehide", function () {
        try {
            localStorage.setItem("studentData", JSON.stringify(studentData || {}));
            localStorage.setItem("academicData", JSON.stringify(academicData || {}));
            localStorage.setItem("skillsData", JSON.stringify(skillsData || []));
            localStorage.setItem("careerData", JSON.stringify(careerData || {}));
            localStorage.setItem("analysisData", JSON.stringify(analysisData || {}));
            if (analysisData && Array.isArray(analysisData.skillGaps)) localStorage.setItem("careerSkillGaps", JSON.stringify(analysisData.skillGaps));
        } catch (e) { console.warn("Could not save session state", e); }
    });
})();

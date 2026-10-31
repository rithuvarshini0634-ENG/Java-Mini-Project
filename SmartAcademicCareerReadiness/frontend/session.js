
/* =====================================================
   SMART ACADEMIC AND CAREER READINESS ANALYTICS SYSTEM
   Shared Student Session and Skill Gap Manager
   ===================================================== */

(function () {
    "use strict";

    function readJSON(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            console.error("Unable to read " + key, error);
            return fallback;
        }
    }

    function student() {
        return readJSON("studentData", {});
    }

    function normalise(value) {
        return String(value || "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");
    }

    function getGaps() {
        const analysis = readJSON("analysisData", {});

        const candidates = [
            analysis.skillGaps,
            analysis.careerSkillGaps,
            readJSON("careerSkillGaps", []),
            readJSON("skillGaps", [])
        ];

        const source =
            candidates.find(function (list) {
                return Array.isArray(list) && list.length > 0;
            }) || [];

        return source
            .map(function (item) {
                const name =
                    item.name ||
                    item.skill ||
                    item.skillName ||
                    item.subject ||
                    item.topic ||
                    "General Skills";

                const currentRaw =
                    item.currentScore ??
                    item.current ??
                    item.score ??
                    item.proficiency;

                const targetRaw =
                    item.targetScore ??
                    item.required ??
                    item.target ??
                    100;

                const currentNum = Number(currentRaw);
                const targetNum = Number(targetRaw);
                const explicitGap = Number(item.gap);

                let gap = 0;

                if (
                    item.gap !== undefined &&
                    item.gap !== null &&
                    Number.isFinite(explicitGap)
                ) {
                    gap = Math.max(0, explicitGap);
                } else if (
                    currentRaw !== undefined &&
                    currentRaw !== null &&
                    Number.isFinite(currentNum) &&
                    Number.isFinite(targetNum)
                ) {
                    gap = Math.max(0, targetNum - currentNum);
                }

                return {
                    ...item,
                    name: name,
                    skill: name,
                    skillName: name,
                    currentScore: Number.isFinite(currentNum)
                        ? currentNum
                        : 0,
                    targetScore: Number.isFinite(targetNum)
                        ? targetNum
                        : 100,
                    gap: gap
                };
            })
            .filter(function (item) {
                return item.gap > 0;
            })
            .sort(function (a, b) {
                return b.gap - a.gap;
            });
    }

    function getStudentId() {
        const data = student();

        return String(
            localStorage.getItem("studentId") ||
            localStorage.getItem("currentStudentId") ||
            data.studentId ||
            data.student_id ||
            data.email ||
            "guest"
        ).toLowerCase();
    }

    function progressKey() {
        return "learningHubProgress_" + getStudentId();
    }

    function getProgress() {
        return readJSON(progressKey(), {});
    }

    function saveProgress(key, value) {
        try {
            const all = getProgress();

            all[key] = value;
            all.lastUpdated = new Date().toISOString();

            localStorage.setItem(
                progressKey(),
                JSON.stringify(all)
            );

            window.dispatchEvent(
                new CustomEvent("learningProgressUpdated")
            );

            return true;
        } catch (error) {
            console.error("Unable to save learning progress:", error);
            return false;
        }
    }

    window.StudentSession = {
        isLoggedIn: function () {
            return localStorage.getItem("loggedIn") === "true";
        },

        student: student,

        gaps: getGaps,

        weakSkills: getGaps,

        isWeakSkill: function (topic) {
            const wanted = normalise(topic);

            return !!wanted && getGaps().some(function (item) {
                const skill = normalise(item.name);

                return (
                    skill === wanted ||
                    skill.includes(wanted) ||
                    wanted.includes(skill)
                );
            });
        },

        progressKey: progressKey,

        saveProgress: saveProgress,

        getProgress: getProgress,

        saveAssessmentResult: function (result) {
            return saveProgress("latestAssessment", {
                ...result,
                savedAt: new Date().toISOString()
            });
        },

        saveQuizResult: function (result) {
            return saveProgress("latestQuiz", {
                ...result,
                savedAt: new Date().toISOString()
            });
        },

        markVideoCompleted: function (id) {
            const progress = getProgress();
            const completed = progress.completedVideos || [];

            if (!completed.includes(id)) {
                completed.push(id);
            }

            return saveProgress("completedVideos", completed);
        },

        markAssignmentCompleted: function (id) {
            const progress = getProgress();
            const completed =
                progress.completedAssignments || [];

            if (!completed.includes(id)) {
                completed.push(id);
            }

            return saveProgress(
                "completedAssignments",
                completed
            );
        },

        saveQuizAttempt: function (id, score, total) {
            const progress = getProgress();
            const attempts = progress.quizAttempts || {};

            const numericScore = Number(score) || 0;
            const numericTotal = Number(total) || 0;

            attempts[id] = {
                score: numericScore,
                total: numericTotal,
                percentage: numericTotal > 0
                    ? Math.round(
                        numericScore / numericTotal * 100
                    )
                    : 0,
                completedAt: new Date().toISOString()
            };

            return saveProgress("quizAttempts", attempts);
        },

        getLearningSummary: function () {
            const progress = getProgress();

            const videos = progress.completedVideos || [];
            const assignments =
                progress.completedAssignments || [];
            const quizzes = progress.quizAttempts || {};

            const quizCount = Object.keys(quizzes).length;

            const passed = Object.values(quizzes).filter(
                function (quiz) {
                    return (
                        quiz.total > 0 &&
                        quiz.score / quiz.total >= 0.6
                    );
                }
            ).length;

            const total =
                videos.length +
                assignments.length +
                quizCount;

            const completed =
                videos.length +
                assignments.length +
                passed;

            return {
                videosCompleted: videos.length,
                assignmentsCompleted: assignments.length,
                quizzesAttempted: quizCount,
                quizzesPassed: passed,
                completedActivities: completed,
                totalRecordedActivities: total,
                percentage: total
                    ? Math.round(completed / total * 100)
                    : 0
            };
        },

        resetLearningProgress: function () {
            try {
                localStorage.removeItem(progressKey());

                window.dispatchEvent(
                    new CustomEvent("learningProgressUpdated")
                );

                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },

        backToLearning: function () {
            window.location.href = "index.html#learning";
        }
    };

    // Compatibility with pages using LearningProgress.
    window.LearningProgress = {
        getAll: getProgress,

        get: function (key) {
            return getProgress()[key];
        },

        set: saveProgress,

        toggle: function (key) {
            const next = !getProgress()[key];

            return saveProgress(key, next) ? next : false;
        },

        reset: function () {
            return window.StudentSession.resetLearningProgress();
        },

        getStudentId: getStudentId
    };
})();

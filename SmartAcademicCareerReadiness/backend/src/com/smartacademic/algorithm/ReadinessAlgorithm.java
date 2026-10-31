package com.smartacademic.algorithm;

public class ReadinessAlgorithm {

    public double calculateAcademicScore(
            double cgpa,
            double attendance,
            int backlogs) {

        double cgpaScore = (cgpa / 10.0) * 100;

        double attendanceScore = attendance;

        double backlogScore;

        if (backlogs == 0) {
            backlogScore = 100;
        } else if (backlogs == 1) {
            backlogScore = 80;
        } else if (backlogs == 2) {
            backlogScore = 60;
        } else if (backlogs == 3) {
            backlogScore = 40;
        } else {
            backlogScore = 20;
        }

        return (cgpaScore * 0.50)
                + (attendanceScore * 0.30)
                + (backlogScore * 0.20);
    }

    public double calculateSkillScore(
            double averageProficiency) {

        return averageProficiency;
    }

    public double calculateOverallReadiness(
            double academicScore,
            double skillScore) {

        return (academicScore * 0.60)
                + (skillScore * 0.40);
    }

    public String determineReadinessLevel(
            double readinessScore) {

        if (readinessScore >= 80) {
            return "Highly Ready";
        } else if (readinessScore >= 60) {
            return "Moderately Ready";
        } else if (readinessScore >= 40) {
            return "Developing";
        } else {
            return "Needs Improvement";
        }
    }
}
package com.smartacademic.service;

import com.smartacademic.dao.AnalysisDAO;
import com.smartacademic.model.Analysis;

public class AnalysisService {

    private AnalysisDAO analysisDAO;

    public AnalysisService() {
        analysisDAO = new AnalysisDAO();
    }

    public boolean generateAndSaveAnalysis(
            int studentId,
            double academicScore,
            double skillScore,
            double careerReadinessScore) {

        if (studentId <= 0) {
            return false;
        }

        if (academicScore < 0 || academicScore > 100) {
            return false;
        }

        if (skillScore < 0 || skillScore > 100) {
            return false;
        }

        if (careerReadinessScore < 0
                || careerReadinessScore > 100) {
            return false;
        }

        double overallScore =
                calculateOverallScore(
                        academicScore,
                        skillScore,
                        careerReadinessScore
                );

        String readinessLevel =
                determineReadinessLevel(
                        overallScore
                );

        String strengths =
                identifyStrengths(
                        academicScore,
                        skillScore,
                        careerReadinessScore
                );

        String weaknesses =
                identifyWeaknesses(
                        academicScore,
                        skillScore,
                        careerReadinessScore
                );

        Analysis analysis =
                new Analysis(
                        studentId,
                        overallScore,
                        readinessLevel,
                        strengths,
                        weaknesses
                );

        return analysisDAO.saveAnalysis(analysis);
    }

    private double calculateOverallScore(
            double academicScore,
            double skillScore,
            double careerReadinessScore) {

        return (academicScore * 0.35)
                + (skillScore * 0.30)
                + (careerReadinessScore * 0.35);
    }

    private String determineReadinessLevel(
            double overallScore) {

        if (overallScore >= 80) {
            return "Highly Ready";
        } else if (overallScore >= 60) {
            return "Moderately Ready";
        } else if (overallScore >= 40) {
            return "Developing";
        } else {
            return "Needs Improvement";
        }
    }

    private String identifyStrengths(
            double academicScore,
            double skillScore,
            double careerReadinessScore) {

        StringBuilder strengths =
                new StringBuilder();

        if (academicScore >= 75) {
            strengths.append(
                    "Strong academic performance"
            );
        }

        if (skillScore >= 75) {

            if (strengths.length() > 0) {
                strengths.append(", ");
            }

            strengths.append(
                    "Good technical skill proficiency"
            );
        }

        if (careerReadinessScore >= 75) {

            if (strengths.length() > 0) {
                strengths.append(", ");
            }

            strengths.append(
                    "Strong career readiness"
            );
        }

        if (strengths.length() == 0) {
            strengths.append(
                    "Improvement potential identified"
            );
        }

        return strengths.toString();
    }

    private String identifyWeaknesses(
            double academicScore,
            double skillScore,
            double careerReadinessScore) {

        StringBuilder weaknesses =
                new StringBuilder();

        if (academicScore < 60) {
            weaknesses.append(
                    "Academic performance needs improvement"
            );
        }

        if (skillScore < 60) {

            if (weaknesses.length() > 0) {
                weaknesses.append(", ");
            }

            weaknesses.append(
                    "Skill proficiency needs improvement"
            );
        }

        if (careerReadinessScore < 60) {

            if (weaknesses.length() > 0) {
                weaknesses.append(", ");
            }

            weaknesses.append(
                    "Career readiness needs improvement"
            );
        }

        if (weaknesses.length() == 0) {
            weaknesses.append(
                    "No major weaknesses identified"
            );
        }

        return weaknesses.toString();
    }
}
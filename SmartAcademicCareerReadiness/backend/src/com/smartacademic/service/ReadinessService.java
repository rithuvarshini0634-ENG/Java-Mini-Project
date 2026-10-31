package com.smartacademic.service;

import com.smartacademic.algorithm.ReadinessAlgorithm;
import com.smartacademic.util.CollectionManager;

public class ReadinessService {

    private ReadinessAlgorithm algorithm;

    public ReadinessService() {
        algorithm = new ReadinessAlgorithm();
    }

    public double calculateReadiness(
            double cgpa,
            double attendance,
            int backlogs,
            CollectionManager collectionManager) {

        double academicScore =
                algorithm.calculateAcademicScore(
                        cgpa,
                        attendance,
                        backlogs
                );

        double skillScore =
                collectionManager.getAverageProficiency();

        return algorithm.calculateOverallReadiness(
                academicScore,
                skillScore
        );
    }

    public String getReadinessLevel(
            double readinessScore) {

        return algorithm.determineReadinessLevel(
                readinessScore
        );
    }
}
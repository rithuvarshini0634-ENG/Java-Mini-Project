package com.smartacademic.service;

import com.smartacademic.dao.CareerReadinessDAO;
import com.smartacademic.model.CareerReadiness;

public class CareerReadinessService {

    private CareerReadinessDAO careerReadinessDAO;

    public CareerReadinessService() {
        careerReadinessDAO =
                new CareerReadinessDAO();
    }

    public boolean saveAssessment(
            CareerReadiness assessment) {

        if (assessment.getStudentId() <= 0) {
            return false;
        }

        if (!isValidScore(
                assessment.getCommunicationScore())) {
            return false;
        }

        if (!isValidScore(
                assessment.getTechnicalScore())) {
            return false;
        }

        if (!isValidScore(
                assessment.getAptitudeScore())) {
            return false;
        }

        if (!isValidScore(
                assessment.getInterviewScore())) {
            return false;
        }

        double readinessScore =
                calculateReadinessScore(assessment);

        assessment.setReadinessScore(
                readinessScore
        );

        return careerReadinessDAO
                .saveAssessment(assessment);
    }

    private boolean isValidScore(int score) {

        return score >= 0 && score <= 100;
    }

    private double calculateReadinessScore(
            CareerReadiness assessment) {

        double communication =
                assessment.getCommunicationScore();

        double technical =
                assessment.getTechnicalScore();

        double aptitude =
                assessment.getAptitudeScore();

        double interview =
                assessment.getInterviewScore();

        return (communication * 0.20)
                + (technical * 0.40)
                + (aptitude * 0.20)
                + (interview * 0.20);
    }
}
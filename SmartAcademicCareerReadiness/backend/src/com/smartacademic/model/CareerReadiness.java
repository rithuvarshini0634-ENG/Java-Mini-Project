package com.smartacademic.model;

public class CareerReadiness {

    private int assessmentId;
    private int studentId;

    private int communicationScore;
    private int technicalScore;
    private int aptitudeScore;
    private int interviewScore;

    private double readinessScore;

    public CareerReadiness() {
    }

    public CareerReadiness(
            int studentId,
            int communicationScore,
            int technicalScore,
            int aptitudeScore,
            int interviewScore) {

        this.studentId = studentId;
        this.communicationScore = communicationScore;
        this.technicalScore = technicalScore;
        this.aptitudeScore = aptitudeScore;
        this.interviewScore = interviewScore;
    }

    public int getAssessmentId() {
        return assessmentId;
    }

    public void setAssessmentId(int assessmentId) {
        this.assessmentId = assessmentId;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getCommunicationScore() {
        return communicationScore;
    }

    public void setCommunicationScore(int communicationScore) {
        this.communicationScore = communicationScore;
    }

    public int getTechnicalScore() {
        return technicalScore;
    }

    public void setTechnicalScore(int technicalScore) {
        this.technicalScore = technicalScore;
    }

    public int getAptitudeScore() {
        return aptitudeScore;
    }

    public void setAptitudeScore(int aptitudeScore) {
        this.aptitudeScore = aptitudeScore;
    }

    public int getInterviewScore() {
        return interviewScore;
    }

    public void setInterviewScore(int interviewScore) {
        this.interviewScore = interviewScore;
    }

    public double getReadinessScore() {
        return readinessScore;
    }

    public void setReadinessScore(double readinessScore) {
        this.readinessScore = readinessScore;
    }
}
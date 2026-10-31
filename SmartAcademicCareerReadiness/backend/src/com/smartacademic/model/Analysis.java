package com.smartacademic.model;

public class Analysis {

    private int analysisId;
    private int studentId;

    private double overallScore;
    private String readinessLevel;

    private String strengths;
    private String weaknesses;

    public Analysis() {
    }

    public Analysis(
            int studentId,
            double overallScore,
            String readinessLevel,
            String strengths,
            String weaknesses) {

        this.studentId = studentId;
        this.overallScore = overallScore;
        this.readinessLevel = readinessLevel;
        this.strengths = strengths;
        this.weaknesses = weaknesses;
    }

    public int getAnalysisId() {
        return analysisId;
    }

    public void setAnalysisId(int analysisId) {
        this.analysisId = analysisId;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public double getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(double overallScore) {
        this.overallScore = overallScore;
    }

    public String getReadinessLevel() {
        return readinessLevel;
    }

    public void setReadinessLevel(String readinessLevel) {
        this.readinessLevel = readinessLevel;
    }

    public String getStrengths() {
        return strengths;
    }

    public void setStrengths(String strengths) {
        this.strengths = strengths;
    }

    public String getWeaknesses() {
        return weaknesses;
    }

    public void setWeaknesses(String weaknesses) {
        this.weaknesses = weaknesses;
    }
}
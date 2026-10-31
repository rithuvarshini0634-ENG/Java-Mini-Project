package com.smartacademic.model;

public class AcademicRecord {

    private int recordId;
    private int studentId;
    private int semester;
    private double cgpa;
    private double attendance;
    private int backlogs;

    public AcademicRecord() {
    }

    public AcademicRecord(int studentId, int semester,
                          double cgpa, double attendance,
                          int backlogs) {

        this.studentId = studentId;
        this.semester = semester;
        this.cgpa = cgpa;
        this.attendance = attendance;
        this.backlogs = backlogs;
    }

    public int getRecordId() {
        return recordId;
    }

    public void setRecordId(int recordId) {
        this.recordId = recordId;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public double getCgpa() {
        return cgpa;
    }

    public void setCgpa(double cgpa) {
        this.cgpa = cgpa;
    }

    public double getAttendance() {
        return attendance;
    }

    public void setAttendance(double attendance) {
        this.attendance = attendance;
    }

    public int getBacklogs() {
        return backlogs;
    }

    public void setBacklogs(int backlogs) {
        this.backlogs = backlogs;
    }
}
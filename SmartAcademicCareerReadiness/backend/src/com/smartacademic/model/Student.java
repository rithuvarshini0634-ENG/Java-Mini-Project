package com.smartacademic.model;

public class Student {

    private int studentId;
    private String name;
    private String email;
    private String department;
    private int year;

    public Student() {
    }

    public Student(String name, String email, String department, int year) {
        this.name = name;
        this.email = email;
        this.department = department;
        this.year = year;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
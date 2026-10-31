package com.smartacademic.model;

public class Skill {

    private int skillId;
    private int studentId;
    private String skillName;
    private int proficiency;

    public Skill() {
    }

    public Skill(int studentId, String skillName, int proficiency) {
        this.studentId = studentId;
        this.skillName = skillName;
        this.proficiency = proficiency;
    }

    public int getSkillId() {
        return skillId;
    }

    public void setSkillId(int skillId) {
        this.skillId = skillId;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public int getProficiency() {
        return proficiency;
    }

    public void setProficiency(int proficiency) {
        this.proficiency = proficiency;
    }
}
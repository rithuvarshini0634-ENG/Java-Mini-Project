package com.smartacademic.service;

import com.smartacademic.dao.SkillDAO;
import com.smartacademic.model.Skill;

public class SkillService {

    private SkillDAO skillDAO;

    public SkillService() {
        skillDAO = new SkillDAO();
    }

    public boolean addSkill(Skill skill) {

        if (skill.getStudentId() <= 0) {
            return false;
        }

        if (skill.getSkillName() == null
                || skill.getSkillName().trim().isEmpty()) {
            return false;
        }

        if (skill.getProficiency() < 0
                || skill.getProficiency() > 100) {
            return false;
        }

        return skillDAO.addSkill(skill);
    }
}
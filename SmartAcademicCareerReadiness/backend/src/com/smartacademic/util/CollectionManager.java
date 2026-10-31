package com.smartacademic.util;

import com.smartacademic.model.Skill;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CollectionManager {

    // List to store multiple skills
    private List<Skill> skills;

    // Map to store skill name and proficiency
    private Map<String, Integer> skillProficiency;

    public CollectionManager() {

        skills = new ArrayList<>();
        skillProficiency = new HashMap<>();
    }

    // Add a skill to the collection
    public void addSkill(Skill skill) {

        skills.add(skill);

        skillProficiency.put(
                skill.getSkillName(),
                skill.getProficiency()
        );
    }

    // Get all skills
    public List<Skill> getSkills() {

        return skills;
    }

    // Get proficiency of a particular skill
    public int getProficiency(String skillName) {

        return skillProficiency.getOrDefault(
                skillName,
                0
        );
    }

    // Get the complete skill-proficiency map
    public Map<String, Integer> getSkillProficiency() {

        return skillProficiency;
    }

    // Find the highest proficiency
    public int getHighestProficiency() {

        if (skillProficiency.isEmpty()) {
            return 0;
        }

        int highest = 0;

        for (int proficiency :
                skillProficiency.values()) {

            if (proficiency > highest) {
                highest = proficiency;
            }
        }

        return highest;
    }

    // Find the average proficiency
    public double getAverageProficiency() {

        if (skillProficiency.isEmpty()) {
            return 0;
        }

        int total = 0;

        for (int proficiency :
                skillProficiency.values()) {

            total += proficiency;
        }

        return (double) total
                / skillProficiency.size();
    }
}
package com.smartacademic.dao;

import com.smartacademic.DatabaseConnection;
import com.smartacademic.model.Skill;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class SkillDAO {

    public boolean addSkill(Skill skill) {

        String sql = "INSERT INTO skills " +
                     "(student_id, skill_name, proficiency) " +
                     "VALUES (?, ?, ?)";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, skill.getStudentId());
            statement.setString(2, skill.getSkillName());
            statement.setInt(3, skill.getProficiency());

            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();
            return false;
        }
    }
}
package com.smartacademic.dao;

import com.smartacademic.DatabaseConnection;
import com.smartacademic.model.CareerReadiness;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class CareerReadinessDAO {

    public boolean saveAssessment(
            CareerReadiness assessment) {

        String sql =
                "INSERT INTO career_readiness " +
                "(student_id, communication_score, " +
                "technical_score, aptitude_score, " +
                "interview_score, readiness_score) " +
                "VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection connection =
                     DatabaseConnection.getConnection();
             PreparedStatement statement =
                     connection.prepareStatement(sql)) {

            statement.setInt(
                    1,
                    assessment.getStudentId()
            );

            statement.setInt(
                    2,
                    assessment.getCommunicationScore()
            );

            statement.setInt(
                    3,
                    assessment.getTechnicalScore()
            );

            statement.setInt(
                    4,
                    assessment.getAptitudeScore()
            );

            statement.setInt(
                    5,
                    assessment.getInterviewScore()
            );

            statement.setDouble(
                    6,
                    assessment.getReadinessScore()
            );

            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();
            return false;
        }
    }
}
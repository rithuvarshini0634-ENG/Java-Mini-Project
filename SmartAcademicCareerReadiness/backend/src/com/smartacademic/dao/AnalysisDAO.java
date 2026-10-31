package com.smartacademic.dao;

import com.smartacademic.DatabaseConnection;
import com.smartacademic.model.Analysis;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class AnalysisDAO {

    public boolean saveAnalysis(Analysis analysis) {

        String sql =
                "INSERT INTO analysis " +
                "(student_id, overall_score, readiness_level, " +
                "strengths, weaknesses) " +
                "VALUES (?, ?, ?, ?, ?)";

        try (Connection connection =
                     DatabaseConnection.getConnection();
             PreparedStatement statement =
                     connection.prepareStatement(sql)) {

            statement.setInt(
                    1,
                    analysis.getStudentId()
            );

            statement.setDouble(
                    2,
                    analysis.getOverallScore()
            );

            statement.setString(
                    3,
                    analysis.getReadinessLevel()
            );

            statement.setString(
                    4,
                    analysis.getStrengths()
            );

            statement.setString(
                    5,
                    analysis.getWeaknesses()
            );

            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();
            return false;
        }
    }
}
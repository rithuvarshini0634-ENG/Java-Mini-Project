package com.smartacademic.dao;

import com.smartacademic.DatabaseConnection;
import com.smartacademic.model.AcademicRecord;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class AcademicDAO {

    public boolean addAcademicRecord(AcademicRecord record) {

        String sql = "INSERT INTO academic_records " +
                     "(student_id, semester, cgpa, attendance, backlogs) " +
                     "VALUES (?, ?, ?, ?, ?)";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, record.getStudentId());
            statement.setInt(2, record.getSemester());
            statement.setDouble(3, record.getCgpa());
            statement.setDouble(4, record.getAttendance());
            statement.setInt(5, record.getBacklogs());

            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();
            return false;
        }
    }
}
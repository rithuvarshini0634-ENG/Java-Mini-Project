package com.smartacademic.dao;

import com.smartacademic.DatabaseConnection;
import com.smartacademic.model.Student;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class StudentDAO {

    /* =========================================================
       ADD STUDENT
       ========================================================= */

    public boolean addStudent(Student student) {

        String sql =
                "INSERT INTO students " +
                "(name, email, department, year) " +
                "VALUES (?, ?, ?, ?)";

        try (
                Connection connection =
                        DatabaseConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(
                                sql,
                                Statement.RETURN_GENERATED_KEYS
                        )
        ) {

            statement.setString(
                    1,
                    student.getName()
            );

            statement.setString(
                    2,
                    student.getEmail()
            );

            statement.setString(
                    3,
                    student.getDepartment()
            );

            statement.setInt(
                    4,
                    student.getYear()
            );

            int rows =
                    statement.executeUpdate();

            if (rows > 0) {

                try (
                        ResultSet generatedKeys =
                                statement.getGeneratedKeys()
                ) {

                    if (generatedKeys.next()) {

                        student.setStudentId(
                                generatedKeys.getInt(1)
                        );

                        return true;
                    }
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return false;
    }


    /* =========================================================
       GET ALL STUDENTS
       ========================================================= */

    public List<Student> getAllStudents() {

        List<Student> students =
                new ArrayList<>();

        String sql =
                "SELECT student_id, name, email, " +
                "department, year " +
                "FROM students";

        try (
                Connection connection =
                        DatabaseConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql);

                ResultSet resultSet =
                        statement.executeQuery()
        ) {

            while (resultSet.next()) {

                Student student =
                        new Student();

                student.setStudentId(
                        resultSet.getInt(
                                "student_id"
                        )
                );

                student.setName(
                        resultSet.getString(
                                "name"
                        )
                );

                student.setEmail(
                        resultSet.getString(
                                "email"
                        )
                );

                student.setDepartment(
                        resultSet.getString(
                                "department"
                        )
                );

                student.setYear(
                        resultSet.getInt(
                                "year"
                        )
                );

                students.add(student);
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return students;
    }


    /* =========================================================
       LOGIN
       Find student using email + password
       ========================================================= */

    public Student findByEmailAndPassword(
            String email,
            String password) {

        String sql =
                "SELECT student_id, name, email, " +
                "department, year " +
                "FROM students " +
                "WHERE email = ? AND password = ? " +
                "LIMIT 1";

        try (
                Connection connection =
                        DatabaseConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(
                    1,
                    email
            );

            statement.setString(
                    2,
                    password
            );

            try (
                    ResultSet resultSet =
                            statement.executeQuery()
            ) {

                if (resultSet.next()) {

                    Student student =
                            new Student();

                    student.setStudentId(
                            resultSet.getInt(
                                    "student_id"
                            )
                    );

                    student.setName(
                            resultSet.getString(
                                    "name"
                            )
                    );

                    student.setEmail(
                            resultSet.getString(
                                    "email"
                            )
                    );

                    student.setDepartment(
                            resultSet.getString(
                                    "department"
                            )
                    );

                    student.setYear(
                            resultSet.getInt(
                                    "year"
                            )
                    );

                    return student;
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return null;
    }
}
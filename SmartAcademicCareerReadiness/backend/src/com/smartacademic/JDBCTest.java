package com.smartacademic;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class JDBCTest {

    public static void main(String[] args) {

        String sql = "SELECT COUNT(*) FROM students";

        try (
            Connection connection =
                DatabaseConnection.getConnection();

            PreparedStatement statement =
                connection.prepareStatement(sql);

            ResultSet result =
                statement.executeQuery()
        ) {
            System.out.println("JDBC Connection Successful!");

            if (result.next()) {
                System.out.println(
                    "Total students in database: "
                    + result.getInt(1)
                );
            }

            System.out.println("SQL query executed successfully.");

        } catch (Exception e) {
            System.out.println("JDBC test failed.");
            e.printStackTrace();
        }
    }
}
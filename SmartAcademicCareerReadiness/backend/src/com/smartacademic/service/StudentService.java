package com.smartacademic.service;

import com.smartacademic.dao.StudentDAO;
import com.smartacademic.model.Student;

import java.util.List;

public class StudentService {

    private StudentDAO studentDAO;

    public StudentService() {

        studentDAO =
                new StudentDAO();
    }


    /* =========================================================
       ADD STUDENT
       ========================================================= */

    public boolean addStudent(
            Student student) {

        if (
                student.getName() == null ||
                student.getName()
                        .trim()
                        .isEmpty()
        ) {

            return false;
        }


        if (
                student.getEmail() == null ||
                student.getEmail()
                        .trim()
                        .isEmpty()
        ) {

            return false;
        }


        if (
                student.getDepartment() == null ||
                student.getDepartment()
                        .trim()
                        .isEmpty()
        ) {

            return false;
        }


        if (
                student.getYear() < 1 ||
                student.getYear() > 4
        ) {

            return false;
        }


        return studentDAO.addStudent(
                student
        );
    }


    /* =========================================================
       GET ALL STUDENTS
       ========================================================= */

    public List<Student> getAllStudents() {

        return studentDAO.getAllStudents();
    }


    /* =========================================================
       LOGIN
       ========================================================= */

    public Student login(
            String email,
            String password) {

        if (
                email == null ||
                email.trim().isEmpty()
        ) {

            return null;
        }


        if (
                password == null ||
                password.trim().isEmpty()
        ) {

            return null;
        }


        return studentDAO.findByEmailAndPassword(
                email.trim(),
                password.trim()
        );
    }
}
package com.smartacademic.service;

import com.smartacademic.dao.AcademicDAO;
import com.smartacademic.model.AcademicRecord;

public class AcademicService {

    private AcademicDAO academicDAO;

    public AcademicService() {
        academicDAO = new AcademicDAO();
    }

    public boolean addAcademicRecord(AcademicRecord record) {

        if (record.getStudentId() <= 0) {
            return false;
        }

        if (record.getSemester() < 1 || record.getSemester() > 8) {
            return false;
        }

        if (record.getCgpa() < 0 || record.getCgpa() > 10) {
            return false;
        }

        if (record.getAttendance() < 0 || record.getAttendance() > 100) {
            return false;
        }

        if (record.getBacklogs() < 0) {
            return false;
        }

        return academicDAO.addAcademicRecord(record);
    }
}

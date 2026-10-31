@echo off
cd /d "%~dp0"

echo Starting Smart Academic Career Readiness Backend...
echo.

start "Student Controller - 8080" cmd /k java -cp backend\out;backend\lib\mysql-connector-j-26.7.0.jar com.smartacademic.controller.StudentController

start "Academic Controller - 8081" cmd /k java -cp backend\out;backend\lib\mysql-connector-j-26.7.0.jar com.smartacademic.controller.AcademicController

start "Skill Controller - 8082" cmd /k java -cp backend\out;backend\lib\mysql-connector-j-26.7.0.jar com.smartacademic.controller.SkillController

start "Career Readiness Controller - 8083" cmd /k java -cp backend\out;backend\lib\mysql-connector-j-26.7.0.jar com.smartacademic.controller.CareerReadinessController

start "Analysis Controller - 8084" cmd /k java -cp backend\out;backend\lib\mysql-connector-j-26.7.0.jar com.smartacademic.controller.AnalysisController

echo.
echo All backend controllers have been started.
pause
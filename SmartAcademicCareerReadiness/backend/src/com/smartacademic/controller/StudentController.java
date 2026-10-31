package com.smartacademic.controller;

import com.smartacademic.model.Student;
import com.smartacademic.service.StudentService;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class StudentController {

    private static StudentService studentService =
            new StudentService();


    public static void main(String[] args)
            throws IOException {

        HttpServer server =
                HttpServer.create(
                        new InetSocketAddress(8080),
                        0
                );


        /*
           LOGIN CONTEXT

           POST:
           http://localhost:8080/api/students/login
        */

        server.createContext(
                "/api/students/login",
                StudentController::handleLogin
        );


        /*
           EXISTING STUDENT CONTEXT

           GET:
           /api/students

           POST:
           /api/students
        */

        server.createContext(
                "/api/students",
                StudentController::handleStudents
        );


        server.setExecutor(null);


        System.out.println(
                "Server started at http://localhost:8080"
        );


        server.start();
    }


    /* =========================================================
       STUDENT ROUTER
       ========================================================= */

    private static void handleStudents(
            HttpExchange exchange)
            throws IOException {

        String method =
                exchange.getRequestMethod();


        if (
                method.equalsIgnoreCase(
                        "OPTIONS"
                )
        ) {

            setCorsHeaders(exchange);

            exchange.sendResponseHeaders(
                    204,
                    -1
            );

        }


        else if (
                method.equalsIgnoreCase(
                        "GET"
                )
        ) {

            handleGetStudents(
                    exchange
            );

        }


        else if (
                method.equalsIgnoreCase(
                        "POST"
                )
        ) {

            handleAddStudent(
                    exchange
            );

        }


        else {

            sendResponse(
                    exchange,
                    405,
                    "{\"message\":\"Method not supported\"}"
            );
        }
    }


    /* =========================================================
       LOGIN
       ========================================================= */

    private static void handleLogin(
            HttpExchange exchange)
            throws IOException {

        String method =
                exchange.getRequestMethod();


        if (
                method.equalsIgnoreCase(
                        "OPTIONS"
                )
        ) {

            setCorsHeaders(exchange);

            exchange.sendResponseHeaders(
                    204,
                    -1
            );

            return;
        }


        if (
                !method.equalsIgnoreCase(
                        "POST"
                )
        ) {

            sendResponse(
                    exchange,
                    405,
                    "{\"message\":\"Method not supported\"}"
            );

            return;
        }


        InputStream inputStream =
                exchange.getRequestBody();


        String requestBody =
                new String(
                        inputStream.readAllBytes(),
                        StandardCharsets.UTF_8
                );


        String email =
                getJsonValue(
                        requestBody,
                        "email"
                );


        String password =
                getJsonValue(
                        requestBody,
                        "password"
                );


        if (
                email.isEmpty() ||
                password.isEmpty()
        ) {

            sendResponse(
                    exchange,
                    400,
                    "{\"message\":\"Email and password are required\"}"
            );

            return;
        }


        Student student =
                studentService.login(
                        email,
                        password
                );


        if (student == null) {

            sendResponse(
                    exchange,
                    401,
                    "{\"message\":\"Invalid email or password\"}"
            );

            return;
        }


        String response =
                "{"
                + "\"success\":true,"
                + "\"studentId\":"
                + student.getStudentId()
                + ","
                + "\"name\":\""
                + escapeJson(
                        student.getName()
                )
                + "\","
                + "\"email\":\""
                + escapeJson(
                        student.getEmail()
                )
                + "\","
                + "\"department\":\""
                + escapeJson(
                        student.getDepartment()
                )
                + "\","
                + "\"year\":"
                + student.getYear()
                + "}";


        sendResponse(
                exchange,
                200,
                response
        );
    }


    /* =========================================================
       GET ALL STUDENTS
       ========================================================= */

    private static void handleGetStudents(
            HttpExchange exchange)
            throws IOException {

        List<Student> students =
                studentService.getAllStudents();


        StringBuilder json =
                new StringBuilder("[");


        for (
                int i = 0;
                i < students.size();
                i++
        ) {

            Student student =
                    students.get(i);


            json.append("{")

                    .append(
                            "\"studentId\":"
                    )
                    .append(
                            student.getStudentId()
                    )

                    .append(",")

                    .append(
                            "\"name\":\""
                    )
                    .append(
                            escapeJson(
                                    student.getName()
                            )
                    )
                    .append("\"")

                    .append(",")

                    .append(
                            "\"email\":\""
                    )
                    .append(
                            escapeJson(
                                    student.getEmail()
                            )
                    )
                    .append("\"")

                    .append(",")

                    .append(
                            "\"department\":\""
                    )
                    .append(
                            escapeJson(
                                    student.getDepartment()
                            )
                    )
                    .append("\"")

                    .append(",")

                    .append(
                            "\"year\":"
                    )
                    .append(
                            student.getYear()
                    )

                    .append("}");


            if (
                    i <
                    students.size() - 1
            ) {

                json.append(",");
            }
        }


        json.append("]");


        sendResponse(
                exchange,
                200,
                json.toString()
        );
    }


    /* =========================================================
       ADD STUDENT
       ========================================================= */

    private static void handleAddStudent(
            HttpExchange exchange)
            throws IOException {

        InputStream inputStream =
                exchange.getRequestBody();


        String requestBody =
                new String(
                        inputStream.readAllBytes(),
                        StandardCharsets.UTF_8
                );


        String name =
                getJsonValue(
                        requestBody,
                        "name"
                );


        String email =
                getJsonValue(
                        requestBody,
                        "email"
                );


        String department =
                getJsonValue(
                        requestBody,
                        "department"
                );


        String yearValue =
                getJsonValue(
                        requestBody,
                        "year"
                );


        try {

            int year =
                    Integer.parseInt(
                            yearValue
                    );


            Student student =
                    new Student(
                            name,
                            email,
                            department,
                            year
                    );


            boolean success =
                    studentService.addStudent(
                            student
                    );


            if (success) {

                String response =
                        "{"
                        + "\"message\":\"Student added successfully\","
                        + "\"studentId\":"
                        + student.getStudentId()
                        + "}";


                sendResponse(
                        exchange,
                        200,
                        response
                );

            }


            else {

                sendResponse(
                        exchange,
                        400,
                        "{\"message\":\"Invalid student data\"}"
                );
            }


        }

        catch (Exception e) {

            e.printStackTrace();


            sendResponse(
                    exchange,
                    400,
                    "{\"message\":\"Invalid request data\"}"
            );
        }
    }


    /* =========================================================
       JSON VALUE READER
       ========================================================= */

    private static String getJsonValue(
            String json,
            String key) {

        String searchKey =
                "\"" + key + "\":";


        int start =
                json.indexOf(
                        searchKey
                );


        if (start == -1) {

            return "";
        }


        start +=
                searchKey.length();


        while (
                start < json.length() &&
                Character.isWhitespace(
                        json.charAt(start)
                )
        ) {

            start++;
        }


        if (
                start < json.length() &&
                json.charAt(start) == '"'
        ) {

            start++;


            int end =
                    json.indexOf(
                            '"',
                            start
                    );


            if (end != -1) {

                return json.substring(
                        start,
                        end
                );
            }

        }


        else {

            int end =
                    start;


            while (
                    end < json.length() &&
                    json.charAt(end) != ',' &&
                    json.charAt(end) != '}'
            ) {

                end++;
            }


            return json.substring(
                    start,
                    end
            ).trim();
        }


        return "";
    }


    /* =========================================================
       JSON ESCAPE
       ========================================================= */

    private static String escapeJson(
            String value) {

        if (value == null) {

            return "";
        }


        return value
                .replace(
                        "\\",
                        "\\\\"
                )
                .replace(
                        "\"",
                        "\\\""
                )
                .replace(
                        "\n",
                        "\\n"
                )
                .replace(
                        "\r",
                        "\\r"
                );
    }


    /* =========================================================
       CORS
       ========================================================= */

    private static void setCorsHeaders(
            HttpExchange exchange) {

        exchange.getResponseHeaders().set(
                "Access-Control-Allow-Origin",
                "*"
        );


        exchange.getResponseHeaders().set(
                "Access-Control-Allow-Methods",
                "GET, POST, OPTIONS"
        );


        exchange.getResponseHeaders().set(
                "Access-Control-Allow-Headers",
                "Content-Type"
        );
    }


    /* =========================================================
       RESPONSE
       ========================================================= */

    private static void sendResponse(
            HttpExchange exchange,
            int statusCode,
            String response)
            throws IOException {

        setCorsHeaders(
                exchange
        );


        exchange.getResponseHeaders().set(
                "Content-Type",
                "application/json"
        );


        byte[] responseBytes =
                response.getBytes(
                        StandardCharsets.UTF_8
                );


        exchange.sendResponseHeaders(
                statusCode,
                responseBytes.length
        );


        try (
                OutputStream outputStream =
                        exchange.getResponseBody()
        ) {

            outputStream.write(
                    responseBytes
            );
        }
    }
}
package com.smartacademic.controller;

import com.smartacademic.model.Skill;
import com.smartacademic.service.SkillService;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class SkillController {

    private static SkillService skillService =
            new SkillService();

    public static void main(String[] args) throws IOException {

        HttpServer server = HttpServer.create(
                new InetSocketAddress(8082), 0);

        server.createContext(
                "/api/skills",
                SkillController::handleSkills
        );

        server.setExecutor(null);

        System.out.println(
                "Skill server started at http://localhost:8082"
        );

        server.start();
    }

    private static void handleSkills(
            HttpExchange exchange) throws IOException {

        String method = exchange.getRequestMethod();

        if (method.equalsIgnoreCase("OPTIONS")) {

            setCorsHeaders(exchange);

            exchange.sendResponseHeaders(204, -1);

        } else if (method.equalsIgnoreCase("POST")) {

            handleAddSkill(exchange);

        } else {

            sendResponse(
                    exchange,
                    405,
                    "{\"message\":\"Method not supported\"}"
            );
        }
    }

    private static void handleAddSkill(
            HttpExchange exchange) throws IOException {

        InputStream inputStream =
                exchange.getRequestBody();

        String requestBody =
                new String(
                        inputStream.readAllBytes(),
                        StandardCharsets.UTF_8
                );

        try {

            int studentId = Integer.parseInt(
                    getJsonValue(requestBody, "studentId")
            );

            String skillName =
                    getJsonValue(requestBody, "skillName");

            int proficiency = Integer.parseInt(
                    getJsonValue(requestBody, "proficiency")
            );

            Skill skill =
                    new Skill(
                            studentId,
                            skillName,
                            proficiency
                    );

            boolean success =
                    skillService.addSkill(skill);

            if (success) {

                sendResponse(
                        exchange,
                        200,
                        "{\"message\":\"Skill saved successfully\"}"
                );

            } else {

                sendResponse(
                        exchange,
                        400,
                        "{\"message\":\"Invalid skill data\"}"
                );
            }

        } catch (Exception e) {

            e.printStackTrace();

            sendResponse(
                    exchange,
                    400,
                    "{\"message\":\"Invalid request data\"}"
            );
        }
    }

    private static String getJsonValue(
            String json,
            String key) {

        String searchKey = "\"" + key + "\":";

        int start = json.indexOf(searchKey);

        if (start == -1) {
            return "";
        }

        start += searchKey.length();

        while (start < json.length()
                && Character.isWhitespace(json.charAt(start))) {

            start++;
        }

        if (start < json.length()
                && json.charAt(start) == '"') {

            start++;

            int end = json.indexOf('"', start);

            if (end != -1) {
                return json.substring(start, end);
            }

        } else {

            int end = start;

            while (end < json.length()
                    && json.charAt(end) != ','
                    && json.charAt(end) != '}') {

                end++;
            }

            return json.substring(start, end).trim();
        }

        return "";
    }

    private static void setCorsHeaders(
            HttpExchange exchange) {

        exchange.getResponseHeaders().set(
                "Access-Control-Allow-Origin",
                "*"
        );

        exchange.getResponseHeaders().set(
                "Access-Control-Allow-Methods",
                "POST, OPTIONS"
        );

        exchange.getResponseHeaders().set(
                "Access-Control-Allow-Headers",
                "Content-Type"
        );
    }

    private static void sendResponse(
            HttpExchange exchange,
            int statusCode,
            String response)
            throws IOException {

        setCorsHeaders(exchange);

        exchange.getResponseHeaders().set(
                "Content-Type",
                "application/json"
        );

        byte[] responseBytes =
                response.getBytes(StandardCharsets.UTF_8);

        exchange.sendResponseHeaders(
                statusCode,
                responseBytes.length
        );

        try (OutputStream outputStream =
                     exchange.getResponseBody()) {

            outputStream.write(responseBytes);
        }
    }
}
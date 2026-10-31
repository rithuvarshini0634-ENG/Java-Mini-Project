package com.smartacademic.controller;

import com.smartacademic.model.CareerReadiness;
import com.smartacademic.service.CareerReadinessService;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class CareerReadinessController {

    private static CareerReadinessService service =
            new CareerReadinessService();

    public static void main(String[] args) throws IOException {

        HttpServer server = HttpServer.create(
                new InetSocketAddress(8083), 0);

        server.createContext(
                "/api/career-readiness",
                CareerReadinessController::handleRequest
        );

        server.setExecutor(null);

        System.out.println(
                "Career Readiness server started at http://localhost:8083"
        );

        server.start();
    }

    private static void handleRequest(
            HttpExchange exchange) throws IOException {

        String method =
                exchange.getRequestMethod();

        if (method.equalsIgnoreCase("OPTIONS")) {

            setCorsHeaders(exchange);

            exchange.sendResponseHeaders(
                    204,
                    -1
            );

        } else if (method.equalsIgnoreCase("POST")) {

            handlePost(exchange);

        } else {

            sendResponse(
                    exchange,
                    405,
                    "{\"message\":\"Method not supported\"}"
            );
        }
    }

    private static void handlePost(
            HttpExchange exchange) throws IOException {

        InputStream inputStream =
                exchange.getRequestBody();

        String requestBody =
                new String(
                        inputStream.readAllBytes(),
                        StandardCharsets.UTF_8
                );

        try {

            int studentId =
                    Integer.parseInt(
                            getJsonValue(
                                    requestBody,
                                    "studentId"
                            )
                    );

            int communicationScore =
                    Integer.parseInt(
                            getJsonValue(
                                    requestBody,
                                    "communicationScore"
                            )
                    );

            int technicalScore =
                    Integer.parseInt(
                            getJsonValue(
                                    requestBody,
                                    "technicalScore"
                            )
                    );

            int aptitudeScore =
                    Integer.parseInt(
                            getJsonValue(
                                    requestBody,
                                    "aptitudeScore"
                            )
                    );

            int interviewScore =
                    Integer.parseInt(
                            getJsonValue(
                                    requestBody,
                                    "interviewScore"
                            )
                    );

            CareerReadiness assessment =
                    new CareerReadiness(
                            studentId,
                            communicationScore,
                            technicalScore,
                            aptitudeScore,
                            interviewScore
                    );

            boolean success =
                    service.saveAssessment(
                            assessment
                    );

            if (success) {

                String response =
                        "{"
                        + "\"message\":\"Career readiness assessment saved successfully\","
                        + "\"readinessScore\":"
                        + assessment.getReadinessScore()
                        + "}";

                sendResponse(
                        exchange,
                        200,
                        response
                );

            } else {

                sendResponse(
                        exchange,
                        400,
                        "{\"message\":\"Invalid career readiness data\"}"
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

        String searchKey =
                "\"" + key + "\":";

        int start =
                json.indexOf(searchKey);

        if (start == -1) {
            return "";
        }

        start += searchKey.length();

        while (start < json.length()
                && Character.isWhitespace(
                        json.charAt(start))) {

            start++;
        }

        if (start < json.length()
                && json.charAt(start) == '"') {

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

        } else {

            int end = start;

            while (end < json.length()
                    && json.charAt(end) != ','
                    && json.charAt(end) != '}') {

                end++;
            }

            return json.substring(
                    start,
                    end
            ).trim();
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
                response.getBytes(
                        StandardCharsets.UTF_8
                );

        exchange.sendResponseHeaders(
                statusCode,
                responseBytes.length
        );

        try (OutputStream outputStream =
                     exchange.getResponseBody()) {

            outputStream.write(
                    responseBytes
            );
        }
    }
}
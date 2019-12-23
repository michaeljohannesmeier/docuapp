package com.docuapp.back.entities;

public class ApiResponse {

    String message;
    String errorCode;
    Long id;

    public ApiResponse(String message, String errorCode, Long id) {
        this.message = message;
        this.errorCode = errorCode;
        this.id = id;
    }

    public ApiResponse(String message, String errorCode) {
        this.message = message;
        this.errorCode = errorCode;
    }

    public ApiResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String statusCode) {
        this.errorCode = statusCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}


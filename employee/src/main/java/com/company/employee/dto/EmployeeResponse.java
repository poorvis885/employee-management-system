package com.company.employee.dto;

import com.company.employee.model.EmployeeStatus;
import java.math.BigDecimal;

public class EmployeeResponse {

    private Long id;
    private String employeeCode;
    private String fullName;
    private String email;
    private String department;
    private String designation;
    private BigDecimal salary;
    private EmployeeStatus status;

    public EmployeeResponse() {}

    public EmployeeResponse(Long id, String employeeCode, String fullName, String email,
                            String department, String designation, BigDecimal salary, EmployeeStatus status) {
        this.id = id;
        this.employeeCode = employeeCode;
        this.fullName = fullName;
        this.email = email;
        this.department = department;
        this.designation = designation;
        this.salary = salary;
        this.status = status;
    }

    public Long getId() { return id; }
    public String getEmployeeCode() { return employeeCode; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getDepartment() { return department; }
    public String getDesignation() { return designation; }
    public BigDecimal getSalary() { return salary; }
    public EmployeeStatus getStatus() { return status; }
}
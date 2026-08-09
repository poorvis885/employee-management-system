package com.company.employee.service;

import com.company.employee.dto.CreateEmployeeRequest;
import com.company.employee.dto.EmployeeResponse;
import com.company.employee.model.Employee;
import com.company.employee.model.EmployeeStatus;
import com.company.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    // 1. CREATE
    public EmployeeResponse createEmployee(CreateEmployeeRequest request) {
        if (repository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered: " + request.getEmail());
        }

        String empCode = "EMP-" + UUID.randomUUID().toString().substring(0, 5).toUpperCase();

        Employee employee = new Employee(
                empCode,
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                request.getDepartment(),
                request.getDesignation(),
                request.getSalary(),
                LocalDate.now(),
                EmployeeStatus.ACTIVE
        );

        Employee saved = repository.save(employee);
        return mapToResponse(saved);
    }

    // 2. READ ALL
    public List<EmployeeResponse> getAllEmployees() {
        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // 3. READ BY CODE
    public EmployeeResponse getEmployeeByCode(String empCode) {
        Employee employee = repository.findByEmployeeCode(empCode)
                .orElseThrow(() -> new RuntimeException("Employee not found with code: " + empCode));
        return mapToResponse(employee);
    }

    // 4. UPDATE
    public EmployeeResponse updateEmployee(String empCode, CreateEmployeeRequest request) {
        Employee employee = repository.findByEmployeeCode(empCode)
                .orElseThrow(() -> new RuntimeException("Employee not found with code: " + empCode));

        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setDepartment(request.getDepartment());
        employee.setDesignation(request.getDesignation());
        employee.setSalary(request.getSalary());

        Employee updated = repository.save(employee);
        return mapToResponse(updated);
    }

    // 5. DELETE
    public void deleteEmployee(String empCode) {
        Employee employee = repository.findByEmployeeCode(empCode)
                .orElseThrow(() -> new RuntimeException("Employee not found with code: " + empCode));
        repository.delete(employee);
    }

    private EmployeeResponse mapToResponse(Employee emp) {
        return new EmployeeResponse(
                emp.getId(),
                emp.getEmployeeCode(),
                emp.getFirstName() + " " + emp.getLastName(),
                emp.getEmail(),
                emp.getDepartment(),
                emp.getDesignation(),
                emp.getSalary(),
                emp.getStatus()
        );
    }
}
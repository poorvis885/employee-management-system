package com.company.employee.controller;

import com.company.employee.dto.CreateEmployeeRequest;
import com.company.employee.dto.EmployeeResponse;
import com.company.employee.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    // CREATE (POST)
    @PostMapping
    public ResponseEntity<EmployeeResponse> createEmployee(@RequestBody CreateEmployeeRequest request) {
        EmployeeResponse response = service.createEmployee(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // READ ALL (GET)
    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {
        return ResponseEntity.ok(service.getAllEmployees());
    }

    // READ ONE (GET BY CODE)
    @GetMapping("/{empCode}")
    public ResponseEntity<EmployeeResponse> getEmployeeByCode(@PathVariable String empCode) {
        return ResponseEntity.ok(service.getEmployeeByCode(empCode));
    }

    // UPDATE (PUT)
    @PutMapping("/{empCode}")
    public ResponseEntity<EmployeeResponse> updateEmployee(
            @PathVariable String empCode,
            @RequestBody CreateEmployeeRequest request) {
        return ResponseEntity.ok(service.updateEmployee(empCode, request));
    }

    // DELETE (DELETE)
    @DeleteMapping("/{empCode}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable String empCode) {
        service.deleteEmployee(empCode);
        return ResponseEntity.noContent().build();
    }

}
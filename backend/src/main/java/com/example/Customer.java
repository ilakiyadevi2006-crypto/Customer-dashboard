package com.example.CustomerDashboard

import javax.persistence.*;

@Entity
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String detail;
    private String orderdetails;
    private int orderdate;
    private String note;
    private String status;

public Customer{
}
    public long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getDetail() {
        return detail;
    }
    public String getOrderdetails() {
        return orderdetails;
    }
    public int getOrderdate() {
        return orderdate;
    }
    public String getNote() {
        return note;
    }
    public int getStatus() {
        return status;
    }

    public void setId(long id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setDetails(String detail) {
        this.detail = detail;
    }
    public void setOrderdetails(String orderdetails) {
        this.orderdetails = orderdetails;
    }
    public void setOrderdate(int orderdate) {
        this.orderdate= orderdate;
}
    public void setNote(String note) {
        this.note= note;
    }
    public void setStatus(String status) {
        this.status= status;
    }
}


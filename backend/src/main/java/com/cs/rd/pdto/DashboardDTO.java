package com.cs.rd.pdto;

public class DashboardDTO {

    private int totalUsers;
    private double totalBalance;
    private double totalLateFees;
	public int getTotalUsers() {
		return totalUsers;
	}
	public void setTotalUsers(int totalUsers) {
		this.totalUsers = totalUsers;
	}
	public double getTotalBalance() {
		return totalBalance;
	}
	public void setTotalBalance(double totalBalance) {
		this.totalBalance = totalBalance;
	}
	public double getTotalLateFees() {
		return totalLateFees;
	}
	public void setTotalLateFees(double totalLateFees) {
		this.totalLateFees = totalLateFees;
	}

    
}

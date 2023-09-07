// Import necessary libraries if required
// Example: import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Define the StreamPayUSDT model
// Example using TypeORM decorators for database mapping
// Replace with your actual model implementation
// Example:
// @Entity('streampay_usdt_transactions')
export class StreamPayUSDT {
    // @PrimaryGeneratedColumn('uuid')
    id: string;
  
    // @Column({ type: 'uuid' })
    userId: string;
  
    // @Column({ type: 'decimal', precision: 18, scale: 6 })
    usdtAmount: number;
  
    // @Column({ type: 'timestamp' })
    timestamp: Date;
  
    // @Column({ type: 'text' })
    trxId: string;
  
    // Add additional fields as needed
    // Add Merchant Wallet Address
    merchantWalletAddress: string;
  
    // Add Charity Wallet Address
    charityWalletAddress: string;
  
    // Add Transaction Fee Wallet Address
    transactionFeeWalletAddress: string;
  
    // Add Tax Rate (e.g., VAT)
    taxRate: number;
  
    // Add Donation Amount
    donationAmount: number;
  
    constructor(
      id: string,
      userId: string,
      usdtAmount: number,
      timestamp: Date,
      trxId: string,
      merchantWalletAddress: string, // Initialize Merchant Wallet Address
      charityWalletAddress: string, // Initialize Charity Wallet Address
      transactionFeeWalletAddress: string, // Initialize Transaction Fee Wallet Address
      taxRate: number, // Initialize Tax Rate
      donationAmount: number // Initialize Donation Amount
    ) {
      this.id = id;
      this.userId = userId;
      this.usdtAmount = usdtAmount;
      this.timestamp = timestamp;
      this.trxId = trxId;
      this.merchantWalletAddress = merchantWalletAddress;
      this.charityWalletAddress = charityWalletAddress;
      this.transactionFeeWalletAddress = transactionFeeWalletAddress;
      this.taxRate = taxRate;
      this.donationAmount = donationAmount;
    }
  }
  
import {
    AbstractPaymentService,
    Cart,
    Data,
    Payment,
    PaymentSession,
    PaymentSessionStatus,
  } from "@medusajs/medusa";
  import { EntityManager } from "typeorm";
  import { StreamPayUSDT } from "../models/StreamPayUSDT";
  import { StreamPayUSDTRepository } from "../repositories/streampay-usdt";
  import { PublicKey, Transaction, Connection } from "@solana/web3.js";
  
  class StreamPayUSDTService extends AbstractPaymentService {
    private streamPayRepository: StreamPayUSDTRepository;
  
    // Stream Token-specific configuration
    private strmProviderUrl: string;
    private strmProviderUser: string;
    private strmProviderPassword: string;
  
    private strmNetworkType: string; // Mainnet, Testnet, or Custom
    private strmMerchantAddress: string; // Merchant's Stream Token address
    private usdtWalletAddress: string; // Merchant's USDT wallet address
  
    // Wallet addresses
    private merchantWalletAddress: string; // Merchant Wallet Address
    private charityWalletAddress: string; // Charity Wallet Address
    private transactionFeeWalletAddress: string; // Transaction Fee Wallet Address
  
    // Tax rate (e.g., 24% VAT)
    private taxRate: number;
  
    private daemon: Connection | null = null;
    private wallet: any = null;
  
    // Stream Token (STRM) program address
    private strmProgramAddress: PublicKey = new PublicKey(
      "5P3giWpPBrVKL8QP8roKM7NsLdi3ie1Nc2b5r9mGtvwb"
    );
  
    constructor(
      {
        streamPayRepository,
        strmProviderUrl,
        strmProviderUser,
        strmProviderPassword,
        strmNetworkType,
        strmMerchantAddress,
        usdtWalletAddress,
        merchantWalletAddress, // Add Merchant Wallet Address
        charityWalletAddress, // Add Charity Wallet Address
        transactionFeeWalletAddress, // Add Transaction Fee Wallet Address
        taxRate, // Add Tax Rate
      },
      options
    ) {
      super(options);
  
      this.streamPayRepository = streamPayRepository;
      this.strmProviderUrl = strmProviderUrl;
      this.strmProviderUser = strmProviderUser;
      this.strmProviderPassword = strmProviderPassword;
      this.strmNetworkType = strmNetworkType || "mainnet"; // Default to Mainnet if not specified
      this.strmMerchantAddress = strmMerchantAddress;
      this.usdtWalletAddress = usdtWalletAddress;
      this.merchantWalletAddress = merchantWalletAddress; // Initialize Merchant Wallet Address
      this.charityWalletAddress = charityWalletAddress; // Initialize Charity Wallet Address
      this.transactionFeeWalletAddress = transactionFeeWalletAddress; // Initialize Transaction Fee Wallet Address
      this.taxRate = taxRate; // Initialize Tax Rate
  
      // Initialize Stream Token-specific configurations
      this.initStrmProvider();
    }
  
    private async initStrmProvider() {
      // Initialize the Stream Token provider based on network type
      this.daemon = new Connection(this.strmProviderUrl, "singleGossip");
  
      // Create a wallet for Stream Token payments
      this.wallet = new Wallet({
        connection: this.daemon,
        payer: this.usdtWalletAddress, // Use the USDT wallet address for payments
      });
    }
  
    async getPaymentData(paymentSession: PaymentSession): Promise<Data> {
      // Implement logic to get payment data for StreamPay (USDT)
      // Include StreamPay (USDT)-specific details here
  
      // Calculate the total amount with fees and taxes
      const totalAmount = this.calculateTotalAmount(paymentSession.cart.total);
  
      const paymentData: Data = {
        paymentMethod: "USDT",
        amount: totalAmount,
        // Add other payment data fields, such as USDT-specific details
      };
  
      return paymentData;
    }
  
    async createPayment(cart: Cart): Promise<Data> {
      // Implement logic to create a USDT payment
      // You can create a payment request or transaction here
      // Include USDT-specific details as needed
  
      // Calculate the total amount with fees and taxes
      const totalAmount = this.calculateTotalAmount(cart.total);
  
      const paymentData: Data = {
        paymentMethod: "USDT",
        amount: totalAmount,
        // Add other payment data fields, such as USDT-specific details
      };
  
      return paymentData;
    }
  
    async capturePayment(payment: Payment): Promise<Data> {
      // Implement logic to capture a StreamPay (USDT) payment
      // You can mark the payment as captured or complete here
      // Include USDT-specific details as needed
  
      const capturedPayment: Data = {
        status: PaymentSessionStatus.CAPTURED,
        // Add other captured payment details as needed
      };
  
      return capturedPayment;
    }
  
    // Implement other payment-related methods as needed for StreamPay
  
    // Add any additional methods or logic specific to StreamPayments™
  
    private calculateTotalAmount(cartTotal: number): number {
      // Calculate StreamPayments operational / commission fees (e.g., 1.5%)
      const operationalFeesPercentage = 1.5;
      const operationalFees = (cartTotal * operationalFeesPercentage) / 100;
  
      // Calculate local tax fees (e.g., VAT)
      const localTaxFees = (cartTotal * this.taxRate) / 100;
  
      // Calculate donation (if provided)
      const donation = 0; // Replace with the actual donation amount from the charity wallet
  
      // Calculate the total amount with all fees and taxes
      const totalAmount =
        cartTotal + operationalFees + localTaxFees - donation;
  
      return totalAmount;
    }
  }
  
  export default StreamPayUSDTService;
  
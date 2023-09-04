  // Define mainnet and testnet Solana provider URLs
  const mainnetSolanaProviderUrl = "https://api.mainnet.solana.com"; // Replace with the mainnet URL
  const testnetSolanaProviderUrl = "https://api.devnet.solana.com"; // Replace with an appropriate testnet URL

  beforeEach(() => {
    paymentService = new StreamUSDCPaymentService(
      {
        streamPaymentRepository: mockStreamPaymentRepository as any, // Use appropriate type
      },
      {
        // Set the mainnet and testnet Solana provider URLs
        mainnetSolanaProviderUrl,
        testnetSolanaProviderUrl,
        daemonProviderUrl: "https://api.devnet.solana.com",
        daemonProviderUser: "your-daemon-username",
        daemonProviderPassword: "your-daemon-password",
      }
    );
  });

  afterEach(() => {
    paymentService.dispose(); // Clean up resources after each test
  });

  describe("getPaymentData", () => {
    it("should return payment data for mainnet", async () => {
      // Mock necessary methods or dependencies
      // Call getPaymentData and assert the result
      const paymentSession: PaymentSession = /* Mock paymentSession */;
      const tokenType: string = "USDC";
      const isTestnet: boolean = false;

      const paymentData = await paymentService.getPaymentData(paymentSession, tokenType, isTestnet);

      // Assert the paymentData
      expect(paymentData.paymentAddress).toBeDefined();
      // Add more assertions as needed
    });

    it("should return payment data for testnet", async () => {
      // Mock necessary methods or dependencies
      // Call getPaymentData and assert the result
      const paymentSession: PaymentSession = /* Mock paymentSession */;
      const tokenType: string = "USDC";
      const isTestnet: boolean = true;

      const paymentData = await paymentService.getPaymentData(paymentSession, tokenType, isTestnet);

      // Assert the paymentData
      expect(paymentData.paymentAddress).toBeDefined();
      // Add more assertions as needed
    });

    it("should handle errors", async () => {
      // Mock necessary methods or dependencies to simulate an error
      // Call getPaymentData and expect it to throw an error
      const paymentSession: PaymentSession = /* Mock paymentSession */;
      const tokenType: string = "USDC";
      const isTestnet: boolean = false;

      // Mock an error scenario
      // For example, if you want to simulate an error when connecting to Solana
      jest.spyOn(paymentService, "connect").mockRejectedValue(new Error("Simulated error"));

      // Call getPaymentData and expect it to throw an error
      await expect(paymentService.getPaymentData(paymentSession, tokenType, isTestnet)).rejects.toThrowError(
        "Simulated error"
      );
    });
  });

  // Add similar test cases for other methods of StreamUSDCPaymentService
});

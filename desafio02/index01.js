// Solução usando o padrão Adapter (baseada no problema em `problemAdapter.js`)

class LegacyPaymentSystem {
	makePayment(amount) {
		console.log(`Pagando R$${amount} com sistema legado.`);
	}
}

class ModernPaymentAPI {
	process(amountInCents) {
		console.log(`Pagamento de R$${amountInCents / 100} via API moderna.`);
	}
}

class PaymentProcessor {
	constructor(system) {
		this.system = system;
	}

	pay(amount) {
		this.system.makePayment(amount);
	}
}

class ModernPaymentAdapter {
	constructor(modernService) {
		this.modernService = modernService;
	}

	makePayment(amount) {
		const cents = Math.round(amount * 100);
		this.modernService.process(cents);
	}
}

// Cliente / testes
const legacy = new LegacyPaymentSystem();
const processorLegacy = new PaymentProcessor(legacy);
processorLegacy.pay(100);

const modern = new ModernPaymentAPI();
const adaptedModern = new ModernPaymentAdapter(modern);
const processorAdapted = new PaymentProcessor(adaptedModern);
processorAdapted.pay(200);
// Solução usando o padrão Adapter (baseada no problema em `problemAdapter.js`)
// Objetivo: adaptar a API moderna para a interface esperada pelo PaymentProcessor

class LegacyPaymentSystem {
	makePayment(amount) {
		console.log(`Pagando R$${amount} com sistema legado.`);
	}
}

class ModernPaymentAPI {
	// Essa API espera valor em centavos
	process(amountInCents) {
		console.log(`Pagamento de R$${amountInCents / 100} via API moderna.`);
	}
}

// PaymentProcessor espera um objeto com método makePayment(amount)
class PaymentProcessor {
	constructor(system) {
		this.system = system;
	}

	pay(amount) {
		this.system.makePayment(amount);
	}
}

// Adapter: torna ModernPaymentAPI compatível com a interface esperada
class ModernPaymentAdapter {
	constructor(modernService) {
		this.modernService = modernService;
	}

	// método esperado pelo PaymentProcessor
	makePayment(amount) {
		// converte reais para centavos e delega para a API moderna
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
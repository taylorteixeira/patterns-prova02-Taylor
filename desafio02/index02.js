// Solução usando o padrão Decorator (baseada no problema em `problemDecorator.js`)

class Message {
	constructor(text) {
		this.text = text;
	}

	getText() {
		return this.text;
	}
}

class MessageDecorator {
	constructor(message) {
		this.message = message;
	}

	getText() {
		return this.message.getText();
	}
}

class CapitalizeDecorator extends MessageDecorator {
	getText() {
		const original = super.getText();
		return original
			.split(/(\.|\?|!)/)
			.map((part) => {
				const trimmed = part.trim();
				if (!trimmed) return part; // preserva separadores
				return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
			})
			.join(' ')
			.replace(/\s+\./g, '.');
	}
}

class ProfanityFilterDecorator extends MessageDecorator {
	constructor(message, replacements = {}) {
		super(message);
		// mapa de palavras a substituir
		this.replacements = Object.assign({ horrível: '****' }, replacements);
	}

	getText() {
		let text = super.getText();
		for (const [bad, repl] of Object.entries(this.replacements)) {
			// simples replace case-insensitive
			const re = new RegExp(bad, 'gi');
			text = text.replace(re, repl);
		}
		return text;
	}
}

class EmphasizeDecorator extends MessageDecorator {
	getText() {
		const txt = super.getText();
		// adiciona exclamação, se não houver
		if (/[!?.]$/.test(txt.trim())) return txt;
		return txt + '!';
	}
}

// Cliente / demonstração
const msg = new Message('hoje o dia está horrível');
console.log('Original:', msg.getText());

const decorated = new EmphasizeDecorator(
	new CapitalizeDecorator(
		new ProfanityFilterDecorator(msg, { horrível: 'horrível (ruim)' })
	)
);

console.log('Decorated:', decorated.getText());
import { Component } from '@angular/core';

@Component({
  selector: 'app-faqs',
  standalone: false,
  templateUrl: './faqs.component.html',
})
export class FaqsComponent {
  general = [
    { q: 'What is Ecomera?', a: 'Ecomera is a Moroccan e-commerce platform offering electronics, fashion, jewelry, and more — with fast local delivery and real human support.' },
    { q: 'Do I need an account to order?', a: 'Yes. Creating an account takes under a minute and lets you track orders, keep a wishlist, and speed up checkout.' },
    { q: 'Which cities do you deliver to?', a: 'We currently deliver across Casablanca, Rabat, Marrakech, and Tangier, with nationwide expansion planned soon.' },
    { q: 'How do I track my order?', a: 'Once your order ships, you receive a tracking link by email. You can also view order status anytime from your profile.' },
  ];

  payments = [
    { q: 'What payment methods do you accept?', a: 'We accept credit/debit cards (Visa, Mastercard) and cash on delivery across all supported cities.' },
    { q: 'Is it safe to pay online?', a: 'Yes. All transactions are encrypted end-to-end, and we never store your full card details on our servers.' },
  ];

  returns = [
    { q: 'What is your return policy?', a: 'You have 30 days from delivery to return most items in their original condition for a full refund or exchange.' },
    { q: 'How do I start a return?', a: 'Head to your profile, open the order, and click "Return item". Our support team confirms the pickup within 48 hours.' },
    { q: 'When will I get my refund?', a: 'Refunds are issued to your original payment method within 5–7 business days after we receive the returned item.' },
  ];
}

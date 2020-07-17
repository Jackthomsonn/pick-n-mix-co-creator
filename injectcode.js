const { copyFileSync } = require('fs');

function injectCode() {
  copyFileSync('assets/replacements/checkout-sca/StripeCheckoutSca.tsx', 'node_modules/expo-stripe-checkout-sca/index.tsx')
}

module.exports = injectCode();

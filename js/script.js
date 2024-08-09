document.addEventListener('DOMContentLoaded', function() {
    const encryptButton = document.getElementById('encryptButton');
    const decryptButton = document.getElementById('decryptButton');
    const copyButton = document.getElementById('copyButton');
    const typeText = document.getElementById('typeText');
    const finalMessage = document.getElementById('finalMessage');

    const encryptionRules = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    const decryptionRules = Object.fromEntries(
        Object.entries(encryptionRules).map(([key, value]) => [value, key])
    );

    function encrypt(text) {
        return text.split('').map(char => encryptionRules[char] || char).join('');
    }

    function decrypt(text) {
        let result = text;
        for (const [encoded, original] of Object.entries(decryptionRules)) {
            result = result.split(encoded).join(original);
        }
        return result;
    }

    function updateFinalMessage(message) {
        finalMessage.textContent = message;
        copyButton.classList.remove('hidden');
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }

    encryptButton.addEventListener('click', () => {
        const text = typeText.value.toLowerCase();
        const encryptedText = encrypt(text);
        updateFinalMessage(encryptedText);
    });

    decryptButton.addEventListener('click', () => {
        const text = typeText.value.toLowerCase();
        const decryptedText = decrypt(text);
        updateFinalMessage(decryptedText);
    });

    copyButton.addEventListener('click', () => {
        copyToClipboard(finalMessage.textContent);
    });
});
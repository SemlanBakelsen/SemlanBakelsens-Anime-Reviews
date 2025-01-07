function loadTranslations(language) {
    // Load the translation JSON
    fetch(`../lang/${language}.json`)
        .then(response => response.json())
        .then(data => {

            // Get language data
            const languages = data.languages;

            // Loop through all language buttons and update their text content
            document.querySelectorAll('.language-selector button').forEach(button => {
                const langKey = button.getAttribute('data-lang'); // Get the language code from the button's data-lang attribute
                if (languages[langKey]) {
                    // Update only the text inside the parentheses based on the current language
                    const nativeLanguage = button.textContent.split('(')[0].trim(); // Extract the language name (before the parentheses)
                    button.textContent = `${nativeLanguage} (${languages[langKey]})`; // Keep native language, update translated part
                }
            });

            // Loop through each article with a data-key attribute
            document.querySelectorAll('article[data-key]').forEach(article => {
                const key = article.getAttribute('data-key');

                // Check if the translation exists for the key in the JSON
                if (data[key]) {

                    // Update the title, subtitle, and review
                    article.querySelector('h2').textContent = data[key].title;
                    article.querySelector('h3').textContent = data[key].subtitle;
                    article.querySelector('p').textContent = data[key].review;
                    article.querySelector('.rating').textContent = data[key].rating + '/10';

                }
            });
        })
        .catch(error => {
            console.error('Error loading translations:', error);
        });
}

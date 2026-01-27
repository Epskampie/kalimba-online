
var langs = [
    {code: 'ru', text: 'Russian (Русский)'}, // Russian
    {code: 'en', text: 'English (English)'}, // English
    {code: 'de', text: 'German (Deutsch)'}, // German
    {code: 'es', text: 'Spanish (Español)'}, // Spanish
    {code: 'fr', text: 'French (Français)'}, // French
    {code: 'zh-CN', text: 'Chinese (中文)'}, // Chinese (Simplified)
    {code: 'ar', text: 'Arabic (العربية)'}, // Arabic
    {code: 'pt', text: 'Portuguese (Português)'}, // Portuguese
    {code: 'ja', text: 'Japanese (日本語)'}, // Japanese
    {code: 'id', text: 'Indonesian (Bahasa Indonesia)'} // Indonesian
];

// Sorts the languages array by the text field
langs.sort(function(a, b) {
    var textA = a.text.toUpperCase();
    var textB = b.text.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});

var currentLang = window.localStorage && null !== window.localStorage.getItem("localization") ? window.localStorage.getItem("localization") : getUserLang();

// Returns the user's language code
function getUserLang() {
    // Get the user's preferred languages from navigator.languages
    var userLangs = navigator.languages;

    // Iterate through languages in order of preference
    for (var i = 0; i < userLangs.length; i++) {
        // Find the user's language in the langs array
        var userLanguage = langs.find(function(lang) {
            return lang.code === userLangs[i];
        });
        // If the language is found, return its code
        if (userLanguage) return userLanguage.code;
    }

    // If none of the languages were found, return the English language code
    return 'en';
}

// Load the default language (in case the selected language is missing translations for some keys)
var defaultLocalization;
$.getJSON('/lang/en.json', function(data) {
    defaultLocalization = data;
});

// Translates the entire page to the specified language
function loadLanguage(lang) {
    $.getJSON('/lang/' + lang + '.json', function(data) {
        $('html').attr('lang', lang);
        $('[data-i18n]').each(function() {
            var key = $(this).data('i18n');
            // If the key is missing in the localization, fall back to the default language
            $(this).text(data[key] || defaultLocalization[key]);
        });
        $('meta[name="description"]').attr('content', data["seo.description"] || defaultLocalization["seo.description"]);
    });
}

// Populates the language selector on the page with available languages
function fillLangSelector() {
    const LangSelector = $('#localization');
    LangSelector.empty();
    langs.forEach(lang => {
        LangSelector.append(
            $('<option>', {
                value: lang.code,
                text: lang.text
            })
        );
    });
    LangSelector.val(currentLang);
}

$(document).ready(function() {
    // Populate the language selector on the page with available languages
    fillLangSelector();

    // Load the current language
    loadLanguage(currentLang);

    // Localization change event
    $('#localization').change(function () {
        currentLang = $(this).val();
        window.localStorage && window.localStorage.setItem("localization", currentLang);
        loadLanguage(currentLang);
    });
});

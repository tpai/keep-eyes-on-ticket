const fetch = require('isomorphic-fetch');

module.exports = async function(text) {
  const result = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`, {
    method: 'POST',
    body: JSON.stringify({
      q: text,
      target: process.env.GOOGLE_TRANSLATE_TARGET_LANGUAGE
    })
  }).then(res => res.json());
  return getTranslatedText(result)
};

function getData(resource) {
  return resource.data || {}
}

function getTranslations(resource) {
  const data = getData(resource)
  return data.translations || []
}

function getFirstTranslation(resource) {
  const data = getTranslations(resource)
  return data[0] || {}
}

function getTranslatedText(resource) {
  const data = getFirstTranslation(resource)
  return data.translatedText || ''
}

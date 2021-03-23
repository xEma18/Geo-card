'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// DOM
const countryContainer = document.querySelector('.countries');
const form = document.querySelector('.country-form');

// Utility
const IMG_NOT_FOUD =
  'https://images.unsplash.com/photo-1514483127413-f72f273478c3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';
const spinner = `
<div class="lds-spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>`;

// Render functions
const renderSpinner = function (node) {
  node.innerHTML = spinner;
};

const renderForm = function () {
  form.classList.toggle('hidden');
};

const renderMarkup = function (geoData) {
  return `<div class="country">
        <img class = 'country-img' src="${
          geoData ? geoData.flag : IMG_NOT_FOUD
        }" alt="" />
        <div class="country-data">
            <h3 class="country-name">${
              geoData ? geoData.name : 'NOT FOUND'
            }</h2>
            <h4 class="country-region">${geoData ? geoData.region : '404'}</h4>
            <p class = 'country-row'><span>👫</span>${
              geoData ? `${Math.trunc(geoData.population / 1000000)} M` : ''
            }</p>
            <p class = 'country-row'><span>🗣️</span>${
              geoData ? geoData.languages[0].name : ''
            }</p>
            <p class = 'country-row'><span>💰</span>${
              geoData ? geoData.currencies[0].name : ''
            }</p>
        </div>
  </div>`;
};

// Logic
const showCard = async function (country) {
  try {
    // Loading spinner
    renderSpinner(countryContainer, spinner);

    // Hiding the form
    form.classList.toggle('hidden');

    const geoRes = await fetch(
      `https://restcountries.eu/rest/v2/name/${country}`
    );

    if (!geoRes.ok) throw new Error('aoaooo');

    const [geoData] = await geoRes.json();

    const markup = renderMarkup(geoData);

    countryContainer.innerHTML = markup;

    // Making form visible again
    renderForm();
  } catch (error) {
    // Rendering the error
    const markup = renderMarkup();
    countryContainer.innerHTML = markup;

    // Making form visible again
    renderForm();
  }
};

// Event handlers
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const inputField = this.querySelector('#country-query');
  const value = inputField.value;

  if (!value || typeof value !== 'string') return;

  inputField.value = '';
  showCard(value);
});

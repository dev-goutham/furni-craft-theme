class IconButton extends HTMLButtonElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(iconButtonTemplate.content.cloneNode(true));
  }
}

const iconButtonTemplate = document.createElement('template');
iconButtonTemplate.innerHTML = /* html */ `
  <style>
  button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer; 
  }
  button svg {
      height: 24px;
      color: #808080;
  }
  </style>

  <button>
    <!-- <slot name="icon" /> -->
    button
  </button>
`;

customElements.define('icon-button', IconButton);

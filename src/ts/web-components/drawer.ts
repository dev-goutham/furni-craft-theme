class DrawerComponent extends HTMLElement {
  private isOpen: boolean;
  constructor() {
    super();
    this.isOpen = false;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(
      template.content.cloneNode(true),
    );
    this.handleShowDrawer();
  }

  connectedCallback() {
    this.handleShowDrawer();
  }

  openDrawer() {
    this.isOpen = true;
    this.handleShowDrawer();
  }

  closeDrawer() {
    this.isOpen = false;
    this.handleShowDrawer();
  }

  toggleDrawer() {
    this.isOpen = !this.isOpen;
    this.handleShowDrawer();
  }

  handleShowDrawer() {
    const drawer =
      this.shadowRoot?.querySelector('.drawer');

    if (this.isOpen) {
      drawer?.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      drawer?.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }
}

const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>
    .hidden {
      display: none;
    }
    .drawer {
      width: 200px;
      max-width: 80%;
      background: black;
      height: 100vh;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      transition: all;
      padding: 40px;
      z-index: 11;
    }

    .close {
      display: flex;
      justify-content: end;
    }

  </style>

  <div class="drawer hidden">
    <div class="close">
      <slot class="toggle" name="close-menu" />
    </div>
    <slot class="body" name="body" />
  </div>
`;

customElements.define('drawer-component', DrawerComponent);

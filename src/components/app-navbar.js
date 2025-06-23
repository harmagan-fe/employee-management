import { LitElement, html, css } from "lit";
import { localizationService } from "../services/localization-service.js";
import { router } from "../services/router.js";

export class AppNavbar extends LitElement {
  static styles = css`
    .navbar {
      color: white;
      background: dodgerblue;
      padding: 12px 0;
      margin-bottom: 20px;
    }

    .navbar-content {
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-brand {
      font-size: 20px;
      font-weight: bold;
    }

    .navbar-nav {
      display: flex;
      gap: 20px;
    }

    .navbar-right {
      display: flex;
      align-items: center;
    }

    .navbar-nav a {
      color: white;
      text-decoration: none;
      padding: 8px 12px;
      border-radius: 4px;
    }

    .navbar-nav a:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .lang-selector {
      margin-left: 20px;
    }

    .lang-selector select {
      padding: 4px 8px;
      border: 1px solid #555;
      border-radius: 4px;
      background: #495057;
      color: white;
    }

    @media (max-width: 768px) {
      .navbar-content {
        flex-direction: column;
        gap: 10px;
      }

      .navbar-nav {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  `;

  static properties = {
    currentLang: { type: String },
  };

  constructor() {
    super();
    this.currentLang = localizationService.currentLang;
    this.setAttribute("data-localized", "");
  }

  render() {
    return html`
      <nav class="navbar">
        <div class="navbar-content">
          <div class="navbar-brand">${localizationService.t("appTitle")}</div>
          <div class="navbar-right">
            <div class="navbar-nav">
              <a href="/" @click="${this.handleNavigation}"
                >${localizationService.t("employees")}</a
              >
              <a href="/add" @click="${this.handleNavigation}"
                >${localizationService.t("addEmployee")}</a
              >
            </div>
            <div class="lang-selector">
              <select
                @change="${this.handleLanguageChange}"
                .value="${this.currentLang}"
              >
                <option value="en">English</option>
                <option value="tr">Türkçe</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  handleNavigation(e) {
    e.preventDefault();
    router.navigate(e.target.getAttribute("href"));
  }

  handleLanguageChange(e) {
    localizationService.setLanguage(e.target.value);
    this.currentLang = e.target.value;
  }
}

customElements.define("app-navbar", AppNavbar);

class GameOverlayEffects {
  fadeTimeout: any;

  get gameOverlay() {
    return document.querySelector(".game-overlay");
  }

  fade() {
    this.gameOverlay?.classList.add("fade");

    clearTimeout(this.fadeTimeout);

    this.fadeTimeout = setTimeout(() => {
      this.gameOverlay?.classList.remove("fade");
    }, 5000);
  }
}

export const $gameOverlayEffects = new GameOverlayEffects();

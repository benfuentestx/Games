const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Crossy Road 3D Game Tests', () => {
  test('capture game screenshots and video', async ({ page }) => {
    // Navigate to the game HTML file
    const gameFilePath = path.join(__dirname, '..', 'crossy-road-3d.html');
    await page.goto(`file://${gameFilePath}`);

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Take initial screenshot
    await page.screenshot({ path: 'screenshots/initial-load.png', fullPage: true });
    console.log('Screenshot taken: initial-load.png');

    // Wait a bit for the game to initialize
    await page.waitForTimeout(1000);

    // Take screenshot after game initialization
    await page.screenshot({ path: 'screenshots/game-initialized.png', fullPage: true });
    console.log('Screenshot taken: game-initialized.png');

    // Simulate some gameplay by pressing arrow keys
    console.log('Starting gameplay simulation...');

    // Move forward a few times
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('ArrowUp');
      await page.waitForTimeout(500);
      await page.screenshot({ path: `screenshots/move-forward-${i + 1}.png`, fullPage: true });
      console.log(`Screenshot taken: move-forward-${i + 1}.png`);
    }

    // Move left
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/move-left.png', fullPage: true });
    console.log('Screenshot taken: move-left.png');

    // Move right
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/move-right.png', fullPage: true });
    console.log('Screenshot taken: move-right.png');

    // Continue playing for a bit to capture more gameplay
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowUp');
      await page.waitForTimeout(300);
    }

    await page.screenshot({ path: 'screenshots/gameplay-progress.png', fullPage: true });
    console.log('Screenshot taken: gameplay-progress.png');

    // Let the game run for a few more seconds to capture video
    await page.waitForTimeout(3000);

    // Take final screenshot
    await page.screenshot({ path: 'screenshots/final-state.png', fullPage: true });
    console.log('Screenshot taken: final-state.png');
  });

  test('capture extended gameplay video', async ({ page }) => {
    // Navigate to the game HTML file
    const gameFilePath = path.join(__dirname, '..', 'crossy-road-3d.html');
    await page.goto(`file://${gameFilePath}`);

    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    console.log('Recording extended gameplay...');

    // Simulate more complex gameplay pattern
    const moves = [
      'ArrowUp', 'ArrowUp', 'ArrowLeft', 'ArrowUp',
      'ArrowRight', 'ArrowUp', 'ArrowUp', 'ArrowRight',
      'ArrowUp', 'ArrowLeft', 'ArrowUp', 'ArrowUp'
    ];

    for (const move of moves) {
      await page.keyboard.press(move);
      await page.waitForTimeout(400);
    }

    // Let the game continue for a bit
    await page.waitForTimeout(2000);

    // Take a final screenshot for this test
    await page.screenshot({ path: 'screenshots/extended-gameplay.png', fullPage: true });
    console.log('Screenshot taken: extended-gameplay.png');
  });
});

const { test } = require('@playwright/test');
const path = require('path');

test('extract frames from reference video', async ({ page }) => {
    // Create a simple HTML page to play the video
    const videoPath = path.join(__dirname, '..', '.claude', 'Cluade videos', 'Untitled video - Made with Clipchamp.mp4');
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { margin: 0; padding: 20px; background: #000; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
                video { max-width: 100%; max-height: 90vh; }
            </style>
        </head>
        <body>
            <video id="video" controls autoplay>
                <source src="file:///${videoPath.replace(/\\/g, '/')}" type="video/mp4">
            </video>
        </body>
        </html>
    `;

    await page.setContent(htmlContent);
    await page.waitForTimeout(1000);

    // Take screenshots at different time intervals
    const times = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    for (let i = 0; i < times.length; i++) {
        const time = times[i];
        await page.evaluate((t) => {
            const video = document.getElementById('video');
            video.currentTime = t;
        }, time);

        await page.waitForTimeout(500);
        await page.screenshot({ path: `screenshots/video-frame-${time}s.png`, fullPage: true });
        console.log(`Captured frame at ${time}s`);
    }
});

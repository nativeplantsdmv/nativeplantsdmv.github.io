#!/usr/bin/env node
// Mobile viewport simulation using Puppeteer + CDP emulation
// Usage: node test-mobile.js <url> [viewport-preset]
// Presets: iphone-se (375x667), iphone-12 (390x844), iphone-14-pro-max (430x932), 
//          galaxy-s21 (360x800), pixel-6 (412x915), desktop-wide (1920x1080)

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PRESETS = {
  'iphone-se':      { width: 375,  height: 667,  dpr: 2, label: 'iPhone SE' },
  'iphone-12':      { width: 390,  height: 844,  dpr: 3, label: 'iPhone 12' },
  'iphone-14-pro-max': { width: 430,  height: 932, dpr: 3, label: 'iPhone 14 Pro Max' },
  'galaxy-s21':     { width: 360,  height: 800,  dpr: 3, label: 'Galaxy S21' },
  'pixel-6':        { width: 412,  height: 915,  dpr: 3, label: 'Pixel 6' },
  'desktop-wide':   { width: 1920, height: 1080, dpr: 1, label: 'Desktop 1080p' },
};

async function runMobileTest(url, presetName = 'iphone-se') {
  const preset = PRESETS[presetName] || PRESETS['iphone-se'];
  
  console.log(`Testing ${url} on ${preset.label} (${preset.width}x${preset.height}@${preset.dpr}dpr)`);
  
  // Launch browser with mobile-specific flags
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-web-security',
      `--window-size=${preset.width},${preset.height}`,
      '--force-device-scale-factor=' + preset.dpr,
    ]
  });

  const page = await browser.newPage();
  
  // Emulate exact device metrics via CDP (more reliable than setViewport)
  await page.emulate(preset);
  
  // Set mobile user agent to match preset
  await page.setUserAgent(`Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1`);
  
  // Navigate with proper wait conditions
  await page.goto(url, { 
    waitUntil: 'networkidle2',
    timeout: 30000 
  });
  
  // Small delay to ensure any CSS transitions/animations settle
  await new Promise(r => setTimeout(r, 500));
  
  // Take screenshot
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const safeLabel = preset.label.replace(/[^a-zA-Z0-9]/g, '_');
  const screenshotPath = path.resolve(`mobile-test-${safeLabel}-${timestamp}.png`);
  
  await page.screenshot({ 
    path: screenshotPath,
    fullPage: true, // Captures entire scrollable area
    omitBackground: false, // Keep white background for mobile simulators
  });
  
  console.log(`Screenshot saved: ${screenshotPath}`);
  
  // Extract page info for debugging
  const pageInfo = await page.evaluate(() => ({
    title: document.title,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    documentHeight: document.body.scrollHeight,
    imagesLoaded: Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src.split('/').pop(),
      alt: img.alt,
      complete: img.complete
    })),
  }));
  
  console.log(`Page info:`);
  console.log(JSON.stringify(pageInfo, null, 2));
  
  await browser.close();
  
  return { screenshotPath, pageInfo };
}

// Run with command line args or defaults
const url = process.argv[2] || 'https://nativeplantsdmv.github.io/';
const preset = process.argv[3] || 'iphone-se';

runMobileTest(url, preset)
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });

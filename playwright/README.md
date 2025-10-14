# Playwright Tests for Crossy Road 3D

This folder contains Playwright tests to capture screenshots and videos of the Crossy Road 3D game.

## Setup

All dependencies are already installed. The setup includes:
- Playwright Test Framework
- Chromium browser
- Video recording configuration
- Screenshot capture utilities

## Running Tests

### Run all tests (headless mode with video recording)
```bash
npm test
```

### Run tests in headed mode (see the browser)
```bash
npm run test:headed
```

### Run tests in debug mode (step through tests)
```bash
npm run test:debug
```

### View test report
```bash
npm run show-report
```

## Output Locations

- **Videos**: `test-results/` folder - Each test run generates a video file
- **Screenshots**: `screenshots/` folder - Individual screenshots captured during gameplay
- **Test Report**: `playwright-report/` folder - HTML report with test results

## Test Details

The test suite includes two tests:

1. **Basic Gameplay Capture**: Captures screenshots at various stages:
   - Initial load
   - Game initialization
   - Forward movements (3 steps)
   - Left movement
   - Right movement
   - Progress screenshot
   - Final state

2. **Extended Gameplay**: Simulates a longer gameplay session with complex movement patterns

## What Gets Captured

- Full page screenshots at key moments
- Continuous video recording of the entire test session
- Movement patterns: up, down, left, right navigation
- Game state at different points in time

## Tips

- Videos are automatically saved in `test-results/` after each test run
- Screenshots are saved in `screenshots/` during test execution
- Use `--headed` mode to watch the browser in action
- Use `--debug` mode to step through tests and pause execution

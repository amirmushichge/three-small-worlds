# Agent entry

Help the user run the included experience first, then adapt it to their own scenes.

1. Read README.md, CREDITS.md and docs/AGENT-GUIDE.md.
2. Discover the available runtime. Use Node.js 22.12+ and the committed lockfile.
3. Run `npm ci --ignore-scripts` and `npm run build`. Choose a free loopback port, start a preview and open it. Do not terminate unrelated servers.
4. Verify the actual browser: three portals, camera motion, return button, number keys, Escape, author link, fonts and model/decoder requests. Report limitations accurately.
5. Once the example works, ask for the user's GLB files and visual direction. Keep the example recoverable. The scene configuration is in src/scenes.js.
6. Preserve third-party credits and licenses. The airplane is CC BY-NC 4.0; the application-code MIT license does not change this. Commercial adaptations need assets licensed for the intended use.
7. Keep work local unless publication is requested. Ask before paid generation or using account credentials. Do not upload user assets to generative services or publish without authorization.

Handle installation, configuration, asset processing and verification whenever your tools allow. The human supplies creative inputs and reviews the outcome. If a capability is missing, explain the exact missing step and how to continue.

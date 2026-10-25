# Three Small Worlds: local experience

Double-click **START.cmd**. It starts a local server and opens your browser.
Use **STOP.cmd** to stop that server. Running START again reuses the existing instance.

The default URL is http://127.0.0.1:4183/. If that port belongs to another application, the launcher picks a free port through 4193 and prints its URL.

## Controls

- Click a portal to enter its animated scene.
- Drag to move the camera; use the wheel to change distance.
- Click **< back** or press **Escape** to return.
- Keys **1**, **2**, **3** select the train, airplane and Tokyo scenes.

The desktop composition is preserved from the supplied concept. Narrow screens still crop the side portals; no mobile redesign is included.

## Requirements and editing

Node.js must be available on this machine. The included production build needs no npm install to run. The launcher also detects the bundled Codex Node runtime on this host.

For source editing:

```powershell
npm ci --ignore-scripts
npm run dev
```

After source changes, run `npm run build` to update the version served by START.cmd, then refresh the browser.

The server binds only to 127.0.0.1. Models, fonts and the Draco decoder are served locally. No account, API key, model generation or public hosting is used. Logs and the running server URL are stored in `.runtime/`.

## Sources

The original README contains the project and scene credits. This is a local adaptation of the supplied pmndrs-based experiment. Scene licenses remain separate from the application code; the Flying Circus model is CC BY-NC. The missing Inter Regular font was added from https://rsms.me/inter/; its license is included in public/fonts/INTER-LICENSE.txt.

# Run and adapt the portal study

## First run

Discover Node.js and npm on the current host. Use Node.js 22.12+ and the committed lockfile:

```sh
npm ci --ignore-scripts
npm run build
npm run preview -- --port 4183 --strictPort
```

If the port is occupied, choose another free port. Open the printed loopback URL. This static Vite application needs no API keys, backend, database or generation provider.

Use `npm run dev -- --port 4183 --strictPort` while editing. The Windows START.cmd launcher serves the last production build; rebuild after changes when using that launcher.

## File map

| File | Purpose |
| --- | --- |
| src/scenes.js | IDs, labels, model URLs, backgrounds, card placement and model transforms |
| src/main.jsx | Portal rendering, GLB animations, camera transitions, interface and keyboard controls |
| src/styles.css | Layout, typography and links |
| public/models/ | GLB samples |
| public/draco/ | Local Draco decoder and license |
| public/fonts/ | Local Inter fonts and license |
| CREDITS.md | Model sources and upstream references |
| vercel.json | Static deployment configuration |

## Replace a world

Replace one scene first, retaining the other two as a working comparison.

1. Ask for a GLB the user has permission to use. Record its source and license before redistribution.
2. Inspect its bounds, origin, materials and animation clips with local tools. Do not send it to an external generation service.
3. Put it in `public/models/` and update `src` in `src/scenes.js`.
4. Adjust `model.scale`, `model.position` and `model.rotation` to frame it. Rotations are radians. The outer `position` and `rotation` place the card itself.
5. Check entry as well as the overview. The active camera looks toward local `[0, 0, -2]` from `[0, 0.5, 0.25]`. Changing these in `Rig` is a separate creative choice.
6. Embedded clips play automatically. Static GLBs remain static; this project does not generate animation. Review lighting with each new model.
7. Update CREDITS.md, then build and verify.

Native animations remain mounted when entering/leaving portals. Preserve that continuity.

## Verification

Check the overview, real pointer entry into every portal, camera drag and wheel distance, back button, keys 1/2/3 and Escape. Check browser errors and HTTP responses for models, fonts and decoder files. All runtime assets should come from the same origin. Check the author link's destination and that it opens a separate tab.

Inspect narrow screens separately. This desktop-first composition crops side cards on a narrow viewport. Physical mobile performance was not established. Keyboard shortcuts are included; a complete screen-reader alternative to the WebGL scene is not.

## Deployment

Publish only when requested. Verify account and project before acting. `npm run build` produces `dist/`; Vercel can import the repository using the included Vite settings. Verify the public URL anonymously, including models, fonts, decoders, links and portal interaction.

Source and model licenses are separate. Replace the noncommercial airplane or obtain permission before promising a commercially reusable asset package.

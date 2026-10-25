# Credits and licenses

## Portal reference and software

This study adapts the [Enter portals example](https://pmndrs.github.io/examples/enter-portals/) from [Poimandres / pmndrs](https://github.com/pmndrs/examples). The reference is credited to [Paul Henschel / drcmda](https://github.com/drcmda), who shared it in the [Three.js forum](https://discourse.threejs.org/t/how-to-create-a-portal-effect-or-how-to-fake-it/57752/5).

Portal materials, camera tools and scene loaders come from [React Three Drei](https://github.com/pmndrs/drei). Rendering uses [React Three Fiber](https://github.com/pmndrs/react-three-fiber), [Three.js](https://github.com/mrdoob/three.js), [React](https://github.com/facebook/react) and [maath](https://github.com/pmndrs/maath). The build uses [Vite](https://github.com/vitejs/vite). Their license notices remain in their packages. The pmndrs examples MIT notice is included in [LICENSES/pmndrs-examples-MIT.txt](LICENSES/pmndrs-examples-MIT.txt).

Application adaptation and presentation: [Amir Mushich](https://x.com/amirmushich).

## Included 3D scenes

| File | Original work and author | License |
| --- | --- | --- |
| public/models/train-cabin.glb | [1930s Train Cabin](https://sketchfab.com/3d-models/1930s-train-cabin-2f109ba713fe455b959e4d79676b5c2d) by [thomas.rynne](https://sketchfab.com/thomas.rynne) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| public/models/flying-circus.glb | [Stylized Airplane - The Flying Circus Diorama](https://sketchfab.com/3d-models/stylized-airplane-the-flying-circus-diorama-cbb8d5ed7fd745e3a5b9af7ae3ab9b42) by [Mikkel Garde Blaase / plorigon](https://sketchfab.com/plorigon) | [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) |
| public/models/littlest-tokyo.glb | [Littlest Tokyo](https://sketchfab.com/models/94b24a60dc1b48248de50bf087c0f042) by [Glen Fox / glenatron](https://sketchfab.com/glenatron) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

The models are third-party work. This study adjusts placement, scale, orientation and lighting. The supplied train and airplane metadata identifies glTF-Transform as their file generator; the exact preprocessing recipe is not included. Animation clips come from the supplied models. No endorsement by their authors is implied.

The airplane's noncommercial restriction remains in force. Its source page also carries a NoAI notice. Check source notices before reuse and retain attribution when redistributing models. Commercial adaptations should use models licensed for their intended use, replace the airplane, or obtain the author's permission. The application-code MIT license does not relicense these assets.

## Fonts and decoder

- [Inter](https://rsms.me/inter/) by Rasmus Andersson, SIL Open Font License 1.1. See [public/fonts/INTER-LICENSE.txt](public/fonts/INTER-LICENSE.txt).
- [Draco](https://github.com/google/draco) by Google and contributors, Apache License 2.0. See [public/draco/LICENSE.txt](public/draco/LICENSE.txt).

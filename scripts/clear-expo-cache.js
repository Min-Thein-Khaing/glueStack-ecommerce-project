/**
 * Clears Expo CLI API caches that can cause "Body has already been read" on start.
 * Run: npm run cache:reset-expo
 */
const fs = require("fs");
const path = require("path");
const os = require("os");

function rmDir(dir) {
  if (!fs.existsSync(dir)) return false;
  fs.rmSync(dir, { recursive: true, force: true });
  return true;
}

const projectRoot = path.join(__dirname, "..");
const globalExpo = path.join(os.homedir(), ".expo");

const targets = [
  path.join(globalExpo, "versions-cache"),
  path.join(globalExpo, "native-modules-cache"),
  path.join(projectRoot, ".expo", "cache"),
];

let cleared = 0;
for (const dir of targets) {
  if (rmDir(dir)) {
    console.log("Removed:", dir);
    cleared++;
  }
}

if (cleared === 0) {
  console.log("No Expo cache folders found (already clean).");
} else {
  console.log(`\nCleared ${cleared} cache folder(s). Run: npm run start:clear`);
}

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const LEANBACK_FEATURE = '<uses-feature android:name="android.software.leanback" android:required="false" />';
const TOUCHSCREEN_FEATURE = '<uses-feature android:name="android.hardware.touchscreen" android:required="false" />';
const LEANBACK_CATEGORY = '<category android:name="android.intent.category.LEANBACK_LAUNCHER" />';
const HOME_CATEGORY = '<category android:name="android.intent.category.HOME" />';
const DEFAULT_CATEGORY = '<category android:name="android.intent.category.DEFAULT" />';

export function patchAndroidManifestForTv(manifestXml) {
  let updated = manifestXml;

  if (!updated.includes('android.software.leanback')) {
    updated = updated.replace(
      /(<manifest\b[^>]*>)/,
      `$1\n\n    ${LEANBACK_FEATURE}`
    );
  }

  if (!updated.includes('android.hardware.touchscreen')) {
    updated = updated.replace(
      LEANBACK_FEATURE,
      `${LEANBACK_FEATURE}\n    ${TOUCHSCREEN_FEATURE}`
    );
  }

  if (!updated.includes('android:banner=')) {
    updated = updated.replace(
      /<application\b/,
      '<application\n        android:banner="@mipmap/ic_launcher"'
    );
  }

  if (!updated.includes('android:screenOrientation=')) {
    updated = updated.replace(
      /<activity\b/,
      '<activity\n            android:screenOrientation="sensorLandscape"'
    );
  }

  const launcherAnchor = '<category android:name="android.intent.category.LAUNCHER" />';
  if (updated.includes(launcherAnchor)) {
    const categoriesToAdd = [];
    if (!updated.includes('android.intent.category.LEANBACK_LAUNCHER')) {
      categoriesToAdd.push(`                ${LEANBACK_CATEGORY}`);
    }
    if (!updated.includes('android.intent.category.HOME')) {
      categoriesToAdd.push(`                ${HOME_CATEGORY}`);
    }
    if (!updated.includes('android.intent.category.DEFAULT')) {
      categoriesToAdd.push(`                ${DEFAULT_CATEGORY}`);
    }
    if (categoriesToAdd.length > 0) {
      updated = updated.replace(
        launcherAnchor,
        `${launcherAnchor}\n${categoriesToAdd.join('\n')}`
      );
    }
  }

  return updated;
}

export function runConfigureAndroidTv(rootDir = process.cwd()) {
  const manifestPath = path.join(rootDir, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
  if (!fs.existsSync(manifestPath)) {
    throw new Error(
      `AndroidManifest.xml not found at ${manifestPath}. Run "npx cap add android" first.`
    );
  }

  const original = fs.readFileSync(manifestPath, 'utf8');
  const patched = patchAndroidManifestForTv(original);
  if (patched !== original) {
    fs.writeFileSync(manifestPath, patched, 'utf8');
  }
  return manifestPath;
}

const isDirectExecution =
  process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isDirectExecution) {
  const updatedPath = runConfigureAndroidTv();
  console.log(`Configured Android TV manifest: ${updatedPath}`);
}

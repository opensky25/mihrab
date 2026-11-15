import test from 'node:test';
import assert from 'node:assert/strict';
import { patchAndroidManifestForTv } from './configure-android-tv.mjs';

const SAMPLE_CAPACITOR_MANIFEST = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <activity
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode|navigation"
            android:name=".MainActivity"
            android:label="@string/title_activity_main"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:launchMode="singleTask"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

        </activity>
    </application>

    <uses-permission android:name="android.permission.INTERNET" />
</manifest>
`;

test('patchAndroidManifestForTv adds Leanback, Home launcher categories, and TV features idempotently', () => {
  const once = patchAndroidManifestForTv(SAMPLE_CAPACITOR_MANIFEST);
  assert.equal(once.includes('android.software.leanback'), true);
  assert.equal(once.includes('android.hardware.touchscreen'), true);
  assert.equal(once.includes('android:banner="@mipmap/ic_launcher"'), true);
  assert.equal(once.includes('android:screenOrientation="sensorLandscape"'), true);
  assert.equal(once.includes('android.intent.category.LEANBACK_LAUNCHER'), true);
  assert.equal(once.includes('android.intent.category.HOME'), true);
  assert.equal(once.includes('android.intent.category.DEFAULT'), true);

  const twice = patchAndroidManifestForTv(once);
  assert.equal(twice, once);
});

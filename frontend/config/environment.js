var environments = {
	staging: {
		FIREBASE_API_KEY: 'AIzaSyDtRsbW_ubheql31bq7Tz5-3KZicpi-aJs',
		FIREBASE_AUTH_DOMAIN: 'bigdata-178fc.firebaseapp.com',
		FIREBASE_APP_ID: '1:899010997371:web:492767bc40c490351946de',
		FIREBASE_PROJECT_ID: 'bigdata-178fc',
		FIREBASE_STORAGE_BUCKET: 'bigdata-178fc.appspot.com',
		FIREBASE_MESSAGING_SENDER_ID: 'G-BFXK6J08JV',
		GOOGLE_CLOUD_VISION_API_KEY: 'AIzaSyDqM_RK_bUadNf3jKjOMPPdbbbR7X7Hutk'
	},
	production: {
		// Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
	}
};

function getReleaseChannel() {
	let releaseChannel = Expo.Constants.manifest.releaseChannel;
	if (releaseChannel === undefined) {
		return 'staging';
	} else if (releaseChannel === 'staging') {
		return 'staging';
	} else {
		return 'staging';
	}
}
function getEnvironment(env) {
	console.log('Release Channel: ', getReleaseChannel());
	return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;
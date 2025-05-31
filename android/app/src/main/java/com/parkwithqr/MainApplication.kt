package com.parkwithqr

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.soloader.SoLoader
import com.twiliovoicereactnative.VoiceApplicationProxy
import com.google.firebase.FirebaseApp;


class MainApplication : Application(), ReactApplication {

  // Use the Twilio Voice-compatible ReactNativeHost
  private val voiceReactNativeHost = object : VoiceApplicationProxy.VoiceReactNativeHost(this) {
    override fun getPackages(): List<ReactPackage> =
        PackageList(this).packages

    override fun getJSMainModuleName(): String = "index"

    override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
  }

  override val reactNativeHost: ReactNativeHost
    get() = voiceReactNativeHost

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
      FirebaseApp.initializeApp(this); // Add this line

    VoiceApplicationProxy(voiceReactNativeHost).onCreate()
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }
  }

  override fun onTerminate() {
    super.onTerminate()
    VoiceApplicationProxy(voiceReactNativeHost).onTerminate()
  }
}

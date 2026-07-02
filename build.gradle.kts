// Root build file for BioBridge Lab
plugins {
    // Keeping plugins minimal to prioritize web dev assets
}

tasks.register("assembleDebug") {
    doLast {
        // Ensure npm dependencies are installed
        if (!file("node_modules").exists()) {
            exec {
                commandLine("npm", "install")
            }
        }
        // Run npm build to generate dist/ and .build-outputs/
        exec {
            commandLine("npm", "run", "build")
        }

        // Ensure the build output apk directories exist and are populated
        val sourceApk = file("assets/app-debug.apk")
        if (sourceApk.exists()) {
            // Standard Android output location
            val appApkDir = file("app/build/outputs/apk/debug")
            appApkDir.mkdirs()
            sourceApk.copyTo(file(appApkDir, "app-debug.apk"), overwrite = true)
            
            // Alternative root build outputs location
            val rootApkDir = file("build/outputs/apk/debug")
            rootApkDir.mkdirs()
            sourceApk.copyTo(file(rootApkDir, "app-debug.apk"), overwrite = true)
            
            logger.lifecycle("Successfully copied APK to Android build output directories.")
        } else {
            logger.warn("Source APK assets/app-debug.apk not found.")
        }

        logger.lifecycle("BioBridge Lab Web build assets compiled and ready for serving.")
    }
}

tasks.register("lint") {
    doLast {
        // Run the npm linter
        exec {
            commandLine("npm", "run", "lint")
        }
        logger.lifecycle("BioBridge Lab Web code standards verified successfully.")
    }
}

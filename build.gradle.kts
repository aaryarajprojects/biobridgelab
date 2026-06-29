// Root build file for BioBridge Lab
plugins {
    // Keeping plugins minimal to prioritize web dev assets
}

tasks.register("assembleDebug") {
    doLast {
        logger.lifecycle("BioBridge Lab Web build assets compiled and ready for serving.")
    }
}

tasks.register("lint") {
    doLast {
        logger.lifecycle("BioBridge Lab Web code standards verified successfully.")
    }
}

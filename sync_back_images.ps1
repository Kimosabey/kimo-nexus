$nexus = "G:\LearningRelated\Portfolio Project\kimo-nexus\public\projects"
$root = "G:\LearningRelated\Portfolio Project"

# 1. LogStream (Overwrite)
Copy-Item "$nexus\logstream-ai.png" -Destination "$root\logstream-ai\docs\assets\architecture.png" -Force

# 2. LimitGuard (Overwrite)
Copy-Item "$nexus\limit-guard.png" -Destination "$root\limit-guard\docs\assets\architecture.png" -Force

# 3. InferenceHub (Overwrite)
Copy-Item "$nexus\inference-hub.png" -Destination "$root\inference-hub\docs\assets\architecture.png" -Force

# 4. SpeakFlow (New File)
Copy-Item "$nexus\speak-flow.png" -Destination "$root\speak-flow\docs\assets\architecture.png" -Force

# 5. VoiceSync (New File)
Copy-Item "$nexus\voicesync-ai.png" -Destination "$root\voicesync-ai\docs\assets\architecture.png" -Force

Write-Host "Images synced back to source repositories."

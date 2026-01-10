$dest = "G:\LearningRelated\Portfolio Project\kimo-nexus\public\projects"

Copy-Item "C:/Users/Harshan/.gemini/antigravity/brain/58f305a4-ca0b-4a40-aed2-b5dc94c52aaf/speak_flow_architecture_1768058887562.png" -Destination "$dest/speak-flow.png" -Force
Copy-Item "C:/Users/Harshan/.gemini/antigravity/brain/58f305a4-ca0b-4a40-aed2-b5dc94c52aaf/voicesync_architecture_1768058914190.png" -Destination "$dest/voicesync-ai.png" -Force
Copy-Item "C:/Users/Harshan/.gemini/antigravity/brain/58f305a4-ca0b-4a40-aed2-b5dc94c52aaf/logstream_architecture_1768058942962.png" -Destination "$dest/logstream-ai.png" -Force
Copy-Item "C:/Users/Harshan/.gemini/antigravity/brain/58f305a4-ca0b-4a40-aed2-b5dc94c52aaf/limit_guard_architecture_1768058962091.png" -Destination "$dest/limit-guard.png" -Force
Copy-Item "C:/Users/Harshan/.gemini/antigravity/brain/58f305a4-ca0b-4a40-aed2-b5dc94c52aaf/inference_hub_architecture_1768058986482.png" -Destination "$dest/inference-hub.png" -Force

Write-Host "All 5 infographic images updated successfully."

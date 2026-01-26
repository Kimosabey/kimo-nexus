$destBase = "G:\LearningRelated\Portfolio Project\kimo-nexus\public\projects"
$rootDir = "G:\LearningRelated\Portfolio Project"

# List of projects to sync (Folder Name -> Target ID)
$projects = @{
    "chronicle-ledge"  = "chronicle-ledge"
    "data-quarantine"  = "data-quarantine"
    "order-saga"       = "order-saga"
    "spec-lens"        = "spec-lens"
    "logstream-ai"     = "logstream-ai"
    "limit-guard"      = "limit-guard"
    "voicesync-ai"     = "voicesync-ai"
    "velocity-edge"    = "velocity-edge"
    "vox-agent-neural" = "vox-agent-neural"
    "token-forge"      = "token-forge"
    "ring-route"       = "ring-route"
    "docmind-ai"       = "docmind-ai"
    "agent-core"       = "agent-core"
    "speak-flow"       = "speak-flow"
    "inference-hub"    = "inference-hub"
    "live-nexus-ai"    = "live-nexus-ai"
}

Write-Host "--- Sychronizing Assets to Folder Structure ---"

foreach ($projFolder in $projects.Keys) {
    $targetId = $projects[$projFolder]
    $sourceAssets = "$rootDir\$projFolder\docs\assets"
    $targetDir = "$destBase\$targetId"

    if (Test-Path $sourceAssets) {
        Write-Host "Processing [$targetId]..."
        
        # Create unique folder for the project
        if (-not (Test-Path $targetDir)) {
            New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
            Write-Host "  [+] Created folder: $targetDir"
        }

        # Copy all PNG/GIF/JPG assets
        $assets = Get-ChildItem -Path $sourceAssets -Include *.png, *.jpg, *.jpeg, *.gif, *.webp -Recurse
        
        foreach ($file in $assets) {
            $destFile = Join-Path $targetDir $file.Name
            Copy-Item -Path $file.FullName -Destination $destFile -Force
            Write-Host "  [->] Copied $($file.Name)"
        }
    }
    else {
        Write-Host "  [!] No assets found for $projFolder (Skipping)"
    }
}

Write-Host "--- Sync Complete ---"

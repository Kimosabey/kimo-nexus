$destRoot = "G:\LearningRelated\Portfolio Project\kimo-nexus\public\projects"
$sourceRoot = "G:\LearningRelated\Portfolio Project"

# 1. CLEANUP: Encapsulate in a try-catch to avoid erroring on open files
Write-Host "--- NUKING existing assets in KimoNexus ---" -ForegroundColor Red
if (Test-Path $destRoot) {
    Get-ChildItem -Path $destRoot -Recurse | Remove-Item -Force -Recurse
}
New-Item -ItemType Directory -Force -Path $destRoot | Out-Null

# 2. DEFINE MAPPING: Project ID -> Source Folder Name
$projectMap = @{
    "vox-agent-neural" = "vox-agent-neural"
    "live-nexus-ai"    = "live-nexus-ai"
    "logstream-ai"     = "logstream-ai"
    "voicesync-ai"     = "voicesync-ai"
    "limit-guard"      = "limit-guard"
    "token-forge"      = "token-forge"
    "chronicle-ledge"  = "chronicle-ledge"
    "order-saga"       = "order-saga"
    "velocity-edge"    = "velocity-edge"
    "data-quarantine"  = "data-quarantine"
    "docmind-ai"       = "docmind-ai"
    "agent-core"       = "agent-core"
    "speak-flow"       = "speak-flow"
    "spec-lens"        = "spec-lens"
    "inference-hub"    = "inference-hub"
    "telemetry-lakehouse" = "telemetry-lakehouse"
    "ring-route"       = "ring-route"
    "nexus-swarm"      = "nexus-swarm"
}

# 3. DEFINE PRIORITIES for Thumbnail picking (if standard missing)
$priorities = @("thumbnail.png", "hero_main.png", "dashboard.png", "architecture.png", "workflow.png", "result.png", "upload.png", "ui_preview.png")

Write-Host "--- STARTING MASTER SYNC ---" -ForegroundColor Cyan

foreach ($id in $projectMap.Keys) {
    $srcFolder = $projectMap[$id]
    $srcPath = "$sourceRoot\$srcFolder\docs\assets"
    $destPath = "$destRoot\$id"

    # Create dest folder
    New-Item -ItemType Directory -Force -Path $destPath | Out-Null
    Write-Host "Syncing [$id]..."

    if (Test-Path $srcPath) {
        # A. Copy Standard Assets explicitly (If they exist)
        $standards = @("hero_main.png", "thumbnail.png", "dashboard.png", "workflow.png", "architecture.png")
        foreach ($std in $standards) {
            if (Test-Path "$srcPath\$std") {
                Copy-Item -Path "$srcPath\$std" -Destination "$destPath\$std" -Force
            }
        }

        # B. Smart Fallback for 'thumbnail.png'
        # If we don't have a 'thumbnail.png' in dest, pick the best available image from source and COPY it as 'thumbnail.png'
        if (-not (Test-Path "$destPath\thumbnail.png")) {
            $foundFallback = $false
            foreach ($prio in $priorities) {
                if (Test-Path "$srcPath\$prio") {
                    Copy-Item -Path "$srcPath\$prio" -Destination "$destPath\thumbnail.png" -Force
                    Write-Host "  [AUTO-FIX] Created thumbnail.png from $prio" -ForegroundColor Yellow
                    $foundFallback = $true
                    break
                }
            }
            # C. Desperate Fallback: Any png
            if (-not $foundFallback) {
                $anyPng = Get-ChildItem -Path $srcPath -Filter *.png | Select-Object -First 1
                if ($anyPng) {
                    Copy-Item -Path $anyPng.FullName -Destination "$destPath\thumbnail.png" -Force
                    Write-Host "  [FALLBACK] Created thumbnail.png from $($anyPng.Name)" -ForegroundColor Yellow
                } else {
                     Write-Host "  [EMPTY] No images found in source!" -ForegroundColor Red
                }
            }
        }
        
    } else {
        Write-Host "  [MISSING] Source assets folder not found: $srcPath" -ForegroundColor Red
    }
}
Write-Host "--- SYNC COMPLETE ---" -ForegroundColor Green

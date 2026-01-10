$dest = "G:\LearningRelated\Portfolio Project\kimo-nexus\public\projects"
New-Item -ItemType Directory -Force -Path $dest

# Define mapping: Source Path -> Dest Filename
$map = @{
    "..\chronicle-ledge\docs\images\architecture.png" = "chronicle-ledge.png"
    "..\velocity-edge\docs\assets\sytem-flow.png" = "velocity-edge.png"
    "..\data-quarantine\docs\assets\architecture.png" = "data-quarantine.png"
    "..\docmind-ai\docs\images\docmind_architecture_diagram.png" = "docmind-ai.png"
    "..\agent-core\docs\assets\architecture_diagram.png" = "agent-core.png"
    "..\speak-flow\docs\assets\waveform.png" = "speak-flow.png"
    "..\voicesync-ai\docs\assets\upload.png" = "voicesync-ai.png"
    "..\logstream-ai\docs\assets\architecture.png" = "logstream-ai.png"
    "..\limit-guard\docs\assets\architecture.png" = "limit-guard.png"
    "..\spec-lens\docs\assets\architecture.png" = "spec-lens.png"
    "..\inference-hub\docs\assets\architecture.png" = "inference-hub.png"
}

foreach ($key in $map.Keys) {
    $src = Resolve-Path $key
    $target = Join-Path $dest $map[$key]
    Write-Host "Copying $src to $target"
    Copy-Item -Path $src -Destination $target -Force
}

$base = "G:\LearningRelated\Portfolio Project\kimo-nexus\public\projects"
$targets = @("vox-agent-neural", "live-nexus-ai", "docmind-ai")

# Preferred standard list
$standards = @("thumbnail.png", "hero_main.png", "dashboard.png", "architecture.png")

foreach ($proj in $targets) {
    $dir = "$base\$proj"
    if (Test-Path $dir) {
        Write-Host "Refining [$proj]..."
        $files = Get-ChildItem $dir -File
        
        # rename any likely legacy candidates to thumbnail.png if thumbnail is missing
        if (-not (Test-Path "$dir\thumbnail.png")) {
            $candidate = $files | Where-Object { $_.Name -match "result|upload|flow|arch" } | Select-Object -First 1
            if ($candidate) {
                Rename-Item $candidate.FullName "thumbnail.png" -Force
                Write-Host "  [FIX] Renamed $($candidate.Name) -> thumbnail.png"
            }
        }
        
        # Now delete anything that isn't standard
        $files = Get-ChildItem $dir -File
        foreach ($f in $files) {
            if ($f.Name -notin $standards) {
                Remove-Item $f.FullName -Force
                Write-Host "  [CLEAN] Removed extraneous: $($f.Name)"
            }
        }
    }
}
Write-Host "Done."

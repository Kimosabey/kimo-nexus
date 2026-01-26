$projectsDir = "G:\LearningRelated\Portfolio Project\kimo-nexus\public\projects"

# Defined standard assets that SHOULD be there
$standardAssets = @("thumbnail.png", "hero_main.png", "dashboard.png", "workflow.png", "architecture.png")

# Get all project folders
$folders = Get-ChildItem -Path $projectsDir -Directory

Write-Host "--- Cleaning Up Project Assets ---"

foreach ($folder in $folders) {
    Write-Host "Checking [$($folder.Name)]..."
    
    # Get all files in the folder
    $files = Get-ChildItem -Path $folder.FullName -File
    
    foreach ($file in $files) {
        if ($file.Name -in $standardAssets) {
            # Keep it
            # Write-Host "  [OK] $($file.Name)" -ForegroundColor Green
        }
        else {
            # Delete it (Legacy loose files or duplicates)
            Remove-Item -Path $file.FullName -Force
            Write-Host "  [X] Deleted extraneous: $($file.Name)" -ForegroundColor Yellow
        }
    }
}
Write-Host "--- Cleanup Complete. Only Standard 5 Assets Remain. ---"

$publicDir = "G:\LearningRelated\Portfolio Project\kimo-nexus\public"
$keepFiles = @("profile.webp")
$extensions = @(".png", ".jpg", ".jpeg", ".gif", ".webp")

Write-Host "Cleaning up strict root of public directory..."

# Get files only in the root of public (not recursive, so folders like 'projects' and 'pdfs' are safe)
$files = Get-ChildItem -Path $publicDir -File

foreach ($file in $files) {
    if ($file.Extension -in $extensions) {
        if ($file.Name -notin $keepFiles) {
            Write-Host "  [X] Removing loose asset: $($file.Name)" -ForegroundColor Yellow
            Remove-Item -Path $file.FullName -Force
        } else {
            Write-Host "  [OK] Keeping: $($file.Name)" -ForegroundColor Green
        }
    }
}
Write-Host "Cleanup complete."

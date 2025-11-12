param(
    [string]$Host = "45.159.115.148",
    [string]$User = "root",
    [string]$RemoteReleaseRoot = "/var/www/mafiahome/releases",
    [string]$RemoteWebRoot = "/var/www/mafiahome/html"
)

$ErrorActionPreference = 'Stop'

Write-Host "[deploy] Mafiahome automated deployment starting..." -ForegroundColor Cyan

$sshPassword = $Env:MAFIAHOME_SSH_PASSWORD
if (-not $sshPassword) {
    throw "MAFIAHOME_SSH_PASSWORD is not set. Export the password before running the deploy script."
}

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$distPath = Join-Path $projectRoot 'dist'
if (-not (Test-Path $distPath)) {
    New-Item -ItemType Directory -Path $distPath | Out-Null
}

Push-Location $projectRoot

try {
    Write-Host "[install] npm install" -ForegroundColor DarkCyan
    npm install

    Write-Host "[build] npm run build" -ForegroundColor DarkCyan
    npm run build

    Write-Host "[export] npm run export" -ForegroundColor DarkCyan
    npm run export

    $timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
    $releaseName = "release-$timestamp"
    $localReleaseDir = Join-Path $distPath $releaseName
    $archivePath = "$localReleaseDir.zip"

    Write-Host "[package] Preparing $releaseName" -ForegroundColor DarkCyan
    if (Test-Path $localReleaseDir) { Remove-Item $localReleaseDir -Recurse -Force }
    Copy-Item 'out' $localReleaseDir -Recurse -Force
    if (Test-Path $archivePath) { Remove-Item $archivePath -Force }
    Compress-Archive -Path (Join-Path $localReleaseDir '*') -DestinationPath $archivePath -Force

    $Env:SSHPASS = $sshPassword
    $sshOptions = "-o StrictHostKeyChecking=no"
    $remoteReleasePath = "$RemoteReleaseRoot/$releaseName"

    Write-Host "[remote] Creating release directory $remoteReleasePath" -ForegroundColor DarkCyan
    sshpass -e ssh $sshOptions "$User@$Host" "mkdir -p '$remoteReleasePath'"

    Write-Host "[upload] $archivePath -> $remoteReleasePath" -ForegroundColor DarkCyan
    sshpass -e scp $sshOptions $archivePath "$User@$Host:$remoteReleasePath/"

    $remoteCommands = @(
        "set -e",
        "mkdir -p '$RemoteWebRoot'",
        "cd '$remoteReleasePath'",
        "unzip -o '$releaseName.zip'",
        "rsync -a --delete 'out/' '$RemoteWebRoot/'",
        "printf '%s' '$releaseName' > '$RemoteReleaseRoot/current'"
    ) -join '; '

    Write-Host "[activate] Updating live site" -ForegroundColor DarkCyan
    sshpass -e ssh $sshOptions "$User@$Host" $remoteCommands

    Write-Host "[done] Deployment completed. Backup: $remoteReleasePath" -ForegroundColor Green
}
finally {
    Pop-Location
}

param([switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$taskRoot = $PSScriptRoot
$taskRuntime = Join-Path $taskRoot '.runtime'
New-Item -ItemType Directory -Path $taskRuntime -Force | Out-Null
$taskNode = Get-Command node.exe -ErrorAction SilentlyContinue
if (-not $taskNode) {
  $taskBundled = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
  if (Test-Path -LiteralPath $taskBundled) { $taskNode = Get-Item -LiteralPath $taskBundled }
}
if (-not $taskNode) { throw 'Node.js is required. Install Node.js, then run START.cmd again.' }
$taskNodePath = if ($taskNode.Source) { $taskNode.Source } else { $taskNode.FullName }
if (-not (Test-Path -LiteralPath (Join-Path $taskRoot 'dist\index.html'))) { throw 'Build missing. Run npm install and npm run build in this folder.' }
$taskSelectedPort = $null
$taskServer = $null
foreach ($taskPort in 4183..4193) {
  try {
    $taskHealth = Invoke-RestMethod -Uri "http://127.0.0.1:$taskPort/__health" -TimeoutSec 1
    if ($taskHealth.app -eq 'three-small-worlds' -and $taskHealth.root -eq $taskRoot) {
      $taskSelectedPort = $taskPort
      $taskServer = $taskHealth
      break
    }
  } catch {}
  $taskProbe = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $taskPort)
  try { $taskProbe.Start(); $taskSelectedPort = $taskPort } catch {} finally { $taskProbe.Stop() }
  if ($null -ne $taskSelectedPort) { break }
}
if ($null -eq $taskSelectedPort) { throw 'No free local port in 4183-4193.' }
$taskUrl = "http://127.0.0.1:$taskSelectedPort/"
if (-not $taskServer) {
  $taskScript = Join-Path $taskRoot 'local-server.cjs'
  $taskProcess = Start-Process -FilePath $taskNodePath -ArgumentList @(('"' + $taskScript + '"'), '--port', "$taskSelectedPort") -WorkingDirectory $taskRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $taskRuntime 'server.log') -RedirectStandardError (Join-Path $taskRuntime 'server-error.log') -PassThru
  foreach ($taskAttempt in 1..40) {
    Start-Sleep -Milliseconds 250
    if ($taskProcess.HasExited) { throw 'Server exited. See .runtime/server-error.log.' }
    try {
      $taskHealth = Invoke-RestMethod -Uri ($taskUrl + '__health') -TimeoutSec 1
      if ($taskHealth.app -eq 'three-small-worlds' -and $taskHealth.root -eq $taskRoot -and $taskHealth.pid -eq $taskProcess.Id) { $taskServer = $taskHealth; break }
    } catch {}
  }
  if (-not $taskServer) { throw 'Server did not become ready. See .runtime/server-error.log.' }
}
@{ pid = $taskServer.pid; port = $taskSelectedPort; url = $taskUrl; root = $taskRoot } | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $taskRuntime 'server.json') -Encoding UTF8
Write-Output "Three Small Worlds is running: $taskUrl"
Write-Output 'Use STOP.cmd to stop this local server.'
if (-not $NoBrowser) { Start-Process $taskUrl }

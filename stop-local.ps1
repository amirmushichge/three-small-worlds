$ErrorActionPreference = 'Stop'
$taskStatePath = Join-Path $PSScriptRoot '.runtime\server.json'
if (-not (Test-Path -LiteralPath $taskStatePath)) { Write-Output 'No saved server session.'; exit 0 }
$taskState = Get-Content -LiteralPath $taskStatePath -Raw | ConvertFrom-Json
if ($taskState.root -ne $PSScriptRoot) { throw 'Server state does not belong to this folder.' }
try { $taskHealth = Invoke-RestMethod -Uri ($taskState.url + '__health') -TimeoutSec 2 } catch { Write-Output 'This server is already stopped.'; exit 0 }
if ($taskHealth.app -ne 'three-small-worlds' -or $taskHealth.root -ne $PSScriptRoot -or $taskHealth.pid -ne $taskState.pid) { throw 'Server identity mismatch; no process was stopped.' }
$taskProcess = Get-CimInstance Win32_Process -Filter "ProcessId = $($taskState.pid)"
if (-not $taskProcess -or $taskProcess.CommandLine -notlike ('*' + (Join-Path $PSScriptRoot 'local-server.cjs') + '*')) { throw 'Process identity mismatch; no process was stopped.' }
Stop-Process -Id $taskState.pid
Write-Output 'Three Small Worlds stopped.'

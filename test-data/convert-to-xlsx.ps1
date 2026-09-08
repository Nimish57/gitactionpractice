$ErrorActionPreference = 'Stop'

$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$csvPath = Join-Path $baseDir 'TestData.csv'
$xlsxPath = Join-Path $baseDir 'TestData.xlsx'

if (-not (Test-Path $csvPath)) {
  throw "CSV file not found: $csvPath"
}

$excel = New-Object -ComObject Excel.Application
$workbook = $null
$excel.Visible = $false
$excel.DisplayAlerts = $false

try {
  $workbook = $excel.Workbooks.Open($csvPath)
  $xlOpenXMLWorkbook = 51
  $workbook.SaveAs($xlsxPath, $xlOpenXMLWorkbook)
  $workbook.Close($false)
  $workbook = $null
  Write-Output "Created: $xlsxPath"
}
finally {
  if ($workbook -ne $null) {
    try { $workbook.Close($false) } catch {}
  }
  $excel.Quit()
  if ($workbook -ne $null) {
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($workbook) | Out-Null
  }
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}

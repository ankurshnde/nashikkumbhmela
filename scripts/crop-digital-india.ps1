Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap((Resolve-Path "public/images/digital-india.png").Path)
$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.A -gt 10 -and ($c.R -lt 240 -or $c.G -lt 240 -or $c.B -lt 240)) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Bounds: minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY (Total: $($bmp.Width) x $($bmp.Height))"

# Crop tight with 4px padding
$pad = 4
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($bmp.Width - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($bmp.Height - $cropY, ($maxY - $minY) + ($pad * 2))

$cropRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$croppedBmp = $bmp.Clone($cropRect, $bmp.PixelFormat)
$croppedBmp.Save("public/images/digital-india-tight.png", [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Saved tight crop: $cropW x $cropH as digital-india-tight.png"

$croppedBmp.Dispose()
$bmp.Dispose()

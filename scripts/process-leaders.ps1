Add-Type -AssemblyName System.Drawing

function Make-Portrait {
    param(
        [string]$Src,
        [string]$Dst,
        [int]$CropX, [int]$CropY, [int]$CropW, [int]$CropH,
        [int]$DstX, [int]$DstY, [int]$DstW, [int]$DstH
    )
    $img = [System.Drawing.Image]::FromFile((Resolve-Path $Src))
    $bmp = New-Object System.Drawing.Bitmap(400, 480)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::White)

    $sRect = New-Object System.Drawing.Rectangle($CropX, $CropY, $CropW, $CropH)
    $dRect = New-Object System.Drawing.Rectangle($DstX, $DstY, $DstW, $DstH)
    $g.DrawImage($img, $dRect, $sRect, [System.Drawing.GraphicsUnit]::Pixel)

    $bmp.Save($Dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
    $img.Dispose()
    Write-Host "Saved $Dst"
}

# 1. PM Modi (800 x 480). Ratio 5:6 is 400x480. Face centered at x=400.
Make-Portrait -Src "New folder/pm.jpg" -Dst "public/images/ministers/modi-clean.jpg" `
    -CropX 200 -CropY 0 -CropW 400 -CropH 480 `
    -DstX 0 -DstY 0 -DstW 400 -DstH 480

# 2. Devendra Fadnavis (2227 x 2826). Ratio 5:6 -> 2000 x 2400.
Make-Portrait -Src "New folder/DevendraFadnavis-stockimage-24.png" -Dst "public/images/ministers/fadnavis-clean.jpg" `
    -CropX 110 -CropY 50 -CropW 2000 -CropH 2400 `
    -DstX 0 -DstY 0 -DstW 400 -DstH 480

# 3. Eknath Shinde (304 x 304). PURE WHITE background.
# To ensure ZERO squeezing: keep 1:1 ratio!
# If DstW = 400, DstH = 400, placed at DstX = 0, DstY = 40 on 400x480 white canvas.
# Scaling factor in both X and Y is 400/304 = 1.3157 (EXACTLY equal in both dimensions!).
Make-Portrait -Src "New folder/DCM1.jpg" -Dst "public/images/ministers/shinde-clean.jpg" `
    -CropX 0 -CropY 0 -CropW 304 -CropH 304 `
    -DstX 0 -DstY 35 -DstW 400 -DstH 400

# 4. Sunetra Ajit Pawar (413 x 531).
# w=413, for 5:6 h = 495.6 -> 496.
Make-Portrait -Src "New folder/SunetraPawar.jpg" -Dst "public/images/ministers/sunetra-clean.jpg" `
    -CropX 0 -CropY 15 -CropW 413 -CropH 496 `
    -DstX 0 -DstY 0 -DstW 400 -DstH 480

# 5. Girish Mahajan (2043 x 2371). Ratio 5:6 -> 1900 x 2280.
Make-Portrait -Src "New folder/girish-mahajan-D_NRO8N7.png" -Dst "public/images/ministers/mahajan-clean.jpg" `
    -CropX 70 -CropY 40 -CropW 1900 -CropH 2280 `
    -DstX 0 -DstY 0 -DstW 400 -DstH 480

# 6. Dr. Pravin Gedam (217 x 264). Ratio 5:6 -> 216 x 260.
Make-Portrait -Src "New folder/DivComNashik-PravinGedam.jpg" -Dst "public/images/ministers/gedam-clean.jpg" `
    -CropX 0 -CropY 2 -CropW 216 -CropH 260 `
    -DstX 0 -DstY 0 -DstW 400 -DstH 480

# 7. Shekhar Singh (1050 x 947). Ratio 5:6 -> 780 x 936.
Make-Portrait -Src "New folder/Shekhar-Singh.jpeg" -Dst "public/images/ministers/shekhar-clean.jpg" `
    -CropX 135 -CropY 5 -CropW 780 -CropH 936 `
    -DstX 0 -DstY 0 -DstW 400 -DstH 480
